import type { PrismaClient } from "@prisma/client";
import type Stripe from "stripe";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const stripeRouter = createTRPCRouter({

  checkoutSession: publicProcedure.input(z.array(z.object({name: z.string(), image: z.string(), price: z.number(), qty: z.number(), date: z.string()}))).mutation(async ({ ctx, input }) => {

    const checkoutId = await getCheckoutId(ctx.stripe, ctx.prisma, ctx.session?.user.id)

    const session = await ctx.stripe.checkout.sessions.create({
      line_items: input.map(item => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: item.price
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1
          },
          quantity: item.qty,
        }
      }),
      mode: 'payment',
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/canceled`,
      customer: checkoutId,
      client_reference_id: ctx.session?.user.id,
      metadata: {
        item_data: JSON.stringify(input.map(item => ({
          image: item.image,
          date: item.date
        })))
      }
    });
    console.log(session)

    if (!session) throw new Error ("Could not checkout")
    return { checkoutUrl: session.url }

  }),

});

async function getCheckoutId(stripe: Stripe, prisma: PrismaClient, user: string | undefined) {
  if (!user) return

  const currentUser = await prisma.user.findUnique({
    where: {
      id: user
    }
  })

  if (!currentUser) throw new Error ("No user found")

  if (currentUser.stripeId) return currentUser.stripeId

  const newCustomer = await stripe.customers.create({
    email: currentUser.email ?? undefined,
    name: currentUser.name ?? undefined,
    metadata: {
      user
    }
  })

  const update = await prisma.user.update({
    where: {
      id: user
    },
    data: {
      stripeId: newCustomer.id
    }
  })

  return update.stripeId as string
}