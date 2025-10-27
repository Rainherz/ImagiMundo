import { Outlet } from "react-router";
import DashboardWidget from "../../widgets/dashboard-widget";

interface PageProps {}

export default function DashboardPage({} : PageProps){
    return <DashboardWidget>
        <Outlet />
    </DashboardWidget>
}