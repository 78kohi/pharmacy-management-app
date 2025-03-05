/* eslint-disable react/prop-types */
import {
  ChevronRight,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Link, useLocation } from "react-router";

export function CollapsibleItem({ items }) {
  const location = useLocation();
  const isActive = items.items?.some(item => location.pathname === item.url);
  return (
    <SidebarGroup className={'py-1'}>
      <SidebarMenu>
        <Collapsible
          key={items.title}
          asChild
          defaultOpen={isActive}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={items.title}>
                {items.icon && <items.icon />}
                <span>{items.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {items.items?.map((subItem) => {
                  const isActive = location.pathname === subItem.url;
                  return (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild isActive={isActive}>
                        <Link to={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
