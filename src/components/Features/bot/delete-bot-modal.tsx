import questionmark from "@/assets/icons/question-mark.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteAssistant } from "@/services/api/assistant";
import { toast } from "sonner";
import Button from "@/components/shared/button";

interface DeleteBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  assistant: {
    id: number;
    botAvatar: string;
    assistantName: string;
    botType: string;
    assistantLanguage: string;
    status: string;
    share_url: string;
    share_whatsapp_url: string;
    industry: string;
    created_at: string;
    updated_at: string;
  };
}

export function DeleteBotModal({
  isOpen,
  onClose,
  assistant,
}: DeleteBotModalProps) {

const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: DeleteAssistant,
    onSuccess: () => {
      toast.success("Assistant deleted successfully");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["assistants"] });
    },
    onError: () => {
      toast.error("Failed to delete assistant");
    },
  });

  const handleConfirm = () => {
    mutate(assistant.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <img src={questionmark} alt="Question Mark" className="mb-4" width={60} height={60} />
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Are you sure?
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            You are about to delete <b>"{assistant?.assistantName}"</b>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          <Button
            disabled={isPending}
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            loading={isPending}
            onClick={handleConfirm}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
