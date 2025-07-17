import { Card } from "@/components/ui/card";

import AvatarComponent from "@/components/shared/custom-avatar";

const AdminDashboardNotifications = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-dark">Notifications</h1>

      <div className="flex flex-col gap-y-6">
        <Card className="flex gap-x-4 p-4">
          <AvatarComponent fallback="sk" />

          <div>
            <h1 className="text-[#2E2E2E] text-base font-semibold">New user joined</h1>
            <p className="text-[#737373] text-sm">Today · 11:34 AM</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardNotifications;
