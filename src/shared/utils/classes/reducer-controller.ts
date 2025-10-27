import type { ActionDispatch } from "react"

export default abstract class ReducerController <STATE, ACTION>{
    
    protected dispatch!: ActionDispatch<[action: ACTION]>
    protected state!: STATE

    constructor([state, dispatch]: ReducerControllerProps<STATE, ACTION>){
        this.state = state
        this.dispatch = dispatch
    }

    abstract initializer(): Promise<void>

    public retrieveState(){
        return this.state
    }
}