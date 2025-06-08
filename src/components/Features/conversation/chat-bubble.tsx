import AvatarComponent from "@/components/shared/custom-avatar";
import type { IAssistantMessage } from "@/services/models/conversation.model";
import clsx from "clsx";
import { format } from "date-fns";
import { parseISO } from "date-fns/parseISO";

const ChatBubble: React.FC<IAssistantMessage & { responding?: boolean }> = ({
  role,
  content,
  created_at,
  responding,
}) => {
  const isUser = role === "user";
  const isBotResponding = role === "AI" && responding;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="flex gap-2">
        {!isUser && <AvatarComponent />}
        <div
          className={clsx(
            "w-full flex flex-col gap-y-2.5 max-w-72 px-4 py-3 border",
            {
              "bg-[#2E2E2E] rounded-bl-[15px] border-[#D0D0D0] rounded-t-[25px]":
                isUser,
              "bg-[#EEEEFD] rounded-b-[25px] border-[#D0D0D0] rounded-tr-[15px]":
                !isUser,
            }
          )}
        >
          {isBotResponding ? (
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
          ) : (
            <>
              <p
                className={clsx("text-base", {
                  "text-[#454545]": !isUser,
                  "text-[#F8F9FD]": isUser,
                })}
              >
                {content}
              </p>

              <p
                className={clsx("text-xs text-end ", {
                  "text-[#5C5C5C]": !isUser,
                  "text-white": isUser,
                })}
              >
                {content && format(parseISO(created_at), "hh:mma")}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
