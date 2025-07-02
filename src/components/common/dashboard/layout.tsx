import { Outlet } from "react-router-dom";
import { AppSidebar } from "./sidebar";
import { DashboardHeader } from "./header";
import { useEffect, useState } from "react";
import ScrollToTop from "../ScrollToTop";
import LogOutDialog from "../logout-dialog";
import { OnboardingModal } from "@/components/Features/onboarding-modal";
import { useAuth } from "@/context/auth-provider";

export function DashboardLayout() {
  const { user } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
    if (user) {
      setShowModal(!user?.is_onboarded)
    }
  }, [user])

  return (
    <div className="flex h-screen relative overflow-hidden">
      <LogOutDialog />

      {showModal && <OnboardingModal onClose={() => setShowModal(false)} />}

      <ScrollToTop />
      <AppSidebar setSideBar={setSidebarOpen} open={sidebarOpen} />
      <div className="flex flex-1 overflow-x-hidden overflow-y-auto flex-col">
        <DashboardHeader toggleMenu={() => setSidebarOpen(true)} />
        <div className="flex-1 py-5 px-4 sm:px-8 lg:px-12 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
