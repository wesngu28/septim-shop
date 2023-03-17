import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import type Stripe from "stripe";
import { buffer } from "micro";
import { stripe } from "~/server/stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(" I BEEN HIT !!")
  if (req.method === "POST") {
    const sig = req.headers['stripe-signature'];
    console.log(sig)
    let event;

    try {
      const buf = await buffer(req)
      event = stripe.webhooks.constructEvent(buf as Buffer, sig as string, "whsec_21efd93440567bb699f3521cc700577c15e8b0b2c91c62464143ec7ad4d47f86");
      res.status(200).send({type: "good"})
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message as string}`);
      return;
    }
    if (event.type === 'checkout.session.completed') {
      console.log(event)
      const currSession = event.data.object as Stripe.Checkout.Session
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        currSession.id,
        {
          expand: ['line_items'],
        }
      );
      const lineItems = sessionWithLineItems.line_items;

      if (currSession.customer?.toString() && lineItems) {
        const newOrder = await prisma.order.create({
          data: {
            User: {
              connect: {
                stripeId: currSession.customer?.toString()
              }
            }
          }
        })
        await prisma.item.createMany({
          data: Array.from(lineItems.data).map(item => ({
             price: item.amount_total,
             product: item.description,
             quantity: item.quantity as number,
             userId: currSession.customer?.toString(),
             orderId: newOrder.id
          }))
        })
      }
    }
  } else {
    console.log("errors")
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}