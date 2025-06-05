import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/context/auth-provider";
import useLogOut from "@/hooks/useLogOut";

const LogOutDialog = () => {
  const { mutate } = useLogOut();
  const { isLogOut, setLogOut } = useAuth();

  return (
    <AlertDialog open={isLogOut} onOpenChange={setLogOut}>
      <AlertDialogContent className="flex flex-col items-center">
        <svg
          width="81"
          height="80"
          viewBox="0 0 81 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40.5 7.5C34.0721 7.5 27.7886 9.40609 22.444 12.9772C17.0994 16.5484 12.9338 21.6242 10.4739 27.5628C8.01408 33.5014 7.37047 40.0361 8.62449 46.3404C9.87851 52.6448 12.9738 58.4358 17.519 62.981C22.0643 67.5262 27.8552 70.6215 34.1596 71.8755C40.464 73.1295 46.9986 72.4859 52.9372 70.0261C58.8758 67.5662 63.9516 63.4006 67.5228 58.056C71.0939 52.7114 73 46.4279 73 40C72.9909 31.3833 69.5639 23.122 63.4709 17.0291C57.378 10.9361 49.1168 7.5091 40.5 7.5ZM40.5 60C39.7583 60 39.0333 59.7801 38.4166 59.368C37.7999 58.956 37.3193 58.3703 37.0355 57.6851C36.7516 56.9998 36.6774 56.2458 36.8221 55.5184C36.9668 54.791 37.3239 54.1228 37.8484 53.5984C38.3728 53.0739 39.041 52.7168 39.7684 52.5721C40.4959 52.4274 41.2499 52.5016 41.9351 52.7855C42.6203 53.0693 43.206 53.5499 43.618 54.1666C44.0301 54.7833 44.25 55.5083 44.25 56.25C44.25 57.2446 43.8549 58.1984 43.1517 58.9016C42.4484 59.6049 41.4946 60 40.5 60ZM43 44.775V45C43 45.663 42.7366 46.2989 42.2678 46.7678C41.7989 47.2366 41.1631 47.5 40.5 47.5C39.837 47.5 39.2011 47.2366 38.7322 46.7678C38.2634 46.2989 38 45.663 38 45V42.5C38 41.837 38.2634 41.2011 38.7322 40.7322C39.2011 40.2634 39.837 40 40.5 40C44.6344 40 48 37.1875 48 33.75C48 30.3125 44.6344 27.5 40.5 27.5C36.3656 27.5 33 30.3125 33 33.75V35C33 35.663 32.7366 36.2989 32.2678 36.7678C31.7989 37.2366 31.1631 37.5 30.5 37.5C29.837 37.5 29.2011 37.2366 28.7322 36.7678C28.2634 36.2989 28 35.663 28 35V33.75C28 27.5469 33.6063 22.5 40.5 22.5C47.3938 22.5 53 27.5469 53 33.75C53 39.1812 48.7 43.7281 43 44.775Z"
            fill="#C82332"
          />
        </svg>

        <AlertDialogHeader className="mt-5">
          <AlertDialogTitle className="text-dark font-bold max-w-72 w-full text-center">
            Are you sure you want to logout?
          </AlertDialogTitle>
          <AlertDialogDescription className="hidden">
            You are about to logout.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex w-full mt-11 gap-7">
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate()}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogOutDialog;
