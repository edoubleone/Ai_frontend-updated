import BotsIcon from "@/components/shared/bots-icon";
import Button from "@/components/shared/button";
import { Card } from "@/components/ui/card";
import { Button as IconBtn } from "@/components/ui/button";
import IntegrationsIcon from "@/components/shared/integration-icon";
import DashboardMyBots from "@/components/Features/dashboard-index/my-bots";
// import DashboardNotiifications from "@/components/Features/dashboard-index/notifications";
import { useQuery } from "@tanstack/react-query";
import { GetAssistants } from "@/services/api/conversation";
import { Link } from "react-router-dom";
import CurrentPlan from "@/components/common/dashboard/CurrentPlan";

const DashboardIndexPage = () => {
  const { data: assistants = [], isLoading } = useQuery({
    queryFn: GetAssistants,
    queryKey: ["assistants"],
  });

  const data = assistants.map((assistant) => ({
    id: assistant.id,
    botAvatar: assistant.name,
    assistantName: assistant.name,
    botType: "Text",
    assistantLanguage: "English",
    status: "Bot created",
    share_url: assistant.share_url,
  }));

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-dark">Dashboard</h1>

      <div className="flex gap-2.5 w-full no-scroll overflow-x-auto">
        <Card className="flex max-w-[318px] flex-shrink-0 w-full flex-col gap-y-4">
          <IconBtn
            className="border-[0.4px] border-[#00000033] rounded-md"
            size={"icon"}
            variant={"ghost"}
          >
            <BotsIcon width={16} height={16} />
          </IconBtn>
          <div>
            <h1 className="text-dark text-2xl font-bold">Total Assistants</h1>
            <p className="text-lg font-bold text-dark">
              {assistants?.length || 0}
            </p>
          </div>

          <Link to={`/dashboard/assistants`}>
            <Button variant="ghost" className="!text-defaultBlue !w-fit !p-0">
              View Assistants
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.9388 10.0087L5.10547 15.842"
                  stroke="#2B32C5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.0561 5.91102L12.0213 6.0051C10.3447 6.15752 9.50646 6.23372 9.30921 6.77861C9.11188 7.32349 9.70713 7.91869 10.8975 9.10909L11.8382 10.0498C13.0286 11.2402 13.6239 11.8355 14.1687 11.6381C14.7136 11.4409 14.7898 10.6026 14.9422 8.92602L15.0363 7.89122C15.128 6.88176 15.174 6.37702 14.8721 6.0752C14.5703 5.77337 14.0655 5.81926 13.0561 5.91102Z"
                  stroke="#2B32C5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </Link>
        </Card>

        <Card className="flex max-w-[318px] flex-shrink-0 w-full flex-col gap-y-4">
          <IconBtn
            className="border-[0.4px] border-[#00000033] rounded-md"
            size={"icon"}
            variant={"ghost"}
          >
            <IntegrationsIcon width={16} height={16} />
          </IconBtn>
          <div>
            <h1 className="text-dark text-2xl font-bold">Total Integrations</h1>
            <p className="text-lg font-bold text-dark">5</p>
          </div>

          <Link to={`/dashboard/integrations`}>
            <Button variant="ghost" className="!text-defaultBlue !w-fit !p-0">
              View Integrations
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.9388 10.0087L5.10547 15.842"
                  stroke="#2B32C5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.0561 5.91102L12.0213 6.0051C10.3447 6.15752 9.50646 6.23372 9.30921 6.77861C9.11188 7.32349 9.70713 7.91869 10.8975 9.10909L11.8382 10.0498C13.0286 11.2402 13.6239 11.8355 14.1687 11.6381C14.7136 11.4409 14.7898 10.6026 14.9422 8.92602L15.0363 7.89122C15.128 6.88176 15.174 6.37702 14.8721 6.0752C14.5703 5.77337 14.0655 5.81926 13.0561 5.91102Z"
                  stroke="#2B32C5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </Link>
        </Card>

        <CurrentPlan />
      </div>

      <DashboardMyBots data={data} loading={isLoading} />

      {/* <DashboardNotiifications /> */}
    </div>
  );
};

export default DashboardIndexPage;
