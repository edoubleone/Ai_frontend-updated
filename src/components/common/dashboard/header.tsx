import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Button as IconButton } from "@/components/ui/button";
import Button from "@/components/shared/button";
import { ArrowRight2 } from "iconsax-reactjs";
import SearchInput from "@/components/shared/search-input";

export function DashboardHeader() {
  return (
    <header className="flex sticky top-0 z-40 w-full items-center justify-between px-4 sm:px-8 lg:px-12 py-3.5 bg-white border-b-[1.13px] border-[#E7E7E7]">
      <Link to="/dashboard/create-bot">
        <Button className="!font-bold !text-base" variant="lightLavender">
          Build a Bot
          <ArrowRight2 size="18" />
        </Button>
      </Link>

      <div className="flex items-center gap-6">
        <SearchInput
          inputClass="!py-2.5 !bg-[#F5F7FA]"
          placeholder="Search for something"
        />

        <div className="flex items-center gap-2.5">
          <IconButton
            className="bg-[#F5F7FA] p-2.5 rounded-full"
            variant={"ghost"}
            size={"icon"}
          >
            <img src="/icon/settings.svg" alt="settings icon" />
          </IconButton>

          <IconButton
            className="bg-[#F5F7FA] p-2.5 rounded-full"
            variant={"ghost"}
            size={"icon"}
          >
            <img src="/icon/notifications.svg" alt="notifications icon" />
          </IconButton>

          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback className="text-sm text-white bg-orange-500">
              U
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
