import { Outlet } from "react-router-dom";
import { AppSidebar } from "./sidebar";
import { DashboardHeader } from "./header";
import { useState } from "react";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex relative w-full min-h-screen">
      <AppSidebar
        toggleMenu={() => setSidebarOpen(!sidebarOpen)}
        open={sidebarOpen}
      />
      <div className="flex flex-1 flex-col">
        <DashboardHeader toggleMenu={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 py-5 px-4 sm:px-8 lg:px-12 bg-[#E7E7E7] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
