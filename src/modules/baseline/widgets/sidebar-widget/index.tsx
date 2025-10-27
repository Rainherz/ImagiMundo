import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui/sidebar";
import { Blocks, BlocksIcon, Building2, Component, ComponentIcon, FileBox, Gamepad2Icon, Gem, Grid2X2PlusIcon, HammerIcon, Home, ToolCaseIcon, UnplugIcon, User2, UserCog2Icon } from "lucide-react";
import { Link } from "react-router";

interface SidebarWidget extends React.PropsWithChildren {}

const items = [
    {
        url: "/",
        title: "Dashboard",
        icon: Home,
    },
    {
        url: "/actors",
        title: "Actores",
        icon: UserCog2Icon,
    },
    {
        url: "/requirements",
        title: "Requerimientos",
        icon: BlocksIcon
    },
    {
        url: "/artifacts",
        title: "Artefactos",
        icon: FileBox,
    },
    {
        url: "/design",
        title: "Diseño",
        icon: Gem,
    },
    {
        url: "/components",
        title: "Componentes",
        icon: ComponentIcon,
    },
    {
        url: "/test",
        title: "Testing",
        icon: ToolCaseIcon, 
    },
    {
        url: "/demo",
        title: "Demo",
        icon: Gamepad2Icon
    },
    {
        url: "/build",
        title: "Construccion",
        icon: HammerIcon,
    },
    {
        url: "/integrations",
        title: "Integraciones",
        icon: UnplugIcon,
    }
]

export default function SidebarWidget({}: SidebarWidget){
    return <Sidebar>
        <SidebarHeader>
            Auroboros Development
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>
                    Apps del proyecto <br/> === Gabo-Loco-Vanilla ===
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((e) => <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link
                                    to={e.url}
                                >
                                    <e.icon />
                                    <span>
                                        {e.title}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>)}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
}