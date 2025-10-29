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
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent className="flex items-center">
        <SidebarHeader className="py-6">
          <Title>ImagiMundo</Title>
        </SidebarHeader>
        <SidebarMenu className="h-full pl-4 flex flex-col justify-center gap-6 max-w-(--sidebar-width)">
          <SidebarMenuItem>
            <Button asChild>
              <Link href={"/app/"} className="flex gap-2 ">
                <BookOpen />
                <span>Mis Historias</span>
              </Link>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button asChild>
              <Link href={"/app/new-history"} className="flex gap-2 ">
                <Plus />
                <span>Nueva Historia</span>
              </Link>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button>
              <Link href={"/app/universe"} className="flex gap-2 ">
                <Eye />
                <span>Universo</span>
              </Link>
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
