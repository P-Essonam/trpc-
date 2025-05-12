import { baseProcedure, protectedProcedure, createTRPCRouter } from '@/trpc/init';
import { eq } from 'drizzle-orm';
import db from '@/db';
import { users } from '@/db/schema';
import { TRPCError } from '@trpc/server';
import { currentUser  } from '@clerk/nextjs/server';



export const userRouter = createTRPCRouter({
  createOrGetUser: baseProcedure

    .query(async({ ctx, }) => {
      try {
        const { clerkUSerId } = ctx;
        if (!clerkUSerId) {
            throw new TRPCError({
                code: "UNAUTHORIZED"
            });
        }

        const user = await db.query.users.findFirst({
            where: eq(users.clerkUserId, clerkUSerId),
        });

        const clerkUser = await currentUser()


        if (!user) {
          const [create] = await db.insert(users).values({
            lastName: clerkUser?.lastName || 'Doe',
            firstName: clerkUser?.firstName || 'John',
            email: clerkUser?.emailAddresses[0]?.emailAddress || "essai@gmail.com",
            clerkUserId: clerkUSerId,
          }).returning();


          return create;
        }

        return user;
      } catch (error) {
        console.error('Error in createOrGetUser:', error);
        throw error;
      }
    }),
  getUser: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        const { user } = ctx;


        return user;
      } catch (error) {
        console.error('Error in getUser:', error);
        throw error;
      }
    }),
});
