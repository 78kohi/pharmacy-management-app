import { Pill } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function SidebarLogo() {

  return (
    (<SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-3 p-2">
          <div className="grid place-items-center bg-zinc-800 p-1 size-[35px] rounded-lg">
            <Pill className="text-gray-100" />
          </div>
          <h1 className="text-2xl font-semibold">Pharma</h1>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>)
  );
}
