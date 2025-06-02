import DashboardIcon from "@/components/shared/dashboard-icon";
import BotsIcon from "@/components/shared/bots-icon";
import ConversationsIcon from "@/components/shared/conversations-icon";
import ShareIcon from "@/components/shared/share-icon";
import IntegrationsIcon from "@/components/shared/integration-icon";
import PaymentIcon from "@/components/shared/payment-icon";
import SettingsIcon from "@/components/shared/settings-icon";
import SupportIcon from "@/components/shared/support-icon";
import LogOutIcon from "@/components/shared/logout-icon";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: DashboardIcon,
  },
  {
    title: "My Bots",
    url: "/dashboard/my-bots",
    icon: BotsIcon,
  },
  {
    title: "Conversations",
    url: "/dashboard/conversations",
    icon: ConversationsIcon,
  },
  {
    title: "Test and share bots",
    url: "/dashboard/test-and-share-bots",
    icon: ShareIcon,
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
    url: "/help",
    icon: SupportIcon,
  },
  {
    title: "Logout",
    icon: LogOutIcon,
    url: "",
  },
];

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <div className="fixed lg:sticky top-0 left-0 h-screen w-64 px-6 flex flex-col border-r border-[#E7E7E7] bg-white z-40">
      <Link to={"/dashboard"} className="mb-8 mt-6">
        <img src="/kool_ai.png" width={103} height={38} alt="Kool AI logo" />
      </Link>

      <div className="flex-1 flex flex-col gap-y-20 overflow-y-auto">
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
                  <div
                    className={clsx(
                      "flex hover:bg-[#E7E7E7]/30 rounded transition-all ease-in-out duration-500 items-center gap-3 py-3 px-4"
                    )}
                  >
                    <item.icon width={20} height={20} />
                    <p className="text-sm">{item.title}</p>
                  </div>
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
