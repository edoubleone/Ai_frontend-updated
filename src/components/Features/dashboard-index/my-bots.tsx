import Button from "@/components/shared/button";
import SearchInput from "@/components/shared/search-input";
import { Card } from "@/components/ui/card";
import { ArrowRight2 } from "iconsax-reactjs";

const DashboardMyBots = () => {
  return (
    <Card className="border-none w-full rounded-lg py-8 px-4 sm:px-8 lg:px-12">
      <div className="flex w-full mb-9 items-center justify-between">
        <h1 className="text-dark font-bold text-2xl">My Bots</h1>

        <Button
          wrapperclass="!w-fit"
          variant="ghost"
          className="!text-defaultBlue !p-0"
        >
          See All
          <ArrowRight2 size={24} />
        </Button>
      </div>

      <div className="flex">
        <SearchInput
          placeholder="Search Bot"
          inputClass="!border-[#D0D0D0] !border-[0.96px] !bg-[#F5F5F5]"
        />
      </div>
    </Card>
  );
};

export default DashboardMyBots;
