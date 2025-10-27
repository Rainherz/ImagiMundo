import ReducerController from "./reducer-controller";

export default abstract class RepositoryFeatureController <
    T = {}, 
    F = {}, 
    STATE extends RepositoryState<T,F> = RepositoryState<T,F>, 
    ACTION extends RepositoryAction<T,F> = RepositoryAction<T,F>
> extends ReducerController<STATE, ACTION> {

    constructor(reducer: ReducerControllerProps<STATE, ACTION>){
        super(reducer)
    }

    protected async setData(data: RepositoryData<T>){
        this.dispatch({
            type: "update",
            data: data
        } as ACTION)
    }

    protected async setFilters(filters: F){
        this.dispatch({
            type: "filter",
            filters: filters
        } as ACTION)
    }

    public getData(){
        return this.state.data
    }

    public getFilters(){
        return this.state.filters
    }
}