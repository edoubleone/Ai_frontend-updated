import UserMangementTable, {
  dummyUserManagementData,
} from "@/components/Features/admin/user-management-table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { Pie, PieChart, Cell } from "recharts";
import { CircleCheck, Clock } from "lucide-react";
import { CircleX } from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  // Remove chartConfig and ChartContainer, and type chartData
  const chartData: { name: string; value: number; fill: string }[] = [
    { name: "Successful", value: 40, fill: "#34A853" },
    { name: "Failed", value: 15, fill: "#C82332" },
    { name: "Pending", value: 10, fill: "#FEB800" },
  ];

  const totalTransactions = chartData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  // User analytics dummy data for Mon-Sun
  const userAnalyticsData = [
    { day: "Mon", active: 120, inactive: 30 },
    { day: "Tue", active: 150, inactive: 25 },
    { day: "Wed", active: 170, inactive: 20 },
    { day: "Thu", active: 140, inactive: 35 },
    { day: "Fri", active: 180, inactive: 15 },
    { day: "Sat", active: 200, inactive: 10 },
    { day: "Sun", active: 160, inactive: 20 },
  ];

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-dark">Overview</h1>

      <div className="flex gap-2.5 w-full no-scroll overflow-x-auto">
        <Card className="flex max-w-[318px] flex-shrink-0 w-full flex-col gap-y-16">
          <Badge className="w-fit bg-[#F2F4F7] px-3 py-1 shadow-none text-[#344054] rounded-2xl">
            Total Users
          </Badge>
          <p className="text-[#2E2E2E] font-semibold">2</p>
        </Card>

        <Card className="flex max-w-[318px] flex-shrink-0 w-full flex-col gap-y-16">
          <Badge className="w-fit bg-[#EEEEFD] px-3 py-1 shadow-none text-defaultBlue rounded-2xl">
            Total Payments Received
          </Badge>
          <p className="text-[#2E2E2E] font-semibold">$2000</p>
        </Card>

        <Card className="flex max-w-[318px] flex-shrink-0 w-full flex-col gap-y-16">
          <Badge className="w-fit bg-[#ED5DDE1A] px-3 py-1 shadow-none text-[#ED5DDE] rounded-2xl">
            Total Customer support
          </Badge>
          <p className="text-[#2E2E2E] font-semibold">$2000</p>
        </Card>
      </div>

      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="flex flex-col gap-y-4 flex-1">
          <div className="flex flex-wrap gap-3 items-center justify-between w-full">
            <div className="flex flex-wrap items-center gap-5">
              <h2 className="text-2xl whitespace-nowrap font-bold text-dark">
                User Analytics
              </h2>
              <DateRangePicker
                dateFormat="dd MMM, yy"
                date={{ from: new Date(), to: new Date() }}
              />
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="size-4 rounded-full bg-[#00C42B]" />
                <p className="text-sm text-deep-grey leading-default font-medium">
                  Active Users
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="size-4 rounded-full bg-[#F60C36]" />
                <p className="text-sm text-deep-grey leading-default font-medium">
                  Inactive Users
                </p>
              </div>
            </div>
          </div>

          <Card className="flex flex-col gap-y-4">
            <ResponsiveContainer width="100%" height={284}>
              <LineChart
                data={userAnalyticsData}
                margin={{ left: 4, right: 4, top: 8, bottom: 8 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="#00C42B"
                  strokeWidth={2}
                  dot={false}
                  name="Active Users"
                />
                <Line
                  type="monotone"
                  dataKey="inactive"
                  stroke="#F60C36"
                  strokeWidth={2}
                  dot={false}
                  name="Inactive Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="flex flex-col flex-1 gap-y-4">
          <h2 className="text-2xl font-bold text-dark">Manage transactions</h2>

          <Card className="flex flex-wrap items-center justify-center gap-4">
            <div className="relative aspect-square max-h-[284px] w-[284px] flex items-center justify-center">
              <PieChart width={284} height={284}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={80}
                  isAnimationActive={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-[#64748B]">Total</span>
                <span className="text-2xl font-bold text-[#334155]">
                  {totalTransactions}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-col gap-4">
              <div className="flex items-center gap-2">
                <CircleCheck className="size-5 fill-[#00C42B] text-white" />
                <p className="text-sm text-deep-grey leading-default font-medium">
                  Successful
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="size-5 fill-[#FEB800] text-white" />
                <p className="text-sm text-deep-grey leading-default font-medium">
                  Pending
                </p>
              </div>

              <div className="flex items-center gap-2">
                <CircleX className="size-5 fill-[#F60C36] text-white" />
                <p className="text-sm text-deep-grey leading-default font-medium">
                  Failed
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex gap-y-4 flex-col">
        <h2 className="text-2xl font-bold text-dark">User Management</h2>
        <UserMangementTable data={dummyUserManagementData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
