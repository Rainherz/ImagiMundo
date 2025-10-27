import { useContext } from "react"
import ActorRepositoryFeatureContext from "../../features/actor-repository/context"
import { FlowChart } from "@/shared/components/ui/flow-chart"

interface WidgetProps {}

export default function ActorRepositoryPoolWidget({} : WidgetProps){
    const controller = useContext(ActorRepositoryFeatureContext)
    
    const data = controller?.getData()

    const {nodes, edges} = controller?.getSchema() || { nodes: [], edges: [] }
    
    //alert(JSON.stringify(nodes))
    //alert(JSON.stringify(edges))
    return (<div>
        {/*data?.results.map((actor) => (<div key={actor.id}>
            {actor.name} - {actor.type.value}
        </div>))*/}
        {
            nodes ?
            <FlowChart 
                nodes={nodes}
                edges={edges}
            /> : "No data to show"
        }
    </div>)
}