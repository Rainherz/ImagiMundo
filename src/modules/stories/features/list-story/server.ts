import prisma from "@/packages/prisma";
import { publicProcedure } from "@/packages/trpc";

const ListStoryProcedure = publicProcedure.query(async () => {
    const results = await prisma.story.findMany();
    return results;
})

export default ListStoryProcedure