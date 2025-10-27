import ActorRepositoryFeatureContext, { useContextCreator } from "../../features/actor-repository/context";
import ActorRepositoryPanelWidget from "../../widgets/actor-repository-panel";
import ActorRepositoryPoolWidget from "../../widgets/actor-repository-pool";

interface PageProps {}

export default function ActorRepositoryViewPage({} : PageProps){
    
    const context = useContextCreator()
    return (
        <ActorRepositoryFeatureContext value={context}>
            <div>
                <div>
                    <h3>
                        Repositorio de Actores
                    </h3>
                    <span>
                        Analiza, Gestiona y Conecta a los Usuarios Directos e Indirectos del sistema
                    </span>
                </div>
                <ActorRepositoryPanelWidget/>
                <ActorRepositoryPoolWidget/>
            </div>
        </ActorRepositoryFeatureContext>
    )
}