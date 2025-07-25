import AvatarComponent from "@/components/shared/custom-avatar";
import { ChevronRight } from "lucide-react";
import Button from "@/components/shared/button";
import type React from "react";
import type { IAssistant } from "@/services/models/conversation.model";
import { useNavigate } from "react-router-dom";

const LogComponent: React.FC<IAssistant> = ({ name, id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center w-full gap-4">
      <div className="flex gap-4">
        <AvatarComponent />
        <div className="flex flex-col gap-y-1">
          <h1 className="text-base font-semibold text-[#171717]">{name}</h1>
          <p className="text-sm line-clamp-1 text-[#636363]">
            You currently have 4 conversations in this Assistant.
          </p>
        </div>
      </div>

      <div className="items-end">
        <Button
          onClick={() => navigate(`/dashboard/logs/conversations/${id}`)}
          variant="outline-blue"
          className="border-none !p-0"
        >
          View Conversations
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default LogComponent;
