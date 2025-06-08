import SecondaryInput from "@/components/shared/secondary-input";
import { DialogContent } from "@/components/ui/dialog";
import copy from "@/assets/icons/copy.svg";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ShareBotModal = ({ url }: { url: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <DialogContent>
      <div className="flex flex-col gap-y-6 mt-6">
        <div>
          <h1 className="text-dark font-bold text-lg">Test and Share bots</h1>
          <p className="text-base text-[#737373]">
            You can share this link with your users so they can ask your
            assistant a question
          </p>
        </div>

        <SecondaryInput
          label="Get your demonstration link"
          placeholder="Assistant Link"
          type="text"
          iconposition="right"
          icon={
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={handleCopy}
              title="Copy link"
            >
              <img src={copy} alt="copy icon" />
            </Button>
          }
          readOnly
          disabled
          value={url}
        />
      </div>
    </DialogContent>
  );
};

export default ShareBotModal;
