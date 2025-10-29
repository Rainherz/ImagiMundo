import { publicProcedure } from "@/packages/trpc";
import StoryModel from "../../entities/models/story-config";
import prisma from "@/packages/prisma";
import { Prisma } from "@/packages/prisma/generated/client";

const CreateStoryProcedure = publicProcedure.input(StoryModel).mutation(async (opts) => {

    const {input} = opts

    let story : Prisma.StoryCreateInput

    // if(input.topics){
    //     story = { ...input,
    //         topics: {
    //             create: [
    //                 input.topics.map((topic) => {
    //                     {
    //                         topic: {
    //                             connectOrCreate: {
    //                                 where: {}
    //                                 create: {}
    //                             }
    //                         }   
    //                     }
    //                 })
    //             ]
    //         }
    //     }
    // }

    // return result
    return "GG AFK"
})

export default CreateStoryProcedure