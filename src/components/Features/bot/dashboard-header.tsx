import { Search, Settings, Bell, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  onCreateBot: () => void
}

const DashboardHeader:React.FC<DashboardHeaderProps> = ({onCreateBot}) => {

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 sticky z-10 top-0">
      <div className="flex items-center">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg" onClick={onCreateBot}>
          Build a Bot
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search for something"
            className="pl-10 pr-4 py-2 w-80 bg-gray-50 border-gray-200 rounded-lg"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Settings className="w-5 h-5 text-gray-600" />
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500" />
        </Button>

        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
          <AvatarFallback className="bg-orange-500 text-white text-sm">U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export default DashboardHeader;
