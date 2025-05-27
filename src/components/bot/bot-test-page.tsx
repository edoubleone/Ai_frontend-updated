"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Send, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface BotTestPageProps {
  onBack?: () => void
  onEditBot?: () => void
}

interface ChatMessage {
  id: string
  type: "bot" | "user"
  content: string
  timestamp: string
}

export function BotTestPage({ onBack, onEditBot }: BotTestPageProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content: "Testing",
      timestamp: "3:13pm",
    },
    {
      id: "2",
      type: "user",
      content: "Customer says",
      timestamp: "3:13pm",
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "user",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, newMessage])
      setMessage("")

      // Simulate bot response
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: "Thank you for your message!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, botResponse])
      }, 1000)
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
      {/* Page Header - Now integrated with main content */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-blue-600 hover:text-blue-700 p-0">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">My Bot</h1>
          </div>
          <Button onClick={onEditBot} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
            <Edit className="w-4 h-4 mr-2" />
            Edit Bot
          </Button>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Chat Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gray-50 p-4 text-center border-b border-gray-200">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-blue-600 text-white font-medium">
                    <div className="w-6 h-6 text-white">🤖</div>
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-gray-900">Elizabeth Kafaru</span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-4 space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto">
              <div className="flex justify-center">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-blue-600 text-white">
                    <div className="w-8 h-8 text-white">🤖</div>
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="text-center">
                <span className="font-medium text-gray-900">Elizabeth Kafaru</span>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-600 text-white text-xs">
                        {msg.type === "bot" ? "🤖" : "👤"}
                      </AvatarFallback>
                    </Avatar>
                    <Badge
                      variant="secondary"
                      className={
                        msg.type === "bot" ? "bg-gray-200 text-gray-700" : "bg-blue-600 text-white hover:bg-blue-600"
                      }
                    >
                      {msg.content} {msg.timestamp}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write a message.."
                  className="pr-12 bg-gray-50 border-gray-200 rounded-full"
                />
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 rounded-full"
                  disabled={!message.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Footer */}
              <div className="text-center mt-3">
                <span className="text-xs text-gray-500">Powered by Argentic AI</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg">CTA ⚡</Button>
          </div>
        </div>
      </div>
    </div>
  )
  
}
