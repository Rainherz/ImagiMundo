"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, type ReactElement } from "react";
import {
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Breadcrumb,
  BreadcrumbList,
} from "./ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Skeleton } from "./ui/skeleton";
import {
  IconCreditCard,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";
import { Badge } from "./ui/badge";
import { MenuIcon } from "lucide-react";

export function SiteHeader({ home }: { home?: boolean }) {
  const pathname = usePathname();
  const all = pathname.split("/").filter(Boolean);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () =>
      setWindowWidth(document.documentElement.clientWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const breadcrumbItems: ReactElement[] = [];
  let breadcrumbPage: ReactElement = <></>;
  const maxWidth = ((windowWidth - 120) / (all.length + 3)).toFixed(0);
  for (let i = 1; i < all.length; i++) {
    const route = all[i];
    const href = `/app/${all.slice(1, i + 1).join("/")}`;
    if (i === all.length - 1) {
      breadcrumbPage = (
        <BreadcrumbItem>
          <BreadcrumbPage
            className="capitalize min-w-[20px]  max-w-[200px]  truncate"
            style={{
              maxWidth: `${Math.min(200, Number(maxWidth))}px`,
            }}
          >
            {decodeURIComponent(route)}
          </BreadcrumbPage>
        </BreadcrumbItem>
      );
    } else {
      breadcrumbItems.push(
        <React.Fragment key={href}>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={href}
              className={"capitalize min-w-10    truncate"}
              style={{ maxWidth: `${maxWidth}px` }}
            >
              {decodeURIComponent(route)}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </React.Fragment>
      );
    }
  }

  const { data: session, status } = useSession();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div
        suppressHydrationWarning
        className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6"
      >
        {!home && (
          <>
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
          </>
        )}
        {/* <h1 className="text-base font-medium">Tus cuentas</h1> */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/app">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {breadcrumbItems}
            {breadcrumbPage}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          {session?.user?.name && (
            <Badge className="truncate tracking-wider">
              {session.user.name.toUpperCase()}
            </Badge>
          )}
          {(home && status === "loading") || !session?.user ? (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-12 " />
              {/* <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div> */}
            </div>
          ) : (
            home && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 rounded-lg ">
                      <AvatarImage
                        src={session.user.image ?? undefined}
                        alt={session.user.name ?? undefined}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <Badge variant="outline" className="ml-2">
                      <MenuIcon />
                    </Badge>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  side={"bottom"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={session.user.image ?? undefined}
                          alt={session.user.name ?? undefined}
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                          {session.user.name}
                        </span>
                        <span className="text-muted-foreground truncate text-xs">
                          {session.user.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <IconUserCircle />
                      Cuenta
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconCreditCard />
                      Facturacion
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() =>
                      void signOut({
                        redirect: true,
                        callbackUrl: "/sign-in",
                      })
                    }
                    className="cursor-pointer"
                  >
                    <IconLogout />
                    Cerrar sesion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          )}
        </div>
      </div>
    </header>
  );
}
