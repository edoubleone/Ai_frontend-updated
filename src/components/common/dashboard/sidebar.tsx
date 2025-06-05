import DashboardIcon from "@/components/shared/dashboard-icon";
import BotsIcon from "@/components/shared/bots-icon";
import ConversationsIcon from "@/components/shared/conversations-icon";
import IntegrationsIcon from "@/components/shared/integration-icon";
import PaymentIcon from "@/components/shared/payment-icon";
import SettingsIcon from "@/components/shared/settings-icon";
import SupportIcon from "@/components/shared/support-icon";
import LogOutIcon from "@/components/shared/logout-icon";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useAuth } from "@/context/auth-provider";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: DashboardIcon,
  },
  {
    title: "My Assistants",
    url: "/dashboard/assistants",
    icon: BotsIcon,
  },
  {
    title: "Conversations",
    url: "/dashboard/conversations",
    icon: ConversationsIcon,
  },
  {
    title: "Integrations",
    url: "/dashboard/integrations",
    icon: IntegrationsIcon,
  },
  {
    title: "Payments",
    url: "/dashboard/payments",
    icon: PaymentIcon,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: SettingsIcon,
  },
];

const footerItems = [
  {
    title: "Help and Support",
    url: "/dashboard/help",
    icon: SupportIcon,
  },
  {
    title: "Logout",
    icon: LogOutIcon,
    url: "",
  },
];

export function AppSidebar({
  open,
  toggleMenu,
}: {
  open: boolean;
  toggleMenu: () => void;
}) {
  const { pathname } = useLocation();
  const { setLogOut } = useAuth();

  return (
    <div
      className={clsx(
        "fixed lg:sticky lg:flex top-0 left-0 h-full lg:translate-x-0 duration-300 ease-linear transition-all lg:h-screen py-6 lg:py-0 w-64 px-6 flex-col border-r border-[#E7E7E7] bg-white z-50 lg:z-40",
        `${open ? "translate-x-0" : "-translate-x-full"}`
      )}
    >
      <div className="flex items-center justify-between">
        <Link to={"/dashboard"} className="mt-6">
          <img src="/kool_ai.png" width={103} height={38} alt="Kool AI logo" />
        </Link>

        <Button
          onClick={toggleMenu}
          className="bg-[#F5F7FA] block lg:hidden p-2.5 rounded-full"
          variant={"ghost"}
          size={"icon"}
        >
          <XIcon className="text-dark size-5" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col pt-8 gap-y-20 no-scroll overflow-y-auto">
        <div className="flex flex-col gap-y-4">
          {navigationItems.map((route) => (
            <Link to={route.url} key={route.title}>
              <div
                className={clsx(
                  "flex transition-all ease-in-out duration-500 items-center gap-3 py-3 px-4",
                  {
                    "bg-[#EEEEFD] border-l-2 text-[#343CED] font-bold border-[#343CED] rounded-r":
                      pathname === route.url,
                    "hover:bg-[#E7E7E7]/30 rounded": pathname !== route.url,
                  }
                )}
              >
                <route.icon width={20} height={20} />
                <p className="text-sm">{route.title}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-y-4 mt-6 mb-6">
          {footerItems.map((item) => {
            return (
              <>
                {item.title === "Logout" ? (
                  <button
                    key={item.title}
                    onClick={() => setLogOut(true)}
                    className={clsx(
                      "flex hover:bg-[#E7E7E7]/30 outline-none focus:outline-none rounded transition-all ease-in-out duration-500 items-center gap-3 py-3 px-4"
                    )}
                  >
                    <item.icon width={20} height={20} />
                    <p className="text-sm">{item.title}</p>
                  </button>
                ) : (
                  <Link to={item.url} key={item.title}>
                    <div
                      className={clsx(
                        "flex transition-all ease-in-out duration-500 items-center gap-3 py-3 px-4",
                        {
                          "bg-[#EEEEFD] border-l-2 text-[#343CED] font-bold border-[#343CED] rounded-r":
                            pathname === item.url,
                          "hover:bg-[#E7E7E7]/30 rounded":
                            pathname !== item.url,
                        }
                      )}
                    >
                      <item.icon width={20} height={20} />
                      <p className="text-sm">{item.title}</p>
                    </div>
                  </Link>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
