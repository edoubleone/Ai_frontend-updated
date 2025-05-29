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
import axios from "axios";
import { BASE_URL, token } from "@/Pages/conversations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ChatBubble from "./chat-bubble";
import { toast } from "@/hooks/use-toast";

function ChatWithAssistant({
  message,
  assistant_id,
}: {
  message: string;
  assistant_id: number;
}) {
  return axios.post(
    `${BASE_URL}/assistants/${assistant_id}/chat`,
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

async function getAssistantChatHistory(
  assistant_id: number
): Promise<IAssistantMessage[]> {
  const response = await axios.get<IAssistantMessage[]>(
    `${BASE_URL}/assistants/${assistant_id}/history`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

const ChatWindow = ({ assistant }: { assistant: IAssistant }) => {
  const queryClient = useQueryClient();

  const [actions, setActions] = useState<
    "delete-confirmation" | "more-actions" | "delete-success" | null
  >(null);
  const [message, setMessage] = useState("");

  const { data: assistantChatHistory = [] } = useQuery({
    queryFn: () => getAssistantChatHistory(assistant?.id!),
    queryKey: ["assistant-chat-history", assistant?.id],
    enabled: assistant !== null,
  });

  const { mutate } = useMutation({
    mutationFn: ChatWithAssistant,
    onMutate: async (newMessage) => {
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
      queryClient.invalidateQueries({
        queryKey: ["assistant-chat-history", assistant.id],
      });
    },
  });

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ assistant_id: assistant.id, message });
    setMessage("")
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start flex-wrap gap-3 border-b pb-5 border-[#B1B1B133] justify-between">
        <div className="flex gap-2">
          <AvatarComponent fallback="SK" />
          <div className="flex flex-col">
            <h1 className="text-base font-semibold text-[#2E2E2E]">
              Product Inquiry
            </h1>
            <p className="text-sm text-[#454545]">Ijetechemmaule@gmail.com</p>
            <span className="mt-1.5 flex items-center gap-1.5 text-[#8B8B8B]">
              <MessageSquare className="size-[18px]" />
              <p className="text-xs">{assistantChatHistory?.length || 0} Conversations</p>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          <p className="text-[#8B8B8B] text-xs">May 08, 2:34 PM</p>

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

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-y-4">
          {assistantChatHistory?.map((chat) => (
            <ChatBubble key={chat?.id} {...chat} />
          ))}
        </div>
      </div>

      <div className="p-4">
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
          <button type="submit" className="absolute right-5">
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
