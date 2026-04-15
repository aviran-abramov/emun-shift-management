"use client";

import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";
import {
  PanelsTopLeft,
  ClipboardList,
  Building2,
  Contact,
  CalendarClock,
} from "lucide-react";
import { NavItem } from "@/lib/sidebar-nav";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PanelTrigger } from "@/components/layout/panel-trigger";

interface AppSidebarProps {
  userType: "admin" | "guard";
  navItems: NavItem[];
}

const navIcons = {
  PanelsTopLeft,
  ClipboardList,
  Building2,
  Contact,
  CalendarClock,
};

export function AppSidebar({ userType, navItems }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar side="right" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center">
          <SidebarMenu className="flex-1 group-data-[collapsible=icon]:hidden">
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <Link href={`/${userType}/dashboard`}>
                  <Image
                    src="/favicon.ico"
                    height={30}
                    width={30}
                    alt="emun logo"
                  />
                  <span className="font-semibold">מוקד אמון</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <PanelTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = navIcons[item.icon];
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-10! gap-1.5 [&>svg]:size-6! data-[active=true]:bg-[#FFEFE5]"
                    >
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-between px-2 py-2 group-data-[collapsible=icon]:hidden">
          <p className="font-semibold">שקד</p>
          <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
            מנהל
          </Badge>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
