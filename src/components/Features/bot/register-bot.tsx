import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FetchRegisteredBusinessName, RegisterBotEmbed } from "@/services/api/assistant";
import SecondaryInput from "@/components/shared/secondary-input";
import Button from "@/components/shared/button";
import type { ErrorResponse } from "@/services/config/api";
import SelectionTab from "@/components/Features/bot/create-bot/components/SelectionTab";

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

  const { data: registeredBusinessName } = useQuery({
    queryKey: ["registered-business-name", bot?.share_url],
    queryFn: () => FetchRegisteredBusinessName(bot?.share_url || ""),
    enabled: !!bot?.share_url,
  });

  console.log(registeredBusinessName);

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
              label="Business Name"
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
            {/* Placeholder for Generate Snippet tab */}
            Generate snippet functionality coming soon.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BusinessIdModal;
