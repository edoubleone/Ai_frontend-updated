
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./sidebar";
import { DashboardHeader } from "./header";

export function DashboardLayout() {
  return (
    <div className="flex relative w-full min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <div className="flex-1 py-5 px-4 sm:px-8 lg:px-12 bg-[#E7E7E7] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
