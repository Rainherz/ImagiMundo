import prisma from "@/packages/prisma";
import { publicProcedure } from "@/packages/trpc";
import TemplateModel from "../../entities/story/model";


const StoriesServerRouter = {
    listStories: publicProcedure.query(async () => {
        const templates = await prisma.template.findMany();
        return templates;
    }),
    createStory: publicProcedure.input(TemplateModel).mutation(async (opts) => {
        const template = await prisma.template.create({
            data: opts.input
        });

        return template
    })
}

export default StoriesServerRouter;