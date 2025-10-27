import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar"
import SidebarWidget from "../sidebar-widget"
import { Card, CardContent } from "@/shared/components/ui/card"

interface WidgetProps extends React.PropsWithChildren{
    variant?: string
}

export default function DashboardWidget({children} : WidgetProps){
    return (
        <SidebarProvider>
            <SidebarWidget />
            <SidebarTrigger />
            <div className="flex-1 p-4">
                <Card className="h-full overflow-y-scroll">
                    <CardContent>
                        {children}
                    </CardContent>
                </Card>
            </div>
        </SidebarProvider>
    )
}