import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import type Stripe from "stripe";
import { buffer } from "micro";
import { stripe } from "~/server/stripe";
import { env } from "~/env.mjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface itemData {
  image: string
  date: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      const buf = await buffer(req)
      event = stripe.webhooks.constructEvent(buf, sig as string, env.STRIPE_WEBHOOK_SIGNING_SECRET);
      res.status(200).send("Purchase processed successfully.")
    } catch (err) {
      res.status(400).send(`Error occurred in webhook`);
      return;
    }
    if (event.type === 'checkout.session.completed') {
      const currSession = event.data.object as Stripe.Checkout.Session
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        currSession.id,
        {
          expand: ['line_items'],
        }
      );
      const lineItems = sessionWithLineItems.line_items;
      const itemsMetadata: Array<itemData> = JSON.parse(sessionWithLineItems.metadata?.item_data as string) as Array<itemData>
      if (currSession.customer?.toString() && lineItems) {
        try {
          const newOrder = await prisma.order.create({
            data: {
              date: new Date(),
              quantity: Array.from(lineItems.data).reduce((acc, item) => { return acc + (item.quantity ? item.quantity : 0)}, 0),
              User: {
                connect: {
                  stripeId: currSession.customer?.toString()
                }
              }
            }
          })
          await prisma.item.createMany({
            data: Array.from(lineItems.data).map((item, i) => ({
               price: item.amount_total,
               product: item.description,
               image: itemsMetadata[i]?.image,
               date: itemsMetadata[i]?.date,
               quantity: item.quantity as number,
               userId: currSession.customer?.toString(),
               orderId: newOrder.id
            }))
          })
        } catch (err) {
          console.log(err)
        }
      }
    }
  } else {
    console.log("errors")
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}