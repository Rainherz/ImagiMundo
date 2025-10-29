import { router, publicProcedure } from "@/packages/trpc";
import { generateStoryScenes } from "../scene-generation/api";
import { defineWord } from "../word-definition/api";
import { generateSceneImage } from "../image-generation/api";
import { initializeStory, continueStory } from "../scene-generation/chat";
import { 
  SceneGenerationInputSchema, 
  StoryInitInputSchema, 
  StoryContinueInputSchema 
} from "../../entities/models/sceneGeneration";
import { WordDefinitionInputSchema } from "../../entities/models/wordDefinition";
import { ImageGenerationInputSchema } from "../../entities/models/imageGeneration";

const StoriesServerRouter = router({
  // Chat interactivo (con persistencia)
  chat: router({
    init: publicProcedure
      .input(StoryInitInputSchema)
      .mutation(async ({ input }) => {
        return await initializeStory(input);
      }),
    continue: publicProcedure
      .input(StoryContinueInputSchema)
      .mutation(async ({ input }) => {
        return await continueStory(input);
      }),
  }),

  // Generación de escenas (no interactivo)
  scenes: router({
    generate: publicProcedure
      .input(SceneGenerationInputSchema)
      .mutation(async ({ input }) => {
        return await generateStoryScenes(input);
      }),
  }),

  // Definición de palabras
  words: router({
    define: publicProcedure
      .input(WordDefinitionInputSchema)
      .mutation(async ({ input }) => {
        return await defineWord(input);
      }),
  }),

  // Generación de imágenes
  images: router({
    generate: publicProcedure
      .input(ImageGenerationInputSchema)
      .mutation(async ({ input }) => {
        return await generateSceneImage(input);
      }),
  }),
});

export default StoriesServerRouter;