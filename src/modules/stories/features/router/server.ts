import { router, publicProcedure } from "@/packages/trpc";
import { generateStoryScenes } from "../scene-generation/api";
import { defineWord } from "../word-definition/api";
import { generateSceneImage } from "../image-generation/api";
import { SceneGenerationInputSchema } from "../../entities/models/sceneGeneration";
import { WordDefinitionInputSchema } from "../../entities/models/wordDefinition";
import { ImageGenerationInputSchema } from "../../entities/models/imageGeneration";

const StoriesServerRouter = router({
  scenes: router({
    generate: publicProcedure
      .input(SceneGenerationInputSchema)
      .mutation(async ({ input }) => {
        return await generateStoryScenes(input);
      }),
  }),

  words: router({
    define: publicProcedure
      .input(WordDefinitionInputSchema)
      .mutation(async ({ input }) => {
        return await defineWord(input);
      }),
  }),

  images: router({
    generateSceneImage: publicProcedure
      .input(ImageGenerationInputSchema)
      .mutation(async ({ input }) => {
        return await generateSceneImage(input);
      }),
  }),
});

export default StoriesServerRouter;