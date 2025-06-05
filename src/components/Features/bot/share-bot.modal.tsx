import SecondaryInput from "@/components/shared/secondary-input";
import { DialogContent } from "@/components/ui/dialog";

const ShareBotModal = ({ url }: { url: string }) => {
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
          value={url}
        />
      </div>
    </DialogContent>
  );
};

export default ShareBotModal;
