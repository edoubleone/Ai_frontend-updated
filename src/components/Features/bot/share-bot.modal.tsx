import SecondaryInput from "@/components/shared/secondary-input";
import { DialogContent } from "@/components/ui/dialog";
import copy from "@/assets/icons/copy.svg";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import QRCode from "react-qr-code";

const ShareBotModal = ({
  url,
  whatsapp_url,
}: {
  url: string;
  whatsapp_url: string;
}) => {
  const handleCopyUrl = () => {
    if (url) {
      navigator.clipboard.writeText(url);
      toast.success("Assistant link copied to clipboard!");
    }
  };

  const handleCopyWhatsappUrl = () => {
    if (whatsapp_url) {
      navigator.clipboard.writeText(whatsapp_url);
      toast.success("WhatsApp link copied to clipboard!");
    }
  };

  return (
    <DialogContent className="max-h-[95%] overflow-y-auto">
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
              onClick={handleCopyUrl}
              title="Copy link"
            >
              <img src={copy} alt="copy icon" />
            </Button>
          }
          readOnly
          disabled
          value={url}
        />

        {whatsapp_url && (
          <>
            <SecondaryInput
              label="Get your WhatsApp demonstration link"
              placeholder="Assistant WhatsApp Link"
              type="text"
              iconposition="right"
              icon={
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={handleCopyWhatsappUrl}
                  title="Copy link"
                >
                  <img src={copy} alt="copy icon" />
                </Button>
              }
              readOnly
              disabled
              value={whatsapp_url}
            />
            <div className="flex flex-col items-center gap-2 mt-2">
              <span className="text-sm text-gray-600">Scan to open WhatsApp link</span>
              <QRCode value={whatsapp_url} size={200} />
            </div>
          </>
        )}
      </div>
    </DialogContent>
  );
};

export default ShareBotModal;
