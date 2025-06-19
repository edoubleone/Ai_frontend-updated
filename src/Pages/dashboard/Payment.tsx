import AvailablePlans from "@/components/Features/Payment/AvailablePlans";
import PaymentsTableSkeletonLoader from "@/components/Features/Payment/history-skeleton-loader";
import PaymentHistory from "@/components/Features/Payment/payment-history";
import SubscriptionPlan from "@/components/Features/Payment/SubscriptionPlan";
import Button from "@/components/shared/button";
import SearchInput from "@/components/shared/search-input";

import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/auth-provider";
import {
  getPaystackPaymentHistory,
  getStripePaymentHistory,
} from "@/services/api/payment";
import type {
  IPaystackPaymentHistory,
  IStripeHistory,
} from "@/services/models/payment.model";
import { useQuery } from "@tanstack/react-query";

// import { useToast } from '@/hooks/use-toast'
import { ChevronDown, Download, Funnel } from "lucide-react";
import { useState } from "react";

const tabMenu = ["My Plan", "Available Plans"];

const Payment = () => {
  const { user } = useAuth();

  const [query, setQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string>(tabMenu[0]);

  const { data, isPending } = useQuery({
    queryFn: async () => {
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
    },
    enabled: user?.email !== "",
    queryKey: ["paystack-payment-history", user?.email],
  });

  const { data: stripeData, isPending: loadingStripePayments } = useQuery({
    queryFn: async () => {
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
    },
    enabled: user?.email !== "",
    queryKey: ["stripe-payment-history", user?.email],
  });

  const combinedData = [...(stripeData || []), ...(data || [])].sort(
    (a, b) =>
      new Date(a.created_at || a.createdAt).getTime() -
      new Date(b.created_at || b.createdAt).getTime()
  );

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
            <SubscriptionPlan />
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

              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-[#334155]">Sort: </p>
                <Button
                  variant={"ghost"}
                  wrapperclass="!w-fit"
                  className="!rounded-[1.91px] !whitespace-nowrap !w-36 !text-sm !py-2 !border-[.96px] !border-[#E2E8F0]"
                >
                  Most Recent
                  <ChevronDown className="size-5" />
                </Button>
                <Button
                  wrapperclass="!w-fit"
                  variant={"ghost"}
                  className="!rounded-[1.91px] !p-2 !border-[.96px] !border-[#E2E8F0]"
                >
                  <Funnel className="size-5 text-dark" />
                </Button>

                <Button
                  wrapperclass="!w-fit"
                  variant={"ghost"}
                  className="!rounded-[1.91px] !text-sm !p-2 !border-[.96px] !border-[#E2E8F0]"
                >
                  <Download className="size-5 text-dark" />
                  Export
                </Button>
              </div>
            </div>

            {isPending || loadingStripePayments ? (
              <PaymentsTableSkeletonLoader />
            ) : (
              <PaymentHistory searchTerm={query} data={combinedData || []} />
            )}
          </Card>
        )}
      </main>
    </div>
  );
};

export default Payment;
