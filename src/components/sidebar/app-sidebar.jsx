import * as React from "react"
import {
  Archive,
  FileChartColumn,
  LayoutDashboard,
  ShoppingBasket,
  ShoppingCart,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import { SidebarLogo } from "@/components/sidebar/sidebar-header"
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
} from "@/components/ui/sidebar"
import { Link } from "react-router"

// This is sample data.
const data = {
  user: {
    name: "Kohi",
    email: "kohi@example.com",
    avatar: `https://avatar.iran.liara.run/public/?username=kohi`,
  },
  navMain: [
    {
      title: "Inventory",
      url: "#",
      icon: Archive,
    },
    {
      title: "Purchases",
      url: "#",
      icon: ShoppingCart,
    },
    {
      title: "Sales",
      url: "#",
      icon: ShoppingBasket,
    },
    {
      title: "Customers",
      url: "#",
      icon: Users,
    },
    {
      title: "Reports",
      url: "#",
      icon: FileChartColumn,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link to={`/`}>
                    <LayoutDashboard />
                    Home
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>)
  );
}
