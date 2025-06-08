import ChatItemComponent from "@/components/Features/conversation/chat-item";
import ChatWindow from "@/components/Features/conversation/chat-window";
import { SearchIcon } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { IAssistant } from "@/services/models/conversation.model";
import { useState } from "react";
import { GetAssistants } from "@/services/api/conversation";
import ChatItemLoader from "@/components/Features/conversation/chat-item-skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

const Conversations = () => {
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  const [assistant, setAssistant] = useState<IAssistant | null>(null);
  const [query, setQuery] = useState("");

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

  const filteredData = assistants.filter((assistant) =>
    assistant.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  return (
    <div className="flex flex-col h-screen gap-5">
      <h1 className="text-2xl font-bold text-dark">Conversations</h1>

      <div className="flex h-full gap-12 py-6 bg-white border rounded-lg px-4 sm:px-9 overflow-y-hidden">
        {!assistant || !isMobile ? (
          <div
            className={`${
              assistant ? "w-full max-w-96" : "w-full"
            } flex flex-col h-full`}
          >
            <div className="flex items-center border-b-[0.25px] border-[#AFB8CF] py-4 px-5 relative">
              <SearchIcon className="text-[#737373] mx-4 absolute size-6" />
              <input
                type="search"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="py-[11.5px] pl-12 outline-none focus:outline-none pr-4 w-full"
                placeholder="Search or start a new chat"
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div className="px-4 py-[18px] sm:px-6" key={i}>
                    <ChatItemLoader />
                  </div>
                ))
              ) : filteredData && filteredData?.length === 0 ? (
                <div className="text-center h-full flex items-center justify-center text-[#737373]">
                  No conversations found
                </div>
              ) : (
                filteredData?.map((assistantItem) => (
                  <div
                    onClick={() => handleAssistantClick(assistantItem)}
                    className={`px-4 sm:px-6 cursor-pointer py-[18px] ${
                      assistant?.id === assistantItem?.id ? "bg-[#EEEEFD]" : ""
                    }`}
                    key={assistantItem?.id}
                  >
                    <ChatItemComponent {...assistantItem} />
                  </div>
                ))
              )}
            </div>
          </div>
        ) : null}

        {assistant ? (
          <div className="w-full border-[#D0D0D0] sm:border-l-[0.25px] sm:pl-4 overflow-y-auto">
            <ChatWindow
              goBack={() => setAssistant(null)}
              assistant={assistant}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Conversations;
