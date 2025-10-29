import * as React from "react";
import { Plus, BookOpen, Eye } from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "./ui/8bit/button";
import Image from "next/image";
import { Card } from "./ui/8bit/card";
import { Title } from "./ui/title";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent className="flex items-center">
        <SidebarHeader className="py-6">
          <Title>ImagiMundo</Title>
        </SidebarHeader>
        <SidebarMenu className="h-full pl-4 flex flex-col justify-center gap-6 max-w-(--sidebar-width)">
          <SidebarMenuItem>
            <Button>
              <BookOpen />
              <span>Mis Historias</span>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button>
              <Plus />
              <span>Nueva Historia</span>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button>
              <Eye />
              <span>Universo</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <Image src={"/chica.png"} alt={""} width={250} height={600} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
