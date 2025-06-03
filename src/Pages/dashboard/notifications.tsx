import NotificationComponent from "@/components/Features/notifications/notification";
import Button from "@/components/shared/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft2 } from "iconsax-reactjs";
import { useNavigate } from "react-router-dom";

const NotificationsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-y-5">
      <Button
        onClick={() => navigate(-1)}
        variant="outline-blue"
        className="!w-fit !bg-transparent !p-0 !border-none"
      >
        <ArrowLeft2 size={20} />
        Back
      </Button>

      <Card className="border-none flex flex-col gap-y-4 w-full rounded-lg py-8 px-4 sm:px-8 lg:px-12">
        <h1 className="text-dark font-bold text-2xl">Notifications</h1>

        <div className="flex flex-col gap-y-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <NotificationComponent key={i} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default NotificationsPage;
