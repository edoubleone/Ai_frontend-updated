import CreateTextCampaign from "@/components/Features/bot/create-campaign";
import CreateMassVoiceCampaign from "@/components/Features/bot/create-mass-voice-campaign";
import CreateVoiceCampaign from "@/components/Features/bot/create-voice-campaign";
import Button from "@/components/shared/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tabMenu = [
  "Create Text Campaign",
  "Create Voice Campaign",
  "Create Mass Voice Campaign",
];

const CreateCampaign = () => {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState(tabMenu[0]);

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

      <Card className="h-fit">
        <div className="flex w-full overflow-auto no-scroll border-b items-center gap-x-6">
          {tabMenu.map((menu, index) => (
            <nav
              key={index}
              onClick={() => setActiveMenu(tabMenu[index])}
              className={`transition-all whitespace-nowrap duration-300 py-2 lg:px-7 font-semibold ${
                menu === activeMenu
                  ? "text-defaultBlue border-b-[2px] border-defaultBlue"
                  : "hover:text-gray-400 cursor-pointer"
              }`}
            >
              {menu}
            </nav>
          ))}
        </div>

        {activeMenu === "Create Text Campaign" && <CreateTextCampaign />}
        {activeMenu === "Create Voice Campaign" && <CreateVoiceCampaign />}
        {activeMenu === "Create Mass Voice Campaign" && (
          <CreateMassVoiceCampaign />
        )}
      </Card>
    </div>
  );
};

export default CreateCampaign;
