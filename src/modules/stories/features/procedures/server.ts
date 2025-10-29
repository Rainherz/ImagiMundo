import CreateStoryProcedure from "../create-story/server";
import ListStoryProcedure from "../list-story/server";

const StoriesServerRouter = {
    list: ListStoryProcedure,
    create: CreateStoryProcedure,
}

export default StoriesServerRouter