import DashboardHeader from "@/components/share/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/share/sidebar/DashboardSidebar";
import Sidebar from "@/components/share/sidebar/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen flex">
      <div className="w-64 hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 ">
        <div>
          <DashboardHeader />
        </div>
        <div className="grow w-full h-full flex">
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
