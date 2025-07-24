import { ChevronLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GetAssistant } from "@/services/api/assistant";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/shared/button";
import AvatarComponent from "@/components/shared/custom-avatar";
import AssistantCallHistory, {
  dummyCallHistoryData,
} from "@/components/Features/call-history/assistant-call-history";

const AssistantCallHistoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: assistant } = useQuery({
    queryFn: () => GetAssistant(Number(id)),
    queryKey: ["assistant", id],
  });

  return (
    <div className="flex flex-col h-screen gap-5">
      <Button
        variant="ghost"
        wrapperclass="w-fit"
        onClick={() => navigate(-1)}
        className="!px-0 bg-transparent !w-fit"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </Button>

      <div className="flex flex-col gap-y-6 h-full bg-white border py-6 rounded-lg px-4 sm:px-9">
        <div className="flex justify-between items-center w-full gap-4">
          <div className="flex gap-4">
            <AvatarComponent />
            <div className="flex flex-col gap-y-1">
              <h1 className="text-base font-semibold text-[#171717]">
                {assistant?.name}
              </h1>
              <p className="text-sm line-clamp-1 text-[#636363]">
                You currently have 10 call History in this Assistant.
              </p>
            </div>
          </div>
        </div>

        <AssistantCallHistory data={dummyCallHistoryData} />
      </div>
    </div>
  );
};

export default AssistantCallHistoryPage;
