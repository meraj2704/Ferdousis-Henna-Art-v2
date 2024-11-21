import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { CiHome, CiInboxIn, CiSearch, CiSettings } from "react-icons/ci";
import { FaCalendarWeek } from "react-icons/fa";

const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: CiHome,
  },
  {
    title: "Orders",
    url: "#",
    icon: CiInboxIn,
  },
  {
    title: "Products",
    url: "#",
    icon: FaCalendarWeek,
  },
  {
    title: "Post",
    url: "#",
    icon: CiSearch,
  },
  {
    title: "Settings",
    url: "#",
    icon: CiSettings,
  },
];
const DashboardSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default DashboardSidebar;
