import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const homeRouter = createTRPCRouter({

  get: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.house.findFirst({
      where: {
        slug: input
      },
      include: { upgrades: true },
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.house.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
