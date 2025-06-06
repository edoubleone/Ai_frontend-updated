import { Outlet } from "react-router-dom";
import { AppSidebar } from "./sidebar";
import { DashboardHeader } from "./header";
import { useState } from "react";
import ScrollToTop from "../ScrollToTop";
import LogOutDialog from "../logout-dialog";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex relative w-full min-h-screen">
      <LogOutDialog />

      <ScrollToTop />
      <AppSidebar
        toggleMenu={() => setSidebarOpen(!sidebarOpen)}
        open={sidebarOpen}
      />
      <div className="flex flex-1 flex-col">
        <DashboardHeader toggleMenu={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 py-5 px-4 sm:px-8 lg:px-12 bg-gray-50 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
