import { Card } from "@/components/ui/card";
import sendicon from "@/assets/icons/send.svg";
import AvatarComponent from "@/components/shared/custom-avatar";
import { ChevronLeft, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChatAsCustomer,
  GetAssistant,
  GetCustomerHistory,
} from "@/services/api/assistant";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/auth-provider";
import type {
  CustomerHistory,
  IAssistantMessage,
} from "@/services/models/conversation.model";
import ChatBubble from "@/components/Features/conversation/chat-bubble";
import Button from "@/components/shared/button";

const TestCustomerAssistant = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const navigate = useNavigate();

  const { data: assistantData } = useQuery({
    queryKey: ["assistant", id],
    queryFn: () => GetAssistant(Number(id)),
  });

  const { data: historyData } = useQuery({
    queryKey: ["customerHistory", id, user?.full_name || "Guest"],
    queryFn: () =>
      GetCustomerHistory(Number(id), "web", user?.full_name || "Guest"),
  });

  const [message, setMessage] = useState("");
  const [isBotResponding, setIsBotResponding] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<
    IAssistantMessage[]
  >(historyData?.history || []);

  useEffect(() => {
    if (historyData) {
      setConversationHistory(historyData.history);
    }
  }, [historyData]);

  const queryClient = useQueryClient();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (newMessage: string) =>
      ChatAsCustomer(Number(id), "web", user?.full_name || "Guest", newMessage),
    onMutate: async (newMessage) => {
      setIsBotResponding(true);

      await queryClient.cancelQueries({
        queryKey: ["customerHistory", id, user?.full_name || "Guest"],
      });

      const previousHistory = queryClient.getQueryData([
        "customerHistory",
        id,
        user?.full_name || "Guest",
      ]);

      queryClient.setQueryData(
        ["customerHistory", id, user?.full_name || "Guest"],
        (oldData: any) => ({
          ...oldData,
          history: [
            ...(oldData?.history || []),
            {
              id: Date.now(),
              role: "user",
              content: newMessage,
              created_at: new Date().toISOString(),
              origin: "outbound",
            },
          ],
        })
      );

      setConversationHistory((prevHistory) => [
        ...prevHistory,
        {
          id: Date.now(),
          role: "user",
          content: newMessage,
          created_at: new Date().toISOString(),
          origin: "outbound",
        },
      ]);

      return { previousHistory: previousHistory as CustomerHistory };
    },

    onError: (_err, _newMessage, context) => {
      if (context && context.previousHistory) {
        queryClient.setQueryData(
          ["customerHistory", id, user?.full_name || "Guest"],
          context?.previousHistory
        );
        setConversationHistory(context?.previousHistory?.history || []);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["customerHistory", id, user?.full_name || "Guest"],
        data
      );
      setConversationHistory(data.history);
    },
    onSettled: () => {
      setIsBotResponding(false);
      scrollToBottom();
    },
  });

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory, isBotResponding]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    if (!message || isPending) return;

    e.preventDefault();
    mutate(message);
    setMessage("");
  };

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

      <Card className="overflow-y-hidden  h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-start flex-wrap gap-3 border-b pb-5 border-[#B1B1B133] justify-between">
            <div className="flex items-start gap-2">
              <AvatarComponent />
              <div className="flex flex-col">
                <h1 className="text-base font-semibold text-[#2E2E2E]">
                  {assistantData?.name}
                </h1>
                <span className="mt-1.5 flex items-center gap-1.5 text-[#8B8B8B]">
                  <MessageSquare className="size-[18px]" />
                  <p className="text-xs">Conversations</p>
                </span>
              </div>
            </div>

            <p className="text-[#8B8B8B] text-xs">
              {format(new Date(), "MMM dd, hh:mma")}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto sm:p-4">
            <div className="flex flex-col gap-y-4">
              {conversationHistory?.map((chat) => (
                <ChatBubble key={chat?.id} {...chat} />
              ))}
              {isBotResponding && (
                <ChatBubble
                  id={Date.now()}
                  role="assistant"
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
                disabled={isPending || !message.trim()}
                type="submit"
                className="absolute right-5"
              >
                <img src={sendicon} alt="sendicon" />
              </button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TestCustomerAssistant;
