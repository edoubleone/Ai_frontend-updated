import ChatItemComponent from "@/components/Features/conversation/chat-item";
import ChatWindow from "@/components/Features/conversation/chat-window";
import { SearchIcon } from "lucide-react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { IAssistant } from "@/services/models/conversation.model";
import { useState } from "react";

export const BASE_URL = "https://web-production-51907.up.railway.app";

export const token = "";

async function getAssistants(): Promise<IAssistant[]> {
  const response = await axios.get<IAssistant[]>(`${BASE_URL}/assistants/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

const Conversations = () => {
  const queryClient = useQueryClient();

  const [assistant, setAssistant] = useState<IAssistant | null>(null);

  const { data: assistants = [] } = useQuery({
    queryFn: getAssistants,
    queryKey: ["assistants"],
  });

  const handleAssistantClick = (assistant: IAssistant) => {
    setAssistant(assistant);
    queryClient.invalidateQueries({
      queryKey: ["assistant-chat-history", assistant.id],
    });
  };

  return (
    <div className="bg-[#E7E7E7] flex flex-col gap-5 px-[50px] py-6 h-screen">
      <h1 className="text-dark text-2xl font-bold">Conversations</h1>

      <div className="flex rounded-lg gap-12 border py-6 px-9 bg-white h-full">
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

          <div className="overflow-y-auto flex-1">
            {assistants &&
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
