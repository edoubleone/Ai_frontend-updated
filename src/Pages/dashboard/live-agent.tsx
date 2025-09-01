import LiveAgentsTable, {
  dummyLiveAgentsData,
} from "@/components/Features/live-agent-table";
import { GetAssistants } from "@/services/api/myassistance";
import { useQuery } from "@tanstack/react-query";
import SearchInput from "@/components/shared/search-input";
import { Card } from "@/components/ui/card";

const LiveAgentPage = () => {
  const {
    data: assistantsData = [],
    isLoading,
    error,
  } = useQuery({
    queryFn: GetAssistants,
    queryKey: ["assistants"],
    retry: 1,
    retryDelay: 1000,
  });
  console.log(assistantsData, "assistantsData");
  console.log(isLoading, "isLoading");
  console.log(error, "error");

  // Use dummy data if there's an error or no data
  const displayData =
    error || assistantsData.length === 0 ? dummyLiveAgentsData : assistantsData;
  return (
    <div className="flex flex-col gap-y-5 w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Live Agent</h2>
        {error && (
          <div className="text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded">
            Using demo data (API error)
          </div>
        )}
        {!error && assistantsData.length === 0 && !isLoading && (
          <div className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded">
            Using demo data (no API data)
          </div>
        )}
        {!error && assistantsData.length > 0 && (
          <div className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded">
            Live data ({assistantsData.length} assistants)
          </div>
        )}
      </div>

      {/* <Card className="flex flex-col gap-y-10">
        <div className="flex items-center justify-between gap-4">
          <p>Analytics</p>

          <Link to={`/dashboard/live-agent/create-live-agent`}>
            <Button wrapperclass="!w-fit">
              <PlusIcon className="size-5" /> Add Live Agent
            </Button>
          </Link>
        </div>

        <div className="flex gap-2.5 w-full no-scroll overflow-x-auto">
          <Card className="flex bg-[#EEEEFD] max-w-[318px] flex-shrink-0 w-full flex-col gap-y-4">
            <span className="size-7 flex text-white rounded-md items-center justify-center bg-defaultBlue">
              <AdminUserIcon />
            </span>

            <p className="text-2xl font-bold">Agents Logs</p>

            <p className="text-xl font-bold">
              {isLoading ? "..." : displayData.length}
            </p>
          </Card>
          <Card className="flex bg-[#EEEEFD] max-w-[318px] flex-shrink-0 w-full flex-col gap-y-4">
            <span className="size-7 flex text-white rounded-md items-center justify-center bg-defaultBlue">
              <AdminUserIcon />
            </span>

            <p className="text-2xl font-bold">Active </p>

            <p className="text-xl font-bold">
              {isLoading
                ? "..."
                : displayData.filter(
                    (agent) => agent.availability === "Available"
                  ).length}
            </p>
          </Card>
          <Card className="flex bg-[#EEEEFD] max-w-[318px] flex-shrink-0 w-full flex-col gap-y-4">
            <span className="size-7 flex text-white rounded-md items-center justify-center bg-defaultBlue">
              <AdminUserIcon />
            </span>

            <p className="text-2xl font-bold">Offline </p>

            <p className="text-xl font-bold">
              {isLoading
                ? "..."
                : displayData.filter(
                    (agent) => agent.availability === "Offline"
                  ).length}
            </p>
          </Card>
          <Card className="flex bg-[#EEEEFD] max-w-[318px] flex-shrink-0 w-full flex-col gap-y-4">
            <span className="size-7 flex text-white rounded-md items-center justify-center bg-defaultBlue">
              <AdminUserIcon />
            </span>

            <p className="text-2xl font-bold">Busy</p>

            <p className="text-xl font-bold">
              {isLoading
                ? "..."
                : displayData.filter((agent) => agent.availability === "Busy")
                    .length}
            </p>
          </Card>
          <Card className="flex bg-[#EEEEFD] max-w-[318px] flex-shrink-0 w-full flex-col gap-y-4">
            <span className="size-7 flex text-white rounded-md items-center justify-center bg-defaultBlue">
              <AdminUserIcon />
            </span>

            <p className="text-2xl font-bold">Industries</p>

            <p className="text-xl font-bold">
              {isLoading
                ? "..."
                : new Set(displayData.map((agent) => agent.industry)).size}
            </p>
          </Card>
        </div>
      </Card> */}

      <Card className="flex flex-col gap-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between w-full">
          <SearchInput
            placeholder="Search"
            inputClass="!border-[#D0D0D0] !border-[0.96px] !bg-[#F5F5F5]"
          />

          <div className="flex flex-wrap items-center gap-2"></div>
        </div>

        <LiveAgentsTable
          data={displayData}
          isLoading={isLoading}
          error={error}
        />
      </Card>
    </div>
  );
};

export default LiveAgentPage;
