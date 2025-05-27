"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Features/bot/app-siderbar" // Fix the typo here
import { DashboardHeader } from "@/components/Features/bot/dashboard-header"
import { BotsContent } from "@/components/Features/bot/bots-content"
import { BotEditPage } from "@/components/Features/bot/bot-edit-page"
import { BotTestPage } from "@/components/Features/bot/bot-test-page"

type ViewType = "dashboard" | "edit-bot" | "test-bot"

export function DashboardLayout() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard")
  const [selectedBotId, setSelectedBotId] = useState<string | null>(null)

  const handleEditBot = (botId: string) => {
    setSelectedBotId(botId)
    setCurrentView("edit-bot")
  }

  const handleDuplicateBot = (botId: string) => {
    setSelectedBotId(botId)
    setCurrentView("test-bot")
  }

  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
    setSelectedBotId(null)
  }

  const handleEditFromTest = () => {
    setCurrentView("edit-bot")
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {currentView === "dashboard" ? (
            <>
              <DashboardHeader />
              <BotsContent onEditBot={handleEditBot} onDuplicateBot={handleDuplicateBot} />
            </>
          ) : currentView === "edit-bot" ? (
            <BotEditPage onBack={handleBackToDashboard} />
          ) : (
            <>
              <DashboardHeader />
              <BotTestPage onBack={handleBackToDashboard} onEditBot={handleEditFromTest} />
            </>
          )}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
