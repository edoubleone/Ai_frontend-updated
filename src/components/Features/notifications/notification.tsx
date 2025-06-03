import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const NotificationComponent = () => {
  return (
    <Card className="flex items-center p-4 gap-3">
      <Avatar className="w-8 h-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-xs font-bold">CN</AvatarFallback>
      </Avatar>

      <div>
        <h1 className="text-base font-bold text-[#344054]">
          Notification Header
        </h1>
        <p className="text-sm text-dark">
          This will be the preview for notification text
        </p>
      </div>
    </Card>
  );
};

export default NotificationComponent;
