import Button from "@/components/shared/button";
import SecondaryInput from "@/components/shared/secondary-input";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

const IMapIntegrationSetup = () => {
  return (
    <DialogContent className="max-w-[870px]">
      <div className="flex flex-col gap-y-6 mt-6">
        <div>
          <h1 className="text-dark font-bold text-lg">E-mail IMAP setup</h1>
          <p className="text-base text-[#737373]">
            Set up the integration to receive emails via the IMAP protocol.
            Provide your mail server details and access credentials to enable
            message retrieval.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <SecondaryInput
            label="Email address"
            placeholder="Enter Email"
            type="email"
          />
          <SecondaryInput
            label="Password"
            placeholder="Enter password"
            type="text"
          />

          <div className="col-span-2 flex items-center gap-x-[30px]">
            <p className="text-[#737373] text-base">Enable SSL</p>
            <Switch />
          </div>
          <SecondaryInput
            label="SMTP host"
            placeholder="Enter SMTP host"
            type="text"
          />
          <SecondaryInput
            label="SMTP port"
            placeholder="Enter SMTP port"
            type="text"
          />
          <SecondaryInput
            label="IMAP host"
            placeholder="Enter IMAP host"
            type="text"
          />
          <SecondaryInput
            label="IMAP port"
            placeholder="Enter IMAP port"
            type="text"
          />
        </div>

        <DialogFooter>
          <Button wrapperclass="!max-w-[180px]">Save</Button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
};

export default IMapIntegrationSetup;
