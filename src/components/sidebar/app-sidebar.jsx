import {
  Archive,
  FileChartColumn,
  LayoutDashboard,
  Pill,
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
import { Link, useLocation } from "react-router"
import { CollapsibleItem } from "./nav-projects"

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
      url: "/inventory",
      icon: Archive,
    },
    {
      title: "Purchases",
      url: "/purchases",
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: Users,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: FileChartColumn,
    },
  ],
  dispenser: {
    title: "Dispenser",
    icon: Pill,
    items: [
      {
        title: "Point of Sale",
        url: "/pos"
      },
      {
        title: "Invoice",
        url: "/invoice"
      },
      {
        title: "Sales",
        url: "/sales"
      }
    ]
  },
}

export function AppSidebar({
  ...props
}) {
  const location = useLocation();
  const isActive = location.pathname === "/";

  return (
    (<Sidebar {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent className={'gap-0'}>
        <SidebarGroup className={'pb-1'}>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link to={`/`}>
                    <LayoutDashboard />
                    Home
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <CollapsibleItem items={data.dispenser} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>)
  );
}
