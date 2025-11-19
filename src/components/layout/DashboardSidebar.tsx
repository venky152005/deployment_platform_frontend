import { Home, FolderGit2, Settings, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Overview", url: "/dashboard", icon: Home },
  { title: "Projects", url: "/projects", icon: FolderGit2 },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Account", url: "/account", icon: User },
];

export const DashboardSidebar = () => {
  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold">DeployHub</h1>
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end
                      className="flex items-center gap-3 px-6 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      activeClassName="bg-secondary text-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
