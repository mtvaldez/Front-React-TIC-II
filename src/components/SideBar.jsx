import { Home, LineChart, History, Settings, LogOut, List } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

function SideBar() {
  const items = [
    { title: "Home", url: "/menu", icon: Home },
    { title: "Historic Data", url: "/historic", icon: History },
    { title: "Statistics", url: "/stats", icon: LineChart },
    { title: "Users", url: "/users", icon: List },
    { title: "Settings", url: "/settings", icon: Settings },
    
  ];

  return (
    <Sidebar className="w-64 bg-black min-h-screen">
      <SidebarContent className="flex flex-col h-full">
        {/* Top section: Menu items */}
        <div>
          <SidebarGroup>
            <SidebarGroupLabel className="text-black text-lg px-11 py-10 uppercase tracking-wide text-center w-full font-semibold mb-3">
              Welcome Back!
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-4">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-4 px-5 py-4 rounded-md text-gray-800 hover:text-gray-900 hover:bg-[#0a0a0a] font-semibold text-base transition-colors"
                      >
                        <item.icon className="w-6 h-6 text-gray-800 hover:text-gray-900 transition-colors" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Bottom section: Log out item */}
        <div className="mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href="/"
                      className="flex items-center gap-4 px-5 py-6 rounded-md text-gray-800 hover:text-gray-900 hover:bg-[#0a0a0a] font-semibold text-base transition-colors"
                    >
                      <LogOut className="w-6 h-6 text-gray-800 hover:text-gray-900 transition-colors" />
                      <span>Log out</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export default SideBar;
