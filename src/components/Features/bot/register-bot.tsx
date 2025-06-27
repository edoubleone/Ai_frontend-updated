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
import {
  GenerateEmbedKey,
  GenerateEmbedSnippet,
  RegisterBotEmbed,
} from "@/services/api/assistant";
import SecondaryInput from "@/components/shared/secondary-input";
import Button from "@/components/shared/button";

interface BusinessIdModalProps {
  open: boolean;
  onClose: () => void;
  bot: {
    id: number;
    share_url: string;
  } | null;
  userId: string;
  onEmbedReady: (embedSnippet: string) => void;
}

const BusinessIdModal = ({
  open,
  onClose,
  bot,
  userId,
  onEmbedReady,
}: BusinessIdModalProps) => {
  const [businessName, setBusinessName] = useState("");

  const registerBotMutation = useMutation({
    mutationFn: async (payload: { business_id: string; bot_url: string }) => {
      const res = await RegisterBotEmbed(payload);
      return res;
    },
  });

  const generateKeyMutation = useMutation({
    mutationFn: async (payload: {
      assistant_id: number;
      bot_url: string;
      owner_id: string;
      theme: string;
    }) => {
      const res = await GenerateEmbedKey(payload);
      return res;
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

    try {
      await registerBotMutation.mutateAsync({
        business_id: slugified,
        bot_url: bot.share_url,
      });

      const keyRes = await generateKeyMutation.mutateAsync({
        assistant_id: bot.id,
        bot_url: bot.share_url,
        owner_id: userId,
        theme: "light",
      });

      const snippetRes = await GenerateEmbedSnippet(keyRes.public_key);

      onEmbedReady(snippetRes.snippet);
      onClose();
      setBusinessName("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate embed snippet");
    }
  };

  const isLoading =
    registerBotMutation.isPending || generateKeyMutation.isPending;

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
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            Generate Embed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessIdModal;
