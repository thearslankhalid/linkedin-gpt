import * as React from "react"
import {
  GalleryVerticalEnd,
  Pencil,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Arslan",
    email: "arslan@tuli.com",
    avatar: "/avatars/arslan-khalid.png",
  },
  teams: [
    {
      name: "LinkedIn GPT",
      logo: GalleryVerticalEnd,
      plan: "Personal",
    },
  ],
  navMain: [
    {
      title: "Generate Post",
      url: "/",
      icon: Pencil,
      isActive: true,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
