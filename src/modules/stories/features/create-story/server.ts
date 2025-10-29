import { publicProcedure } from "@/packages/trpc";
import StoryModel from "../../entities/models/story-config";
import prisma from "@/packages/prisma";

const CreateStoryProcedure = publicProcedure.input(StoryModel).mutation(async (opts) => {
    const result = await prisma.story.create({
        data: opts.input
    });

    return result
})

export default CreateStoryProcedure