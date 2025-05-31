"use client"

import { useState } from "react"
import { Search, Filter, Download, MoreHorizontal, ChevronLeft, ChevronRight, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DeleteBotModal } from "@/components/Features/bot/delete-bot-modal"
import { useToast } from "@/hooks/use-toast"

interface Bot {
  id: string
  name: string
  type: string
  language: string
  status: "Bot in Progress" | "Bot created"
  avatar: string
}

interface BotsContentProps {
  onEditBot?: (botId: string) => void
  onDuplicateBot?: (botId: string) => void
  onCreateBot?: () => void
}

const initialBotsData: Bot[] = [
  { id: "1", name: "Elizabeth", type: "Text", language: "English", status: "Bot in Progress", avatar: "🤖" },
  { id: "2", name: "Elizabeth", type: "Text", language: "English", status: "Bot created", avatar: "👤" },
  { id: "3", name: "Elizabeth", type: "Text", language: "English", status: "Bot created", avatar: "👤" },
  { id: "4", name: "Elizabeth", type: "Text", language: "English", status: "Bot created", avatar: "👤" },
  { id: "5", name: "Elizabeth", type: "Text", language: "English", status: "Bot created", avatar: "👤" },
  { id: "6", name: "Elizabeth", type: "Text", language: "English", status: "Bot created", avatar: "👤" },
  { id: "7", name: "Elizabeth", type: "Text", language: "English", status: "Bot created", avatar: "👤" },
  { id: "8", name: "Elizabeth", type: "Text", language: "English", status: "Bot created", avatar: "🤖" },
  { id: "9", name: "Elizabeth", type: "Text", language: "English", status: "Bot created", avatar: "👤" },
  { id: "10", name: "Elizabeth", type: "Text", language: "English", status: "Bot created", avatar: "🤖" },
]

export function BotsContent({ onEditBot, onDuplicateBot, onCreateBot }: BotsContentProps) {
  const [botsData, setBotsData] = useState<Bot[]>(initialBotsData)
  const [selectedBots, setSelectedBots] = useState<string[]>([])
  // const [currentPage, setCurrentPage] = useState(1)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [botToDelete, setBotToDelete] = useState<Bot | null>(null)
  const { toast } = useToast()

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBots(botsData.map((bot) => bot.id))
    } else {
      setSelectedBots([])
    }
  }

  const handleSelectBot = (botId: string, checked: boolean) => {
    if (checked) {
      setSelectedBots([...selectedBots, botId])
    } else {
      setSelectedBots(selectedBots.filter((id) => id !== botId))
    }
  }

  const handleEditBot = (botId: string) => {
    onEditBot?.(botId)
  }

  const handleDuplicateBot = (botId: string) => {
    onDuplicateBot?.(botId)
  }

  const handleDeleteClick = (bot: Bot) => {
    setBotToDelete(bot)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (botToDelete) {
      setBotsData((prev) => prev.filter((bot) => bot.id !== botToDelete.id))
      setSelectedBots((prev) => prev.filter((id) => id !== botToDelete.id))
      toast({
        title: "Bot deleted",
        description: `${botToDelete.name} has been successfully deleted.`,
      })
      setBotToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false)
    setBotToDelete(null)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Bots</h1>
        </div>
        <Button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700" onClick={onCreateBot}>
          Build a Bot
          <ChevronRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </header>

      {/* Analytics Cards */}
      <div className="mb-6">
        <h2 className="mb-4 text-lg font-medium text-gray-700">Analytics</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="border-blue-100 bg-blue-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                  <span className="text-blue-600">🤖</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2 text-base font-medium text-gray-700">Total Bots created</CardTitle>
              <p className="text-3xl font-bold text-blue-600">{botsData.length}</p>
            </CardContent>
          </Card>

          <Card className="border-purple-100 bg-purple-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                  <span className="text-purple-600">🗑️</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2 text-base font-medium text-gray-700">Total Bots Deleted</CardTitle>
              <p className="text-3xl font-bold text-purple-600">{initialBotsData.length - botsData.length}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <Input placeholder="Search bot" className="py-2 pl-10 pr-4 border-gray-200 rounded-lg bg-gray-50" />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort:</span>
            <Select defaultValue="recent">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>

          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Bots Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={selectedBots.length === botsData.length} onCheckedChange={handleSelectAll} />
              </TableHead>
              <TableHead>Bot</TableHead>
              <TableHead>Assistant's Name</TableHead>
              <TableHead>Bot's Type</TableHead>
              <TableHead>Assistant's Language</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {botsData.map((bot) => (
              <TableRow key={bot.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedBots.includes(bot.id)}
                    onCheckedChange={(checked) => handleSelectBot(bot.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center w-8 h-8 text-sm bg-gray-100 rounded-full">
                    {bot.avatar}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{bot.name}</TableCell>
                <TableCell>{bot.type}</TableCell>
                <TableCell>{bot.language}</TableCell>
                <TableCell>
                  <Badge
                    variant={bot.status === "Bot created" ? "default" : "secondary"}
                    className={
                      bot.status === "Bot created"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                    }
                  >
                    {bot.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditBot(bot.id)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateBot(bot.id)}>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteClick(bot)} className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="default" size="sm" className="text-white bg-blue-600">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show:</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteBotModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        botName={botToDelete?.name}
      />
    </div>
  )
}
