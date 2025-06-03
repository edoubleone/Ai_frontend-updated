import ChatItemComponent from "@/components/Features/conversation/chat-item";
import ChatWindow from "@/components/Features/conversation/chat-window";
import { SearchIcon } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { IAssistant } from "@/services/models/conversation.model";
import { useState } from "react";
import { GetAssistants } from "@/services/api/conversation";
import ChatItemLoader from "@/components/Features/conversation/chat-item-skeleton";

const Conversations = () => {
  const queryClient = useQueryClient();

  const [assistant, setAssistant] = useState<IAssistant | null>(null);

  const { data: assistants = [], isLoading } = useQuery({
    queryFn: GetAssistants,
    queryKey: ["assistants"],
  });

  const handleAssistantClick = (assistant: IAssistant) => {
    setAssistant(assistant);
    queryClient.invalidateQueries({
      queryKey: ["assistant-chat-history", assistant.id],
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-dark">Conversations</h1>

      <div className="flex h-full gap-12 py-6 bg-white border rounded-lg px-9">
        <div
          className={`${
            assistant ? "w-full max-w-96" : "w-full"
          } flex flex-col h-full`}
        >
          <div className="flex items-center border-b-[0.25px] border-[#AFB8CF] py-4 px-5 relative">
            <SearchIcon className="text-[#737373] mx-4 absolute size-6" />
            <input
              type="search"
              className="py-[11.5px] pl-12 outline-none focus:outline-none pr-4 w-full"
              placeholder="Search or start a new chat"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div className="p-6" key={i}>
                    <ChatItemLoader />
                  </div>
                ))
              : assistants &&
                assistants?.map((assistantItem) => (
                  <div
                    onClick={() => handleAssistantClick(assistantItem)}
                    className={`px-6 cursor-pointer py-[18px] ${
                      assistant?.id === assistantItem?.id ? "bg-[#EEEEFD]" : ""
                    }`}
                    key={assistantItem?.id}
                  >
                    <ChatItemComponent {...assistantItem} />
                  </div>
                ))}
          </div>
        </div>

        {assistant ? (
          <div className="w-full border-[#D0D0D0] border-l-[0.25px] pl-4">
            <ChatWindow assistant={assistant} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Conversations;
