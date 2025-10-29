import { publicProcedure } from "@/packages/trpc";
import StoryModel from "../../entities/models/story-config";
import prisma from "@/packages/prisma";

const CreateStoryProcedure = publicProcedure.input(StoryModel).mutation(async (opts) => {

    const {input} = opts

    let story 

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