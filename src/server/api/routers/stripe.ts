import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const stripeRouter = createTRPCRouter({

  checkoutSession: publicProcedure.input(z.array(z.object({name: z.string(), image: z.string(), price: z.number(), qty: z.number()}))).mutation(async ({ ctx, input }) => {

    const session = await ctx.stripe.checkout.sessions.create({
      line_items: input.map(item => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [item.image]
            },
            unit_amount: item.price
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1
          },
          quantity: item.qty
        }
      }),
      mode: 'payment',
      success_url: `http://localhost:3000/?success=true`,
      cancel_url: `http://localhost:3000/?canceled=true`,
    });

    if (!session) throw new Error ("Could not checkout")
    return { checkoutUrl: session.url }

  }),

});
