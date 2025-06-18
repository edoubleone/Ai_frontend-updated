import { Outlet } from "react-router-dom";
import { AppSidebar } from "./sidebar";
import { DashboardHeader } from "./header";
import { useState } from "react";
import ScrollToTop from "../ScrollToTop";
import LogOutDialog from "../logout-dialog";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen relative overflow-hidden">
      <LogOutDialog />

      <ScrollToTop />
      <AppSidebar
        setSideBar={setSidebarOpen}
        open={sidebarOpen}
      />
      <div className="flex flex-1 overflow-x-hidden overflow-y-auto flex-col">
        <DashboardHeader toggleMenu={() => setSidebarOpen(true)} />
        <div className="flex-1 py-5 px-4 sm:px-8 lg:px-12 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
