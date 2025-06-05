import AvatarComponent from "@/components/shared/custom-avatar";
import sendicon from "@/assets/icons/send.svg";
import copy from "@/assets/icons/copy.svg";
import DeleteBotConversationDialog from "./delete-bot-conversation-dialog";
// import DeleteBotSuccess from "./delete-bot-success";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Ellipsis, MessageSquare } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "@/components/shared/button";
import { useState } from "react";
import type {
  IAssistant,
  IAssistantMessage,
} from "@/services/models/conversation.model";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ChatBubble from "./chat-bubble";
import { toast } from "@/hooks/use-toast";
import {
  ChatWithAssistant,
  GetAssistantChatHistory,
} from "@/services/api/conversation";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft2 } from "iconsax-reactjs";
import { Button as IconButton } from "@/components/ui/button";
import { format } from "date-fns";

const ChatWindow = ({
  assistant,
  goBack,
}: {
  assistant: IAssistant;
  goBack: () => void;
}) => {
  const queryClient = useQueryClient();

  const isMobile = useIsMobile();

  const [actions, setActions] = useState<
    "delete-confirmation" | "more-actions" | "delete-success" | null
  >(null);
  const [message, setMessage] = useState("");
  const [isBotResponding, setIsBotResponding] = useState(false);

  const { data: assistantChatHistory = [] } = useQuery({
    queryFn: () => GetAssistantChatHistory(assistant?.id!),
    queryKey: ["assistant-chat-history", assistant?.id],
    enabled: assistant !== null,
  });

  const { mutate } = useMutation({
    mutationFn: ChatWithAssistant,
    onMutate: async (newMessage) => {
      setIsBotResponding(true);

      await queryClient.cancelQueries({
        queryKey: ["assistant-chat-history", assistant.id],
      });

      const previousMessages = queryClient.getQueryData([
        "assistant-chat-history",
        assistant.id,
      ]);

      queryClient.setQueryData(
        ["assistant-chat-history", assistant.id],
        (oldData: IAssistantMessage[] = []) => [
          ...oldData,
          {
            id: Date.now(),
            role: "user",
            content: newMessage.message,
            created_at: new Date().toISOString(),
          },
        ]
      );

      return { previousMessages };
    },
    onError: (err, _newMessage, context) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
      queryClient.setQueryData(
        ["assistant-chat-history", assistant.id],
        context?.previousMessages
      );
    },
    onSettled: () => {
      setIsBotResponding(false);
      queryClient.invalidateQueries({
        queryKey: ["assistant-chat-history", assistant.id],
      });
    },
  });

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    if (!message || isBotResponding) return;
    e.preventDefault();
    mutate({ assistant_id: assistant.id, message });
    setMessage("");
  };

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
              {assistant?.name}
            </h1>
            {/* <p className="text-sm text-[#454545]">Ijetechemmaule@gmail.com</p> */}
            <span className="mt-1.5 flex items-center gap-1.5 text-[#8B8B8B]">
              <MessageSquare className="size-[18px]" />
              <p className="text-xs">
                {assistantChatHistory?.length || 0} Conversations
              </p>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-x-4">
            <p className="text-[#8B8B8B] text-xs">
            {format(new Date(), "MMM dd, hh:mma")}
            </p>

          <button>
            <img src={copy} alt="copy icon" />
          </button>

          <Popover
            open={actions === "more-actions"}
            onOpenChange={(open) => setActions(open ? "more-actions" : null)}
          >
            <PopoverTrigger asChild>
              <button>
                <Ellipsis className="text-[#737373] " />
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-[180px]">
              <Button
                onClick={() => setActions("delete-confirmation")}
                className="!text-[#2E2E2E] !pl-5 !text-base !font-normal !py-2.5 !justify-start !bg-transparent"
              >
                Delete
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto sm:p-4">
        <div className="flex flex-col gap-y-4">
          {assistantChatHistory?.map((chat) => (
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
        </div>
      </div>

      <div className="py-4 sm:p-4">
        <form
          onSubmit={handleSendMessage}
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

      <AlertDialog
        open={actions === "delete-confirmation"}
        onOpenChange={(open) => setActions(open ? "delete-confirmation" : null)}
      >
        <DeleteBotConversationDialog />
      </AlertDialog>
    </div>
  );
};

export default ChatWindow;
