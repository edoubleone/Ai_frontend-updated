import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { RegisterBotEmbed } from "@/services/api/assistant";
import SecondaryInput from "@/components/shared/secondary-input";
import Button from "@/components/shared/button";
import type { ErrorResponse } from "@/services/config/api";

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

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Business Name</DialogTitle>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
};

export default BusinessIdModal;
