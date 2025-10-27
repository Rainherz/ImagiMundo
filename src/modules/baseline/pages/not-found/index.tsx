import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router";

export default function NotFoundPage(){
    return <div className="flex flex-col gap-4 items-center justify-center">
        <div>
            <h1>404</h1>
            <span>Ruta no encontrada</span>
        </div>
        <Button size={"lg"}>
            <Link
                to="/"
            >
                Volver a Inicio
            </Link>
        </Button>
    </div>
}