import Button from "@/components/shared/button";
import SecondaryInput from "@/components/shared/secondary-input";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";

const EmailIntegrationSetup = () => {
  return (
    <DialogContent>
      <div className="flex flex-col gap-y-6 mt-6">
        <div>
          <h1 className="text-dark font-bold text-lg">E-mail setup</h1>
          <p className="text-base text-[#737373]">
            Set up the integration to receive messages on your email.
          </p>
        </div>

        <SecondaryInput label="E-mail" placeholder="Enter email" type="email" />
        <DialogFooter>
          <Button wrapperclass="!max-w-[180px]">Save</Button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
};

export default EmailIntegrationSetup;
