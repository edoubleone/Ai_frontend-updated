import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { Button as IconButton } from "@/components/ui/button";
import Button from "@/components/shared/button";
import { ArrowRight2 } from "iconsax-reactjs";
import SearchInput from "@/components/shared/search-input";
import { MenuIcon, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import clsx from "clsx";
import LogOutIcon from "@/components/shared/logout-icon";
import SettingsIcon from "@/components/shared/settings-icon";
import { useAuth } from "@/context/auth-provider";

export function DashboardHeader({ toggleMenu }: { toggleMenu: () => void }) {
  const { pathname } = useLocation();
  const { setLogOut } = useAuth();

  return (
    <header className="flex sticky top-0 z-40 w-full items-center justify-between px-4 sm:px-8 lg:px-12 py-3.5 bg-white border-b-[1.13px] border-[#E7E7E7]">
      <div className="flex items-center gap-x-3">
        <IconButton
          onClick={toggleMenu}
          className="bg-[#F5F7FA] block lg:hidden p-2.5 rounded-md"
          variant={"ghost"}
          size={"icon"}
        >
          <MenuIcon className="size-5 text-dark" />
        </IconButton>

        <Link to="/dashboard/assistants/create-assistant">
          <Button className="!font-bold !text-base" variant="lightLavender">
            Build a Bot
            <ArrowRight2 size="18" />
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <SearchInput
          wrapperClass="hidden sm:!grid"
          inputClass="!py-2.5 !bg-[#F5F7FA]"
          placeholder="Search for something"
        />

        <div className="flex items-center gap-2.5">
          <IconButton
            className="bg-[#F5F7FA] block lg:hidden p-2.5 rounded-full"
            variant={"ghost"}
            size={"icon"}
          >
            <Search className="text-dark size-5" />
          </IconButton>

          <IconButton
            className="bg-[#F5F7FA] hidden p-2.5 rounded-full"
            variant={"ghost"}
            size={"icon"}
          >
            <img src="/icon/settings.svg" alt="settings icon" />
          </IconButton>

          <IconButton
            className="bg-[#F5F7FA] hidden p-2.5 rounded-full"
            variant={"ghost"}
            size={"icon"}
          >
            <img src="/icon/notifications.svg" alt="notifications icon" />
          </IconButton>

          <Popover>
            <PopoverTrigger className="cursor-pointer" asChild>
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback className="text-sm text-white bg-orange-500">
                  U
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>

            <PopoverContent className="!max-w-48 !p-4">
              <Link to={"/dashboard/settings"}>
                <button
                  className={clsx(
                    "flex transition-all text-sm w-full hover:bg-[#E7E7E7]/30 rounded items-start ease-in-out duration-500 gap-3 !py-3 !px-4",
                    {
                      "bg-[#EEEEFD] border-l-2 text-[#343CED] font-bold":
                        pathname === "/dashboard/settings",
                    }
                  )}
                >
                  <SettingsIcon width={16} height={16} />
                  Settings
                </button>
              </Link>

              <button
                onClick={() => setLogOut(true)}
                className={clsx(
                  "flex transition-all text-sm w-full hover:bg-[#E7E7E7]/30 rounded items-start ease-in-out duration-500 gap-3 !py-3 !px-4",
                  {
                    "bg-[#EEEEFD] border-l-2 text-[#343CED] font-bold":
                      pathname === "/dashboard/settings",
                  }
                )}
              >
                <LogOutIcon width={16} height={16} />
                Log Out
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
