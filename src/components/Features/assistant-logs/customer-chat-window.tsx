import AvatarComponent from "@/components/shared/custom-avatar";
import sendicon from "@/assets/icons/send.svg";

import { MessageSquare } from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft2 } from "iconsax-reactjs";
import { Button as IconButton } from "@/components/ui/button";
import { format } from "date-fns";
import ChatBubble from "../conversation/chat-bubble";
import type { Customer } from "@/services/models/assistant";
import {
  GetAssistantCustomerHistory,
  GetCustomerHistory,
} from "@/services/api/assistant";

const CustomerChatWindow = ({
  customer,
  assistant_id,
  goBack,
}: {
  customer: Customer;
  goBack: () => void;
  assistant_id: number;
}) => {
  //   const queryClient = useQueryClient();

  const isMobile = useIsMobile();

  const [message, setMessage] = useState("");
  const [isBotResponding, setIsBotResponding] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { data: customerHistory } = useQuery({
    queryFn: () =>
      GetAssistantCustomerHistory(
        assistant_id,
        customer.handle.trim(),
        customer.channel
      ),
    queryKey: ["customer-chat-history", customer.handle],
    enabled: customer !== null,
  });

  useEffect(() => {
    scrollToBottom();
  }, [customerHistory, isBotResponding]);

  useEffect(() => {
    setMessage("");
    setIsBotResponding(false);
  }, [customer]);

  //   const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
  //     if (!message || isBotResponding) return;
  //     e.preventDefault();
  //     mutate({ assistant_id: assistant.id, message });
  //     setMessage("");
  //   };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start flex-wrap gap-3 border-b pb-5 border-[#B1B1B133] justify-between">
        <div className="flex items-start gap-2">
          {isMobile && (
            <IconButton
              onClick={goBack}
              className="bg-[#F5F7FA] text-dark block lg:hidden p-2.5 rounded-md"
              variant={"ghost"}
              size={"icon"}
            >
              <ArrowLeft2 size={20} />
            </IconButton>
          )}

          <AvatarComponent />
          <div className="flex flex-col">
            <h1 className="text-base font-semibold text-[#2E2E2E]">
              {customer?.handle}
            </h1>
            {/* <p className="text-sm text-[#454545]">Ijetechemmaule@gmail.com</p> */}
            <span className="mt-1.5 flex items-center gap-1.5 text-[#8B8B8B]">
              <MessageSquare className="size-[18px]" />
              <p className="text-xs">
                {customerHistory?.history?.length || 0} Conversations
              </p>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          <p className="text-[#8B8B8B] text-xs">
            {format(new Date(), "MMM dd, hh:mma")}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto sm:p-4">
        <div className="flex flex-col gap-y-4">
          {customerHistory?.history?.map((chat) => (
            <ChatBubble key={chat?.id} {...chat} />
          ))}
          {isBotResponding && (
            <ChatBubble
              id={Date.now()}
              role="AI"
              content=""
              created_at={new Date().toISOString()}
              responding={true}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="py-4 sm:p-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative flex items-center"
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-5 border placeholder:text-[#2E2E2E] text-base w-full border-[#E7E7E7] bg-white rounded-lg"
            type="text"
            placeholder="Write a message.."
            name="message"
            id="message"
          />
          <button
            disabled={isBotResponding || !message.trim()}
            type="submit"
            className="absolute right-5"
          >
            <img src={sendicon} alt="sendicon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerChatWindow;
