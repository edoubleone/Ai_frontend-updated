import Button from "@/components/shared/button";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Danger } from "iconsax-reactjs";

const XSetup = () => {
  return (
    <DialogContent>
      <div className="flex flex-col gap-y-6 mt-6">
        <div>
          <h1 className="text-dark font-bold text-lg">X setup</h1>
          <p className="text-base text-[#737373]">
            Set up the integration to send and receive messages via X. Specify
            the access parameters provided by your X API provider.
          </p>
        </div>

        <Alert className="bg-[#EEEEFD] space-x-5">
          <Danger size="20" color="#C82332" />

          <AlertDescription className="text-[#454545] text-base">
            <b>PREREQUISITES</b>: <br />
            <ul className="list-disc">
              <li>You have a phone number compatible with WhatsApp.</li>
              <li>
                Your company already has a verified Meta Business Portfolio
                (formerly Meta Business Manager).
              </li>
              <li>
                Check if someone in your company has already created a Meta
                Business Portfolio (usually handled by the marketing department)
              </li>
              <li>
                If a Meta Business Portfolio already exists, ask a user with
                access to invite you as an administrator with full permissions
                so you can create WhatsApp Business Accounts (WABA).
              </li>
            </ul>
          </AlertDescription>
        </Alert>

        <DialogFooter>
          <Button wrapperclass="!max-w-[180px]">Continue with X</Button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
};

export default XSetup;
