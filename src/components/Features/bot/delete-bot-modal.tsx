"use client"

import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DeleteBotModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  botName?: string
}

export function DeleteBotModal({ isOpen, onClose, onConfirm, botName = "this bot" }: DeleteBotModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-xl font-semibold text-gray-900">Are you sure?</DialogTitle>
          <DialogDescription className="text-gray-600">You are about to delete {botName}.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="flex-1 bg-blue-600 hover:bg-blue-700">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
