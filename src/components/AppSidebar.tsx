import { NavLink, useLocation } from "react-router-dom"
import {
  Activity,
  MapPin,
  AlertTriangle,
  FileText,
  TrendingUp,
  Bot,
  Search,
  Menu
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  { title: "Simulation", url: "/simulation", icon: Activity },
  { title: "Map Route", url: "/maproute", icon: MapPin },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
  { title: "Summary", url: "/summary", icon: FileText },
  { title: "Bottleneck Prediction", url: "/bottleneck-prediction", icon: TrendingUp },
  { title: "AI Help", url: "/ai-help", icon: Bot },
  { title: "Lost and Found", url: "/lost-and-found", icon: Search },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const collapsed = state === "collapsed"

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
      isActive 
        ? "bg-primary text-primary-foreground shadow-lg" 
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    }`

  return (
    <Sidebar
      className={`border-r border-sidebar-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        <div className="mb-6">
          <h2 className={`font-bold text-lg text-sidebar-primary transition-all duration-200 ${
            collapsed ? "text-center text-sm" : ""
          }`}>
            {collapsed ? "SND" : "Sim Nav Dashboard"}
          </h2>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={`mb-3 text-sidebar-muted-foreground font-medium ${
            collapsed ? "text-center" : ""
          }`}>
            {collapsed ? "•••" : "Navigation"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className={`h-5 w-5 flex-shrink-0 ${collapsed ? "mx-auto" : ""}`} />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}