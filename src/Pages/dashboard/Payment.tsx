import AvailablePlans from "@/components/Features/Payment/AvailablePlans"
import PaymentsTableSkeletonLoader from "@/components/Features/Payment/history-skeleton-loader"
import PaymentHistory from "@/components/Features/Payment/payment-history"
import SubscriptionPlan from "@/components/Features/Payment/SubscriptionPlan"
import SearchInput from "@/components/shared/search-input"

import { Card } from "@/components/ui/card"
import { useAuth } from "@/context/auth-provider"
import useCurrency from "@/hooks/use-currency"
import { getPaystackPaymentHistory, getStripePaymentHistory } from "@/services/api/payment"
import type { IPaystackPaymentHistory, IStripeHistory } from "@/services/models/payment.model"
import { useQuery } from "@tanstack/react-query"

import { useMemo, useState } from "react"

const tabMenu = ["My Plan", "Available Plans"]

interface PaymentHistoryItem {
  id: string
  invoiceNo: string
  dueDate: string
  amount: string
  paymentMethod: string
  subscriptionType: string
  createdAt: string
  status: string
}

const Payment = () => {
  const { user } = useAuth()
  const { currencyCode } = useCurrency()

  const [query, setQuery] = useState("")
  const [activeMenu, setActiveMenu] = useState<string>(tabMenu[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { data, isPending, error } = useQuery({
    queryFn: async () => {
      if (!user?.email) return []

      try {
        if (currencyCode === "NGN") {
          const response = await getPaystackPaymentHistory(user.email)
          let invoiceNumber = 1
          return response.map((item: IPaystackPaymentHistory) => {
            const createdAt = new Date(item.created_at)
            const dueDate = new Date(createdAt.getTime() + item.duration_days * 24 * 60 * 60 * 1000)
            const formattedDueDate = dueDate.toISOString().split("T")[0]
            invoiceNumber++
            return {
              id: item.id,
              invoiceNo: `INV${String(invoiceNumber).padStart(3, "0")}`,
              dueDate: formattedDueDate,
              amount: `${item.currency} ${item.amount}`,
              paymentMethod: "Paystack",
              subscriptionType: item.plan_name,
              createdAt: item.created_at,
              status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
            }
          })
        } else if (currencyCode === "USD") {
          const response = await getStripePaymentHistory(user.email)
          let invoiceNumber = 1
          return response.map((item: IStripeHistory) => {
            const formattedDueDate = new Date(item.expires_at).toISOString().split("T")[0]
            invoiceNumber++
            return {
              id: item.id,
              invoiceNo: `INV${String(invoiceNumber - 1).padStart(3, "0")}`,
              dueDate: formattedDueDate,
              amount: `${item.currency} ${item.amount}`,
              paymentMethod: "Stripe",
              subscriptionType: item.plan_name,
              createdAt: item.created_at,
              status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
            }
          })
        } else {
          return []
        }
      } catch (error) {
        console.error("Error fetching payment history:", error)
        return []
      }
    },
    enabled: !!user?.email && !!currencyCode,
    queryKey: ["payment-history", user?.email, currencyCode],
  })

  const filteredData = useMemo(() => {
    if (!data) return []

    return data.filter((item: PaymentHistoryItem) =>
      Object.values(item).some((value: string) => String(value).toLowerCase().includes(query.toLowerCase())),
    )
  }, [data, query])

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    const end = currentPage * rowsPerPage
    return filteredData.slice(start, end)
  }, [filteredData, currentPage, rowsPerPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleRowsPerPageChange = (size: number) => {
    setRowsPerPage(size)
    setCurrentPage(1) 
  }

  useMemo(() => {
    setCurrentPage(1)
  }, [query])

  if (error) {
    return (
      <div className="flex flex-col gap-y-5 w-full">
        <h2 className="font-bold text-2xl">Payment</h2>
        <div className="flex items-center justify-center py-8">
          <p className="text-red-500">Error loading payment data. Please try again.</p>
        </div>
      </div>
    )
  }

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
                className={`transition-all whitespace-nowrap duration-300 py-2 px-7 font-semibold cursor-pointer ${
                  menu === activeMenu ? "text-blue-600 border-b-[2px] border-blue-600" : "hover:text-gray-400"
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
              <PaymentHistory
                data={paginatedData}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                totalCount={filteredData.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            )}
          </Card>
        )}
      </main>
    </div>
  )
}

export default Payment
