import Button from "@/components/shared/button";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import SecondaryInput from "@/components/shared/secondary-input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Danger } from "iconsax-reactjs";

const TelegramSetup = () => {
  return (
    <DialogContent>
      <div className="flex flex-col gap-y-6 mt-6">
        <div>
          <h1 className="text-dark font-bold text-lg">Telegram setup</h1>
          <p className="text-base text-[#737373]">
            Set up the integration to receive messages and send notifications
            via Telegram. Provide your bot token to connect with the platform.
          </p>
        </div>

        <Alert className="bg-[#EEEEFD] space-x-5">
          <Danger size="20" color="#C82332" />

          <AlertDescription className="text-[#454545] text-base">
            <b>PREREQUISITES</b>: To create a new bot, open a chat with <a className="underline" href="">@BotFather</a>,
            then send the command /newbot. The BotFather will ask you for a name
            and a username for your bot (the username must end with "bot"), and
            once completed, it will provide a unique token to access your bot.
          </AlertDescription>
        </Alert>

        <SecondaryInput label="Your Bot token" placeholder="Your Bot token" />

        <DialogFooter>
          <Button wrapperclass="!max-w-[180px]">Save</Button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
};

export default TelegramSetup;
