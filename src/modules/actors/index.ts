import type { RouteObject } from "react-router"
import ActorRepositoryViewPage from "./pages/actor-repo-view"

const ActorRoutes: RouteObject = {
    path: "actors",
    children: [
        {
            index: true,
            Component: ActorRepositoryViewPage
        }
    ]
}

export default ActorRoutes