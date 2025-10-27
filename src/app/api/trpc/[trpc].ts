import { createNextApiHandler } from '@trpc/server/adapters/next';
import { createContext } from '@/packages/trpc/context';
import { appRouter } from '@/packages/trpc/app';
// @link https://nextjs.org/docs/api-routes/introduction
export default createNextApiHandler({
  router: appRouter,
  createContext,
});