import { createContext } from "react";

import ActorRepositoryFeatureController, {useControllerCreator} from "./controller"

type ContextType = ActorRepositoryFeatureController | null

const ActorRepositoryFeatureContext = createContext<ContextType>(null)

export default ActorRepositoryFeatureContext

export function useContextCreator(){
    const context_value = useControllerCreator()
    return context_value
}