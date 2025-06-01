import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Features/bot/app-siderbar";
import { DashboardHeader } from "./dashboard-header";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full min-h-screen">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader />
          <Outlet />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
