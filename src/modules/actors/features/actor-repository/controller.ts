import RepositoryFeatureController from "@/shared/utils/classes/repository-feature-controller";
import useControllerFactory from "@/shared/utils/functions/use-controller-factory";
import ActorRepositoryFeatureReducer from "./reducer";
import sample_data from "./data";
import type { Node, Edge } from '@xyflow/react';

export default class ActorRespositoryFeatureController extends RepositoryFeatureController<ActorType, ActorRepositoryFilters, ActorRepositoryState, ActorRepositoryAction>{

    constructor(reducer : ReducerControllerProps<ActorRepositoryState,ActorRepositoryAction>){
        super(reducer)
    }

    async initializer(): Promise<void> {
        await this.filter()
    }

    public async updateFilters(filters: ActorRepositoryFilters){
        await this.setFilters(filters)
        await this.filter()
    }

    private async filter(){
        const filters = this.getFilters()
        let data : ActorType[] = sample_data
        
        if(filters.name){
            data = data.filter(actor => actor.name.toLowerCase().includes(filters.name!.toLowerCase()))
        }

        if(filters.types && filters.types.length > 0){
            data = data.filter(actor => filters.types.includes(actor.type))
        }

        await this.setData({
            count: data.length,
            results: data
        })
    }

    public getSchema(){
        const data = this.getData()?.results

        const nodes: Node[] = []
        const edges: Edge[] = []

        if(!data || data.length === 0) return { nodes, edges }

        // layout in a simple grid for initial positions
        const cols = 5
        let index = 0

        const ensureNode = (actor: any, idx?: number) => {
            const id = typeof actor === 'string' ? `s-${idx ?? nodes.length}` : actor.id
            // avoid duplicates
            if(nodes.find(n => n.id === id)) return
            const i = nodes.length
            nodes.push({ id, position: { x: (i % cols) * 220, y: Math.floor(i / cols) * 120 }, data: actor, type: 'actor_node' })
        }

        // create nodes
        for(const item of data){
            ensureNode(item, index)
            index++
        }

        // create edges based on parents relation
        for(const item of data){
            if(typeof item === 'string') continue
            const childId = item.id
            if(!item.parents || !Array.isArray(item.parents)) continue
            for(const p of item.parents){
                let parentId: string | undefined
                if(typeof p === 'string') parentId = p
                else if(p && typeof p === 'object') parentId = p.id
                if(!parentId) continue
                // ensure parent node exists (may be referenced before defined)
                if(!nodes.find(n => n.id === parentId)){
                    nodes.push({ id: parentId, position: { x: (nodes.length % cols) * 220, y: Math.floor(nodes.length / cols) * 120 }, data: { id: parentId, name: parentId }, type: 'actor_node' })
                }
                const edgeId = `${parentId}-${childId}`
                if(!edges.find(e => e.id === edgeId)){
                    edges.push({ id: edgeId, source: parentId, target: childId })
                }
            }
        }

        return { nodes, edges }
    }
}

const initial_state : ActorRepositoryState = {
    filters: {
        types: []
    }
}

export function useControllerCreator(){
    const controller = useControllerFactory(
        ActorRepositoryFeatureReducer,
        ActorRespositoryFeatureController,
        initial_state
    )

    return controller
}

