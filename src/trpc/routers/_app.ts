import { createTRPCRouter } from '../init';
import { userRouter } from '@/features/user/server/procedures';
import { homeRouter } from '@/features/home/server/procedures';



export const appRouter = createTRPCRouter({
  users: userRouter,
  home: homeRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;