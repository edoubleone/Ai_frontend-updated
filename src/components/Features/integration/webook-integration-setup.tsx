import Button from "@/components/shared/button";
import SecondaryInput from "@/components/shared/secondary-input";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";

const WebHookIntegrationSetup = () => {
  return (
    <DialogContent>
      <div className="flex flex-col gap-y-6 mt-6">
        <div>
          <h1 className="text-dark font-bold text-lg">Webhook Setup</h1>
          <p className="text-base text-[#737373]">
            Specify the request URL for an external API you want to be able to
            invoke from dialog nodes. Bot will call this URL when configured to
            do so from a dialog node.
          </p>
        </div>

        <SecondaryInput
          label="Webhook URL"
          placeholder="Webhook URL"
          type="text"
        />

        <div>
          <h1 className="text-dark font-bold text-lg">Event name</h1>
          <p className="text-base text-[#737373]">
            This event is triggered when a lead is fully collected and ready for
            submission. It contains all relevant information regarding the lead,
            including personal details, contact information, and any additional
            data that was collected through the lead capture process.
          </p>
        </div>

        <SecondaryInput
          label="Event name"
          placeholder="Enter event name"
          type="text"
        />
        <DialogFooter>
          <Button wrapperclass="!max-w-[180px]">Save</Button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
};

export default WebHookIntegrationSetup;
