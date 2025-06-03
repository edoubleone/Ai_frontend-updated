import Button from "@/components/shared/button";
import { Card } from "@/components/ui/card";
import NotificationComponent from "../notifications/notification";
import { Link } from "react-router-dom";

const DashboardNotiifications = () => {
  return (
    <Card className="border-none flex flex-col gap-y-4 w-full rounded-lg py-8 px-4 sm:px-8 lg:px-12">
      <h1 className="text-dark font-bold text-2xl">Notifications</h1>

      <div className="flex flex-col gap-y-2">
        {[1, 2, 3].map((i) => (
          <NotificationComponent key={i} />
        ))}
      </div>

      <Link to={"/dashboard/notifications"}>
        <Button className="!w-fit !border-none" variant="lightLavender">
          View all notifications
        </Button>
      </Link>
    </Card>
  );
};

export default DashboardNotiifications;
