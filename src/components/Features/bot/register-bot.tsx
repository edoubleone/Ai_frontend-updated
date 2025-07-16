import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import copy from "@/assets/icons/copy-outline-white.svg";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  FetchRegisteredBusinessName,
  GetEmbedPage,
  RegisterBotEmbed,
} from "@/services/api/assistant";
import SecondaryInput from "@/components/shared/secondary-input";
import Button from "@/components/shared/button";
import type { ErrorResponse } from "@/services/config/api";
import SelectionTab from "@/components/Features/bot/create-bot/components/SelectionTab";
import { SelectInput } from "@/components/shared/secondary-select";
import { Loader } from "lucide-react";

interface BusinessIdModalProps {
  open: boolean;
  onClose: () => void;
  bot: {
    id: number;
    share_url: string;
  } | null;
}

const BusinessIdModal = ({ open, onClose, bot }: BusinessIdModalProps) => {
  const [businessName, setBusinessName] = useState("");

  const {
    data: registeredBusinessName,
    isLoading: isRegisteredBusinessNameLoading,
  } = useQuery({
    queryKey: ["registered-business-name", bot?.share_url],
    queryFn: () => FetchRegisteredBusinessName(bot?.share_url || ""),
    enabled: !!bot?.share_url,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["embed", businessName],
    queryFn: () => GetEmbedPage(businessName),
    enabled: !!businessName,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: { business_id: string; bot_url: string }) => {
      const res = await RegisterBotEmbed(payload);
      return res;
    },
    onSuccess: () => {
      onClose();
      toast.success("Embed for assistant registered successfully");
    },
    onError: (error: ErrorResponse) => {
      toast.error(error?.response?.data?.detail || "Failed to register embed");
    },
  });

  const handleSubmit = async () => {
    const trimmed = businessName.trim();
    if (!trimmed) {
      toast.error("Business name is required");
      return;
    }

    const slugified = trimmed
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    if (!bot) return;

    mutate({
      business_id: slugified,
      bot_url: bot.share_url,
    });
  };

  const tabOptions = ["Register", "Generate Snippet"];
  const [selectedTab, setSelectedTab] = useState(tabOptions[0]);

  useEffect(() => {
    if (open) {
      setBusinessName("");
      setSelectedTab(tabOptions[0]);
    }
  }, [open]);

  useEffect(() => {
    if (selectedTab) {
      setBusinessName("");
    }
  }, [selectedTab]);

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[668px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assistant Embed</DialogTitle>
        </DialogHeader>

        <SelectionTab option={tabOptions} setSelectedOption={setSelectedTab} />

        {selectedTab === "Register" ? (
          <>
            <SecondaryInput
              label="Widget Name"
              placeholder="e.g. Shad Clothing Store"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} loading={isPending}>
                Register Assistant Embed
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-8 text-center text-gray-500">
            {isRegisteredBusinessNameLoading ? (
              <Loader className="mx-auto text-defaultBlue size-5 animate-spin" />
            ) : (
              <>
                <SelectInput
                  label="Assistant Widget"
                  placeholder="Select widget to generate snippet"
                  value={businessName}
                  onChange={(value) => {
                    setBusinessName(value);
                  }}
                  options={registeredBusinessName?.businesses.map(
                    (business) => ({
                      label: business.business_id,
                      value: business.business_id,
                    })
                  )}
                />

                <div className="pt-5">
                  {isLoading ? (
                    <Loader className="mx-auto text-defaultBlue size-5 animate-spin" />
                  ) : (
                    data && (
                      <div className="bg-[#EEEEFD] flex rounded-2xl divide-y flex-col w-full">
                        <pre className="mx-5 text-xs h-64 overflow-y-auto w-fit text-dark my-2.5 whitespace-pre-wrap break-all">
                          <code>
                            {`
${data}
`}
                          </code>
                        </pre>

                        <Button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(data);
                            toast.success("Embed code copied to clipboard");
                          }}
                          wrapperclass="justify-end py-2.5 px-5"
                          className="!bg-dark !w-fit"
                        >
                          Copy
                          <img src={copy} alt="copy icon" />
                        </Button>
                      </div>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BusinessIdModal;
