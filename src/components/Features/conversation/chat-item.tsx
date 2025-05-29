import AvatarComponent from "@/components/shared/custom-avatar";
import { ClockIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { IAssistant } from "@/services/models/conversation.model";

const ChatItemComponent: React.FC<IAssistant> = ({ name }) => {
  return (
    <div className="flex justify-between w-full gap-4">
      <div className="flex gap-4">
        <AvatarComponent />
      <div className="flex flex-col gap-y-1">
        <h1 className="text-base font-semibold text-[#171717]">
          {name || "Ijetechemmaule@gmail.com"}
        </h1>
        <p className="text-sm text-[#636363]">
          Hey! Did you finish the Hi-FI wireframes for flora app design?
        </p>
        <div className="flex text-[#8B8B8B] text-sm items-center gap-1">
          <ClockIcon className="size-3.5" />
          <p>Today</p>
          <hr className="bg-[#8B8B8B] rounded-lg border-none w-px h-4" />
          <p>05:30 PM</p>
        </div>
      </div>
      </div>

      <div className="flex items-end">
        <Badge className="bg-[#343CED] rounded-full p-1 flex items-center justify-center w-5 h-5 font-bold text-xs text-white">
          20
        </Badge>
      </div>
    </div>
  );
};

export default ChatItemComponent;
