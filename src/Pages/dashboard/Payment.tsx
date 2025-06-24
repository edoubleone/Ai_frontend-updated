import AvailablePlans from "@/components/Features/Payment/AvailablePlans";
import PaymentsTableSkeletonLoader from "@/components/Features/Payment/history-skeleton-loader";
import PaymentHistory from "@/components/Features/Payment/payment-history";
import SubscriptionPlan from "@/components/Features/Payment/SubscriptionPlan";
import SearchInput from "@/components/shared/search-input";

import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/auth-provider";
import useCurrency from "@/hooks/use-currency";
import {
  getPaystackPaymentHistory,
  getStripePaymentHistory,
} from "@/services/api/payment";
import type {
  IPaystackPaymentHistory,
  IStripeHistory,
} from "@/services/models/payment.model";
import { useQuery } from "@tanstack/react-query";

import { useMemo, useState } from "react";

const tabMenu = ["My Plan", "Available Plans"];

interface PaymentHistoryItem {
  id: string;
  invoiceNo: string;
  dueDate: string;
  amount: string;
  paymentMethod: string;
  subscriptionType: string;
  createdAt: string;
  status: string;
}

const Payment = () => {
  const { user } = useAuth();
  const { currencyCode } = useCurrency();

  const [query, setQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string>(tabMenu[0]);

  const { data, isPending } = useQuery({
    queryFn: async () => {
      if (currencyCode === "NGN") {
        const response = await getPaystackPaymentHistory(user?.email ?? "");
        let invoiceNumber = 1;
        return response.map((item: IPaystackPaymentHistory) => {
          const createdAt = new Date(item.created_at);
          const dueDate = new Date(
            createdAt.getTime() + item.duration_days * 24 * 60 * 60 * 1000
          );
          const formattedDueDate = dueDate.toISOString().split("T")[0];
          invoiceNumber++;
          return {
            id: item.id,
            invoiceNo: `INV${String(invoiceNumber).padStart(3, "0")}`,
            dueDate: formattedDueDate,
            amount: `${item.currency} ${item.amount}`,
            paymentMethod: "Paystack",
            subscriptionType: item.plan_name,
            createdAt: item.created_at,
            status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
          };
        });
      } else if (currencyCode === "USD") {
        const response = await getStripePaymentHistory(user?.email ?? "");
        let invoiceNumber = 1;
        return response.map((item: IStripeHistory) => {
          const formattedDueDate = new Date(item.expires_at)
            .toISOString()
            .split("T")[0];
          invoiceNumber++;
          return {
            id: item.id,
            invoiceNo: `INV${String(invoiceNumber - 1).padStart(3, "0")}`,
            dueDate: formattedDueDate,
            amount: `${item.currency} ${item.amount}`,
            paymentMethod: "Stripe",
            subscriptionType: item.plan_name,
            createdAt: item.created_at,
            status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
          };
        });
      } else {
        return [];
      }
    },
    enabled: user?.email !== "",
    queryKey: ["payment-history", user?.email, currencyCode],
  });

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((item: PaymentHistoryItem) =>
      Object.values(item).some((value: string) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [data, query]);

  return (
    <div className="flex flex-col gap-y-5 w-full">
      <h2 className="font-bold text-2xl">Payment</h2>

      <main className="flex flex-col gap-y-6">
        <section className="py-6 px-5 md:px-6 lg:px-9 bg-background rounded-lg flex flex-col gap-y-6">
          <div className="border-b border-[#E2E8F0] flex items-center justify-between md:justify-start">
            {tabMenu.map((menu, index) => (
              <nav
                key={index}
                onClick={() => setActiveMenu(tabMenu[index])}
                className={`transition-all whitespace-nowrap duration-300 py-2 px-7 font-semibold ${
                  menu === activeMenu
                    ? "text-blue-600 border-b-[2px] border-blue-600"
                    : "hover:text-gray-400 cursor-pointer"
                }`}
              >
                {menu}
              </nav>
            ))}
          </div>

          {activeMenu === tabMenu[0] ? (
            <SubscriptionPlan onUpgrade={() => setActiveMenu(tabMenu[1])} />
          ) : (
            <AvailablePlans />
          )}
        </section>

        {activeMenu === tabMenu[0] && (
          <Card className="flex flex-col border-none gap-y-5 py-4 px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between w-full">
              <SearchInput
                onDebouncedChange={(value) => setQuery(value)}
                placeholder="Search History"
                inputClass="!border-[#D0D0D0] !border-[0.96px] !bg-[#F5F5F5]"
              />
            </div>

            {isPending ? (
              <PaymentsTableSkeletonLoader />
            ) : (
              <PaymentHistory data={filteredData} searchTerm={query} />
            )}
          </Card>
        )}
      </main>
    </div>
  );
};

export default Payment;
