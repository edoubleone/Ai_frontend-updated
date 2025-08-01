import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { ChevronDown, Funnel } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "@/components/shared/button";
import { useState } from "react";
<<<<<<< HEAD
import AdminPaymentTable, { dummyPaymentData } from "@/components/Features/admin/payment-table";
=======
import AdminPaymentTable, {
  dummyPaymentData,
} from "@/components/Features/admin/payment-table";
import useCurrency from "@/hooks/use-currency";
import { useQuery } from "@tanstack/react-query";
import {
  getPaystackAmountSummary,
  getPaystackAnalytics,
  getStripeAmountSummary,
  getStripeAnalytics,
} from "@/services/api/admin";
>>>>>>> 7238fe858bdec0217b5e1717b0910d6bb1d26189

const AdminPayments = () => {
  const [sortOption, setSortOption] = useState({
    field: "most-recent",
    direction: "asc",
  });

  const { currencyCode } = useCurrency();
  const { data: paystackAnalytics } = useQuery({
    queryKey: ["payment-paystack-analytics"],
    queryFn: () => getPaystackAnalytics(),
    enabled: currencyCode === "NGN",
  });

  const { data: stripeAnalytics } = useQuery({
    queryKey: ["payment-stripe-analytics"],
    queryFn: () => getStripeAnalytics(),
    enabled: currencyCode === "USD",
  });

  const { data: paystackAmountSummary } = useQuery({
    queryFn: getPaystackAmountSummary,
    queryKey: ["paystack-amount-summary"],
    enabled: currencyCode === "NGN",
  });

  const { data: stripeAmountSummary } = useQuery({
    queryFn: getStripeAmountSummary,
    queryKey: ["stripe-amount-summary"],
    enabled: currencyCode === "USD",
  });

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-dark">Overview</h1>

      <div className="flex gap-2.5 w-full no-scroll overflow-x-auto">
        <Card className="flex max-w-[318px] flex-shrink-0 w-full flex-col gap-y-16">
          <Badge className="w-fit bg-[#EEEEFD] px-3 py-1 shadow-none text-defaultBlue rounded-2xl">
            Total Payments Received
          </Badge>
          <p className="text-[#2E2E2E] font-semibold">
            {Intl.NumberFormat(currencyCode === "USD" ? "en-US" : "en-NG", {
              style: "currency",
              currency: currencyCode,
            }).format(
              currencyCode === "USD"
                ? stripeAnalytics?.data?.total_revenue || 0
                : paystackAnalytics?.data?.total_revenue || 0
            )}
          </p>
        </Card>

        <Card className="flex max-w-[318px] flex-shrink-0 w-full flex-col gap-y-16">
          <Badge className="w-fit bg-[#34A8531A] px-3 py-1 shadow-none text-[#34A853] rounded-2xl">
            Total Successful Transactions
          </Badge>
          <p className="text-[#2E2E2E] font-semibold">
            {Intl.NumberFormat(currencyCode === "USD" ? "en-US" : "en-NG", {
              style: "currency",
              currency: currencyCode,
            }).format(
              currencyCode === "USD"
                ? stripeAmountSummary?.data?.amount_summary?.USD
                    ?.amount_successful
                : paystackAmountSummary?.data?.amount_summary?.NGN
                    ?.amount_successful || 0
            )}
          </p>
        </Card>

        <Card className="flex max-w-[318px] flex-shrink-0 w-full flex-col gap-y-16">
          <Badge className="w-fit bg-[#FEF9E9] px-3 py-1 shadow-none text-[#E8A800] rounded-2xl">
            Total Pending Transactions
          </Badge>
          <p className="text-[#2E2E2E] font-semibold">
            {Intl.NumberFormat(currencyCode === "USD" ? "en-US" : "en-NG", {
              style: "currency",
              currency: currencyCode,
            }).format(
              currencyCode === "USD"
                ? stripeAmountSummary?.data?.amount_summary?.USD?.amount_pending
                : paystackAmountSummary?.data?.amount_summary?.NGN
                    ?.amount_pending || 0
            )}
          </p>
        </Card>

        <Card className="flex max-w-[318px] flex-shrink-0 w-full flex-col gap-y-16">
          <Badge className="w-fit bg-[#FBEAEA] px-3 py-1 shadow-none text-[#C82332] rounded-2xl">
            Total Failed Transactions
          </Badge>
          <p className="text-[#2E2E2E] font-semibold">
            {Intl.NumberFormat(currencyCode === "USD" ? "en-US" : "en-NG", {
              style: "currency",
              currency: currencyCode,
            }).format(
              currencyCode === "USD"
                ? stripeAmountSummary?.data?.amount_summary?.USD?.amount_failed
                : paystackAmountSummary?.data?.amount_summary?.NGN
                    ?.amount_failed || 0
            )}
          </p>
        </Card>
      </div>

      <div className="flex gap-y-4 flex-col">
        <div className="flex items-center gap-2 justify-between w-full flex-wrap">
          <h2 className="text-2xl font-bold text-dark">Payments</h2>

          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-[#334155]">Sort: </p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"ghost"}
                  wrapperclass="!w-fit"
                  className="!rounded-[1.91px] !whitespace-nowrap !w-36 !text-sm !py-2 !border-[.96px] !border-[#E2E8F0]"
                >
                  most recent
                  <ChevronDown className="size-5" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-1 !max-w-56">
                <div className="flex flex-col gap-2">
                  {sortOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant="ghost"
                      className="!text-left hover:bg-gray-100 !font-medium !w-full !justify-start"
                      onClick={() =>
                        setSortOption((prev) => ({
                          field: option.value,
                          direction:
                            prev.field === option.value &&
                            prev.direction === "asc"
                              ? "desc"
                              : "asc",
                        }))
                      }
                    >
                      {option.label}{" "}
                      {sortOption.field === option.value &&
                        (sortOption.direction === "asc" ? "↑" : "↓")}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Button
              wrapperclass="!w-fit"
              variant={"ghost"}
              className="!rounded-[1.91px] !hidden !p-2 !border-[.96px] !border-[#E2E8F0]"
            >
              <Funnel className="size-5 text-dark" />
            </Button>
          </div>
        </div>

        <AdminPaymentTable data={dummyPaymentData} />
      </div>
    </div>
  );
};

export default AdminPayments;

const sortOptions = [
  { label: "All Users", value: "all-users" },
  { label: "Most Recent", value: "most-recent" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Deleted", value: "deleted" },
];
