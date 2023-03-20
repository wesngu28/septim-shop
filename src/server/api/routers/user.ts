import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({

  getOrders: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: input
      },
      include: { orders: true, items: true },
    });
  }),

  getItemsForOrder: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.order.findFirst({
      where: {
        id: input
      },
      include: { items: true },
    });
  }),

});
