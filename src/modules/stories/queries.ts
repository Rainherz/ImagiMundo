"use client";

import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/packages/trpc/trpc-client";

/**
 * Hook para usar las APIs de historias
 * @deprecated Usar directamente trpc.stories.chat.init, trpc.stories.chat.continue, etc.
 */
export const useStories = () => {
  const trpc = useTRPC();

  // Chat interactivo
  const useInitStory = () =>
    useMutation(trpc.stories.chat.init.mutationOptions());

  const useContinueStory = () =>
    useMutation(trpc.stories.chat.continue.mutationOptions());

  // Generación de escenas
  const useGenerateScenes = () =>
    useMutation(trpc.stories.scenes.generate.mutationOptions());

  // Definición de palabras
  const useDefineWord = () =>
    useMutation(trpc.stories.words.define.mutationOptions());

  // Generación de imágenes
  const useGenerateImage = () =>
    useMutation(trpc.stories.images.generate.mutationOptions());

  return {
    useInitStory,
    useContinueStory,
    useGenerateScenes,
    useDefineWord,
    useGenerateImage,
  };
};
