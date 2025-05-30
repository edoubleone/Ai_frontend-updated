import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from 'react'

export interface BotChatPreviewProps {
    switchColor?: string
}

const BotChatPreview:React.FC<BotChatPreviewProps> = ({switchColor}) => {

    const [message, setMessage] = React.useState("");

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
    <div className="w-96 h-full">
          <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className={`bg-gray-800 text-white text-sm font-medium`}>EK</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className={`font-medium text-gray-900`}>Elizabeth Kafau</h4>
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
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 ${switchColor}`}
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
  )
}

export default BotChatPreview