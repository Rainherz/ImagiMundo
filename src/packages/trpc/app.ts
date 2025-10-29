import StoriesServerRouter from "@/modules/stories/features/router/server";
import ActorsServerRouter from "@/modules/actors/features/router/server";
import { router } from "@/packages/trpc";
 
const appRouter = router({
  stories: StoriesServerRouter,
  actors: ActorsServerRouter,
});
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
export { appRouter };