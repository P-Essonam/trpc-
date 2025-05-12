import { z } from 'zod';
import { protectedProcedure, createTRPCRouter } from '@/trpc/init';
import { eq } from 'drizzle-orm';
import db from '@/db';
import { users } from '@/db/schema';



export const homeRouter = createTRPCRouter({
  updateUser: protectedProcedure
    .input(
      z.object({
        lastName: z.string(),
        firstName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { user } = ctx;
        const { firstName, lastName } = input;


        await db
          .update(users)
          .set({
            firstName,
            lastName,
          })
          .where(eq(users.id, user.id));

      } catch (error) {
        console.error('Error in getUser:', error);
        throw error;
      }
    }),
});
