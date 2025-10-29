// "use client";

// import { useMutation } from "@tanstack/react-query";
// import { type inferReactQueryProcedureOptions } from "@trpc/react-query";
// import { useMutationWithRefresh } from "@/hooks/use-mutation-refresh";
// import { useTRPC } from "@/packages/trpc/trpc-client";
// import { AppRouter } from "@/packages/trpc/app";

// export const useStories = () => {
//   const trpc = useTRPC();

//   const stories_QUERY_KEY = trpc.stories.pathKey();

//   type CreateStoriesOptions =
//     inferReactQueryProcedureOptions<AppRouter>["stories"]["create"];
// //   type UpdateStoriesOptions =
// //     inferReactQueryProcedureOptions<AppRouter>["stories"]["update"];
// //   type DeleteStoriesOptions =
// //     inferReactQueryProcedureOptions<AppRouter>["stories"]["delete"];

//   const useCreate = (options?: CreateStoriesOptions) =>
//     useMutation(
//       trpc.stories.create.mutationOptions(
//         useMutationWithRefresh(options ?? {}, stories_QUERY_KEY)
//       )
//     );

// //   const useUpdate = (options?: UpdateStoriesOptions) =>
// //     useMutation(
// //       trpc.stories.update.mutationOptions(
// //         useMutationWithRefresh(options ?? {}, stories_QUERY_KEY)
// //       )
// //     );

// //   const useRemove = (options?: DeleteStoriesOptions) =>
// //     useMutation(
// //       trpc.stories.delete.mutationOptions(
// //         useMutationWithRefresh(options ?? {}, stories_QUERY_KEY)
// //       )
// //     );

//   return {
//     useCreate,
//     // useUpdate,
//     // useRemove,
//   };
// };
