import questionmark from "@/assets/icons/question-mark.svg";
import {
    AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DeleteBotConversationDialog = () => {
  return (
    <AlertDialogContent>
      <img src={questionmark} alt="Question Mark" />
      <AlertDialogHeader className="mt-5">
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          You are about to delete this conversation.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter className="flex w-full mt-11 gap-7">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteBotConversationDialog;
