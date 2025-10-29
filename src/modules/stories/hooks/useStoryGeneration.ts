"use client";

import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/packages/trpc/trpc-client";
import type { SceneGenerationInput } from "../entities/models/sceneGeneration";
import type { WordDefinitionInput } from "../entities/models/wordDefinition";
import type { ImageGenerationInput } from "../entities/models/imageGeneration";

export const useStoryGeneration = () => {
  const trpc = useTRPC();

  const generateScenesMutation = useMutation(
    trpc.stories.scenes.generate.mutationOptions()
  );

  const defineWordMutation = useMutation(
    trpc.stories.words.define.mutationOptions()
  );

  const generateImageMutation = useMutation(
    trpc.stories.images.generate.mutationOptions()
  );

  return {
    // Generar escenas
    generateScenes: generateScenesMutation.mutate,
    isGeneratingScenes: generateScenesMutation.isPending,
    scenesData: generateScenesMutation.data,
    scenesError: generateScenesMutation.error,

    // Definir palabra
    defineWord: defineWordMutation.mutate,
    isDefiningWord: defineWordMutation.isPending,
    wordData: defineWordMutation.data,
    wordError: defineWordMutation.error,

    // Generar imagen
    generateImage: generateImageMutation.mutate,
    isGeneratingImage: generateImageMutation.isPending,
    imageData: generateImageMutation.data,
    imageError: generateImageMutation.error,
  };
};
