import { Card, CardContent } from "@/shared/components/ui/card";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { User2Icon } from "lucide-react";

type ComponentProps = Node<ActorType, 'actor_node'>

export default function ActorNode({data}:NodeProps<ComponentProps>) {
    //alert('Actor Node' + JSON.stringify(props))
    //alert('hello from actor node: ' + JSON.stringify(data))
    return <Card className="p-2 border-blue-500 border-2">
        <CardContent className="flex flex-col items-center gap-1 p-2">
            <User2Icon />
            <small>{data.name}</small>
        </CardContent>
        <Handle type="target" position={Position.Left} className="bg-blue-500 w-3 h-3" />
        <Handle type="source" position={Position.Right} className="bg-blue-500 w-3 h-3" />
    </Card>
}