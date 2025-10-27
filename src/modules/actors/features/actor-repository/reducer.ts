export default function ActorRepositoryFeatureReducer(
    state: ActorRepositoryState,
    action: ActorRepositoryAction,
): ActorRepositoryState{
    switch(action.type){
        case "update":
            return { ...state,
                data: action.data
            }

        case "filter":
            return { ...state,
                filters: action.filters
            }

        default:
            console.error(`REDUCER METHOD: ${action.type} NOT IMPLEMENTED`)
            return state
    }
}

