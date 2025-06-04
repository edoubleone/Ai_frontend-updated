import { useAuth } from "@/context/auth-provider";
import { LogOutUser } from "@/services/api/auth";
import type { ErrorResponse } from "@/services/config/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useLogOut() {
  const { logout } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: LogOutUser,
    onSuccess: () => {
      toast.success("Signed out successfully!");
      logout();
    },
    onError: (err: ErrorResponse) => {
      toast.error(err.response.data.detail);
    },
  });

  return {
    mutate,
    isPending,
  };
}
