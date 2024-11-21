import DashboardHeader from "@/components/share/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/share/sidebar/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen flex flex-col">
      <DashboardHeader />
      <div className="grow w-full h-full flex">
        <div className="w-44 border-r border-r-accent hidden lg:block">
          Sidebar
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
