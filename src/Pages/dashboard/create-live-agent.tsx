import Button from "@/components/shared/button";
import { PhoneInput } from "@/components/shared/phone-number-input";
import SecondaryInput from "@/components/shared/secondary-input";
import { SelectInput } from "@/components/shared/secondary-select";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateLiveAgent = () => {
  const navigate = useNavigate();

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

      <Card className="h-fit flex flex-col gap-y-6">
        <h1 className="text-2xl font-bold">Create Live Agent</h1>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SecondaryInput
            label="Full Name"
            placeholder="Enter full name"
            type="text"
          />

          <SecondaryInput
            label="Display Name"
            placeholder="Enter display name"
            type="text"
          />

          <PhoneInput
            label="Phone Number"
            placeholder="00 000 000"
            defaultCountry={"US"}
          />

          <SecondaryInput
            label="Email"
            placeholder="Enter email"
            type="email"
          />

          <SelectInput
            label="Availability"
            placeholder="Select availability"
            options={[
              { label: "Active", value: "Active" },
              { label: "Busy", value: "busy" },
              { label: "Offline", value: "offline" },
            ]}
          />

          <div className="flex col-span-2 gap-x-2 justify-end flex-col md:flex-row">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              variant="outline-blue"
              wrapperclass="sm:max-w-40"
            >
              Cancel
            </Button>

            <Button type="submit" wrapperclass="sm:max-w-40">
              Create
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateLiveAgent;
