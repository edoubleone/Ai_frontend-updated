"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Features/bot/app-siderbar"; // Fix the typo here
import { DashboardHeader } from "@/components/Features/bot/dashboard-header";
import { Outlet } from "react-router-dom";

export function TempDashboardLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader />
         <div className="min-h-screen">
             <Outlet />
         </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
