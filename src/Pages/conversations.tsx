import { ChevronLeft, SearchIcon } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";
import { GetAssistant, GetAssistantCustomers } from "@/services/api/assistant";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/shared/button";
import AvatarComponent from "@/components/shared/custom-avatar";
import { useState } from "react";
import ChatItemLoader from "@/components/Features/conversation/chat-item-skeleton";
import type { Customer } from "@/services/models/assistant";
import CustomerChatWindow from "@/components/Features/assistant-logs/customer-chat-window";

const Conversations = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const isMobile = useIsMobile();

  const [query, setQuery] = useState("");
  const [isCustomer, setCustomer] = useState<Customer | null>(null);

  const { data: assistant } = useQuery({
    queryFn: () => GetAssistant(Number(id)),
    queryKey: ["assistant", id],
  });

  const { data: customers, isLoading } = useQuery({
    queryFn: () => GetAssistantCustomers(Number(id)),
    queryKey: ["assistant-customers", id],
  });

  console.log(customers);

  const handleCustomerClick = (customer: Customer) => {
    setCustomer(customer);
    queryClient.invalidateQueries({
      queryKey: ["customer-chat-history", customer.handle],
    });
  };

  const filteredData = customers?.filter((customer) =>
    customer.handle.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setQuery(value);
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

      <div className="flex flex-col gap-y-6 h-full bg-white border py-6 rounded-lg px-4 sm:px-9">
        <div className="flex justify-between items-center w-full gap-4">
          <div className="flex gap-4">
            <AvatarComponent />
            <div className="flex flex-col gap-y-1">
              <h1 className="text-base font-semibold text-[#171717]">
                {assistant?.name}
              </h1>
              <p className="text-sm line-clamp-1 text-[#636363]">
                You currently have 4 conversations in this Assistant.
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-full gap-12 overflow-y-hidden">
          {!isCustomer || !isMobile ? (
            <div className={`w-full flex flex-col h-full`}>
              <div className="flex items-center border-b-[0.25px] border-[#AFB8CF] py-4 px-5 relative">
                <SearchIcon className="text-[#737373] mx-4 absolute size-6" />
                <input
                  onChange={(e) => handleSearch(e.target.value)}
                  value={query}
                  type="search"
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
                  filteredData?.map((customer) => (
                    <div
                      onClick={() => handleCustomerClick(customer)}
                      className={`px-4 sm:px-6 cursor-pointer py-[18px] ${
                        isCustomer?.id === customer?.id ? "bg-[#EEEEFD]" : ""
                      }`}
                      key={customer.id}
                    >
                      <div className="flex justify-between w-full gap-4">
                        <div className="flex items-center gap-4">
                          <AvatarComponent />
                          <div className="flex flex-col gap-y-1">
                            <h1 className="text-base font-semibold text-[#171717]">
                              {customer.handle}
                            </h1>

                            {/* <div className="hidden text-[#8B8B8B] text-sm items-center gap-1">
                              <ClockIcon className="size-3.5" />
                              <p>Today</p>
                              <hr className="bg-[#8B8B8B] rounded-lg border-none w-px h-4" />
                              <p>05:30 PM</p>
                            </div> */}
                          </div>
                        </div>

                        {/* <div className="hidden items-end">
                          <Badge className="bg-[#343CED] rounded-full p-1 flex items-center justify-center w-5 h-5 font-bold text-xs text-white">
                            20
                          </Badge>
                        </div> */}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : null}

          {isCustomer && assistant ? (
            <div className="w-full border-[#D0D0D0] sm:border-l-[0.25px] sm:pl-4 overflow-y-auto">
              <CustomerChatWindow
                goBack={() => setCustomer(null)}
                customer={isCustomer}
                assistant_id={assistant?.id}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Conversations;
