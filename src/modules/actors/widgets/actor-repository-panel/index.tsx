import { useContext, useState } from "react"
import ActorRepositoryFeatureContext from "../../features/actor-repository/context"
import { Card, CardContent } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { FilterIcon, PlusCircleIcon } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/shared/components/ui/input-group"

interface WidgetProps {}

export default function ActorRepositoryPanelWidget({}: WidgetProps){

    const controller = useContext(ActorRepositoryFeatureContext)
    
    const filters = controller?.getFilters()

    const [nameFilter, setNameFilter] = useState(filters?.name || "")

    return (
        <Card>
            <CardContent className="flex gap-2">
                <div className="flex flex-col gap-2 flex-1">
                    <h4>
                        Filtros
                    </h4>
                    <Button
                        onClick={() => controller?.updateFilters({
                            name: nameFilter,
                            types: []
                        })}
                    >
                        <FilterIcon /> 
                        Filtrar
                    </Button>
                    <Button>
                        <PlusCircleIcon />
                        Añadir
                    </Button>
                </div>
                <div className="flex-5 space-y-2">
                    <InputGroup>
                        <InputGroupAddon align="inline-start" className="border-r p-2">
                            <InputGroupText>
                                Nombre de Actor
                            </InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput placeholder="Matches with ... *"
                            onChange={(e) => setNameFilter(e.target.value)}
                            value={nameFilter}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon align="block-start" className="border-b p-2">
                            <InputGroupText>
                                Tipos de Actor
                            </InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput placeholder="Limited to ... * " readOnly/>
                    </InputGroup>
                </div>
            </CardContent>
        </Card>
    )
}