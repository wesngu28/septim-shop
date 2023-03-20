import { createTRPCRouter } from "~/server/api/trpc";
import { homeRouter } from "~/server/api/routers/homes";
import { stripeRouter } from "./routers/stripe";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  home: homeRouter,
  stripe: stripeRouter,
  users: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
