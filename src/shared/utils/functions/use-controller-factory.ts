import { useEffect, useReducer, useRef, type Reducer } from "react"

export default function useControllerFactory<STATE = unknown, ACTION = unknown>(
    Reducer: Reducer<STATE, ACTION>, 
    Controller: ReducerControllerConstructor<STATE, ACTION>,
    initial_state : STATE,
){
    const [state, dispatch] = useReducer(Reducer, initial_state)
    const pending = useRef(false)

    const controller = new Controller([state, dispatch])

    useEffect(() => {
        if(pending.current) return
        pending.current = true

        controller.initializer().finally(() => {
            pending.current = false
        })
    }, [])

    return controller
}