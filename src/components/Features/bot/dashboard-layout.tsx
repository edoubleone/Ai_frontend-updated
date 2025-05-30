"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Features/bot/app-siderbar"
import { BotsContent } from "@/components/Features/bot/bots-content"
import { BotEditPage } from "@/components/Features/bot/bot-edit-page"
import { BotTestPage } from "@/components/Features/bot/bot-test-page"
import CreateBot from "./create-bot/CreateBot"
import { DashboardHeader } from "./dashboard-header";

type ViewType = "dashboard" | "edit-bot" | "test-bot" | "create-bot"

export function DashboardLayout() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard")
  const handleEditBot = () => {
    setCurrentView("edit-bot")
  }

  const handleDuplicateBot = () => {
    setCurrentView("test-bot")
  }

  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
  }

  const handleEditFromTest = () => {
    setCurrentView("edit-bot")
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full min-h-screen">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {currentView === "dashboard" ? (
            <>
              <DashboardHeader onCreateBot={() => setCurrentView("create-bot")} />
              <BotsContent onCreateBot={() => setCurrentView("create-bot")} onEditBot={handleEditBot} onDuplicateBot={handleDuplicateBot} />
            </>
          ) : currentView === "edit-bot" ? (
              <BotEditPage onBack={handleBackToDashboard} />
          ) : currentView === "create-bot" ? (
            <>
              <DashboardHeader onCreateBot={() => setCurrentView("create-bot")} />
              <CreateBot onBack={handleBackToDashboard} />
            </>
          ) : (
            <>
              <DashboardHeader onCreateBot={() => setCurrentView("create-bot")} />
              <BotTestPage onBack={handleBackToDashboard} onEditBot={handleEditFromTest} />
            </>
          )}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
