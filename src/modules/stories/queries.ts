"use client";

import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/packages/trpc/trpc-client";
import { inferReactQueryProcedureOptions } from "@trpc/react-query";
import { AppRouter } from "@/packages/trpc/app";
import { useMutationWithRefresh } from "@/hooks/use-mutation-refresh";

export const useStories = () => {
  const trpc = useTRPC();

  const stories_QUERY_KEY = trpc.stories.pathKey();

  type InitStoriesOptions =
    inferReactQueryProcedureOptions<AppRouter>["stories"]["chat"]["init"];

  type ContinueStoriesOptions =
    inferReactQueryProcedureOptions<AppRouter>["stories"]["chat"]["continue"];

  type GenerateScenesOptions =
    inferReactQueryProcedureOptions<AppRouter>["stories"]["scenes"]["generate"];

  type DefineWordOptions =
    inferReactQueryProcedureOptions<AppRouter>["stories"]["words"]["define"];

  type GenerateImageOptions =
    inferReactQueryProcedureOptions<AppRouter>["stories"]["images"]["generate"];

  // Chat interactivo

  const useInitStory = (options?: InitStoriesOptions) =>
    useMutation(
      trpc.stories.chat.init.mutationOptions(
        useMutationWithRefresh(options ?? {}, stories_QUERY_KEY)
      )
    );

  const useContinueStory = (options?: ContinueStoriesOptions) =>
    useMutation(
      trpc.stories.chat.continue.mutationOptions(
        useMutationWithRefresh(options ?? {}, stories_QUERY_KEY)
      )
    );

  // Generación de escenas
  const useGenerateScenes = (options?: GenerateScenesOptions) =>
    useMutation(
      trpc.stories.scenes.generate.mutationOptions(
        useMutationWithRefresh(options ?? {}, stories_QUERY_KEY)
      )
    );

  // Definición de palabras
  const useDefineWord = (options?: DefineWordOptions) =>
    useMutation(
      trpc.stories.words.define.mutationOptions(
        useMutationWithRefresh(options ?? {}, stories_QUERY_KEY)
      )
    );

  // Generación de imágenes
  const useGenerateImage = (options?: GenerateImageOptions) =>
    useMutation(
      trpc.stories.images.generate.mutationOptions(
        useMutationWithRefresh(options ?? {}, stories_QUERY_KEY)
      )
    );

  return {
    useInitStory,
    useContinueStory,
    useGenerateScenes,
    useDefineWord,
    useGenerateImage,
  };
};
