"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Send, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface BotEditPageProps {
  onBack?: () => void
}

export function BotEditPage({ onBack }: BotEditPageProps) {
  const [settings, setSettings] = useState({
    general: true,
    colorsAndStyle: true,
    chatButton: true,
    additionalSettings: true,
  })

  const [message, setMessage] = useState("")

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 hover:text-gray-900 p-0">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mt-2">My Bot</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 p-6">
        {/* Settings Panel - Left Side */}
        <div className="flex-1 space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">General</h3>
              <Switch checked={settings.general} onCheckedChange={() => handleSettingChange("general")} />
            </div>
            <p className="text-sm text-gray-600">Set your bot name, avatar, description and functionality</p>
          </div>

          {/* Colors and Style */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">Colors and style</h3>
              <Switch checked={settings.colorsAndStyle} onCheckedChange={() => handleSettingChange("colorsAndStyle")} />
            </div>
            <p className="text-sm text-gray-600">Appearance of the chat header and the chat window styles</p>
          </div>

          {/* Chat Button */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">Chat button</h3>
              <Switch checked={settings.chatButton} onCheckedChange={() => handleSettingChange("chatButton")} />
            </div>
            <p className="text-sm text-gray-600">Customize the appearance of the chat button</p>
          </div>

          {/* Additional Settings */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">Additional settings</h3>
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
        <div className="w-96">
          <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gray-800 text-white text-sm font-medium">EK</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-gray-900">Elizabeth Kafau</h4>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gray-600 text-white text-xs">EK</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-700">Elizabeth Kafau</span>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  <span className="text-sm text-gray-600">Testing</span>
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                    1.3min
                  </Badge>
                </div>
                <Badge className="bg-gray-800 text-white text-xs px-3 py-1">Customer says: 1.3min</Badge>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-4">
              {/* This would contain chat messages */}
              <div className="h-full flex items-center justify-center text-gray-400">
                {/* Chat messages would appear here */}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write a message..."
                  className="pr-12 bg-gray-50 border-gray-200"
                />
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <span>Powered by Argenic AI</span>
                <div className="flex items-center gap-1">
                  <Command className="w-3 h-3" />
                  <span>⌘</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Changes Button - Fixed Position */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">Save Changes</Button>
        </div>
      </div>
    </div>
  )
}
