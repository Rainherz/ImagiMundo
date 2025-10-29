import { publicProcedure } from "@/packages/trpc";
import StoryConfigModel from "../../entities/models/story-config";

const StartStoryProcedure = publicProcedure.input(StoryConfigModel).mutation(async (opts) => {
    const { input } = opts
    
})