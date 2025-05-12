import db from '@/db';
import { users } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { cache } from 'react';
import superjson from 'superjson';

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const { userId } = await auth()
  return { clerkUSerId: userId };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;


const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = t.procedure.use( async ({ ctx, next }) => {
  if (!ctx.clerkUSerId) {
    throw new TRPCError({
      code: "UNAUTHORIZED"
    });
  }
  const user = await db.query.users.findFirst({
    where: eq(users.clerkUserId, ctx.clerkUSerId),
  });

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not found",
    });
  }

  // Can add rate limiting here

  return next({ 
    ctx: { 
      ...ctx, 
      clerkUSerId: ctx.clerkUSerId,
      user
    } 
  });
})