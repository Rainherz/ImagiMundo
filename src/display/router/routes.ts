import BaselineRoutes from "@/modules/baseline";
import DashboardPage from "@/modules/baseline/pages/dashboard";
import NotFoundPage from "@/modules/baseline/pages/not-found";
import type { RouteObject } from "react-router"
/**
 * @constant routes
 * Declara las rutas de los objetivos
 */

const routes : RouteObject[] = [
    {
        path: "/",
        Component: DashboardPage,
        children: [
            BaselineRoutes,
        ],
        ErrorBoundary: NotFoundPage,
    }
]

export default routes
