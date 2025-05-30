"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import BotChatPreview, { type BotChatPreviewProps } from "./BotChatPreview"

export interface BotEditPageProps extends BotChatPreviewProps {
  onBack?: () => void
}

export function BotEditPage({ onBack, switchColor }: BotEditPageProps) {
  const [settings, setSettings] = useState({
    general: true,
    colorsAndStyle: true,
    chatButton: true,
    additionalSettings: true,
  })

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }


  return (
    <div className={`flex flex-col h-full ${onBack && "bg-gray-50"}`}>
      {/* Header with Back Button */}
      {onBack && <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 hover:text-gray-900 p-0">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mt-2">My Bot</h1>
      </header>}

      {/* Main Content */}
      <div className={`flex-1 flex gap-6 ${onBack && "p-6"}`}>
        {/* Settings Panel - Left Side */}
        <div className="flex-1 space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-lg font-medium text-gray-900`}>General</h3>
              <Switch checked={settings.general} className={switchColor} onCheckedChange={() => handleSettingChange("general")} />
            </div>
            <p className="text-sm text-gray-600">Set your bot name, avatar, description and functionality</p>
          </div>

          {/* Colors and Style */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-lg font-medium text-gray-900`}>Colors and style</h3>
              <Switch checked={settings.colorsAndStyle} onCheckedChange={() => handleSettingChange("colorsAndStyle")} />
            </div>
            <p className="text-sm text-gray-600">Appearance of the chat header and the chat window styles</p>
          </div>

          {/* Chat Button */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-lg font-medium text-gray-900`}>Chat button</h3>
              <Switch checked={settings.chatButton} onCheckedChange={() => handleSettingChange("chatButton")} />
            </div>
            <p className="text-sm text-gray-600">Customize the appearance of the chat button</p>
          </div>

          {/* Additional Settings */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-lg font-medium text-gray-900`}>Additional settings</h3>
              <Switch
                checked={settings.additionalSettings}
                onCheckedChange={() => handleSettingChange("additionalSettings")}
              />
            </div>
            <p className="text-sm text-gray-600">
              Configure the conversation timeout, enabling parameters and chat initialization delay for a seamless user
              experience
            </p>
          </div>
        </div>

        {/* Chat Preview - Right Side */}
        <div>
          <BotChatPreview />
        </div>
      </div>

      {/* Save Changes Button - Fixed Position */}
      {onBack && <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">Save Changes</Button>
        </div>
      </div>}
    </div>
  )
}
