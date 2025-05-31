"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Features/bot/app-siderbar";
import { DashboardHeader } from "./dashboard-header";
import { Outlet } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ViewType = "dashboard" | "edit-bot" | "test-bot" | "create-bot";

export function DashboardLayout() {
  const [, setCurrentView] = useState<ViewType>("dashboard"); // 👈 this is now correct

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full min-h-screen">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader onCreateBot={() => setCurrentView("create-bot")} />
          <Outlet />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
