"use client"

import { User, Briefcase, FolderOpen, Wrench, Mail, Home } from "lucide-react"
import { profile } from "@/lib/profile"
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
  SidebarRail,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { CustomizationPanel } from "@/components/customization-panel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigationItems = [
  { icon: Home, label: "Overview", href: "#hero", id: "hero" },
  { icon: User, label: "About", href: "#about", id: "about" },
  { icon: Briefcase, label: "Experience", href: "#experience", id: "experience" },
  { icon: FolderOpen, label: "Projects", href: "#projects", id: "projects" },
  { icon: Wrench, label: "Skills", href: "#skills", id: "skills" },
  { icon: Mail, label: "Contact", href: "#contact", id: "contact" },
]

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" className="border-r border-border/40">
      <SidebarHeader className="border-b border-border/40 p-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/centered-headshot-avatar.png" alt={profile.name} />
            <AvatarFallback>
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{profile.name}</span>
            <span className="text-xs text-muted-foreground">{profile.title}</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    className="h-10 px-3 rounded-lg hover:bg-accent/50 transition-all duration-200 group"
                  >
                    <a href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-3">
        <div className="flex items-center justify-between">
          <CustomizationPanel />
          <ThemeToggle />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
