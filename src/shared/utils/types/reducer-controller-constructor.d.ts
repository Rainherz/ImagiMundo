interface ReducerControllerConstructor<STATE, ACTION>{
    new (reducer : ReducerControllerProps<STATE, ACTION>) : ReducerController<STATE, ACTION>
}