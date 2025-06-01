import { Search, Settings, Bell, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";


export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <Link to="/dashboard/CreateBot">
          <Button
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Build a Bot
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <Input
            placeholder="Search for something"
            className="py-2 pl-10 pr-4 border-gray-200 rounded-lg w-80 bg-gray-50"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Settings className="w-5 h-5 text-gray-600" />
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <Badge className="absolute w-2 h-2 p-0 bg-red-500 -top-1 -right-1" />
        </Button>

        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
          <AvatarFallback className="text-sm text-white bg-orange-500">U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
