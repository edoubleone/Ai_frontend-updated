import Button from "@/components/shared/button";
import SecondaryInput from "@/components/shared/secondary-input";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";

const VoiceConnectionIntegrationSetup = () => {
  return (
    <DialogContent>
      <div className="flex flex-col gap-y-6 mt-6">
        <div>
          <h1 className="text-dark font-bold text-lg">
            Voice connection setup
          </h1>
          <p className="text-base text-[#737373]">
            Set up the integration to handle voice calls via SIP telephony.
            Provide the necessary connection parameters to enable calling
            features through your SIP provider.
          </p>
        </div>

        <SecondaryInput
          label="Login / User name"
          placeholder="Username"
          type="text"
        />
        <SecondaryInput
          label="Password"
          placeholder="Enter password"
          type="text"
        />
        <SecondaryInput
          label="Authorization user name"
          placeholder="Enter event name"
          type="text"
        />

        <SecondaryInput
          label="Domain / Registrar"
          placeholder="Enter domain"
          type="text"
        />
        <DialogFooter>
          <Button wrapperclass="!max-w-[180px]">Save</Button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
};

export default VoiceConnectionIntegrationSetup;
