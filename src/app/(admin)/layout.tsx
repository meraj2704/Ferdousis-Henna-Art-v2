import DashboardHeader from "@/components/share/dashboard/DashboardHeader";
import Sidebar from "@/components/share/sidebar/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full flex">
      <div className="w-64 hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="">
          <DashboardHeader />
        </div>
        <div className="grow w-full h-full flex  mt-20 ">
          <div className="flex-1 p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
