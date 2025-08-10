import type { UserData } from "@/services/models/conversation.model";
import type { ISubscriptionPlan } from "@/services/models/payment.model";
import { createContext } from "react";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: string | null) => void;
  logout: () => void;
  isLogOut: boolean;
  user: UserData | null;
  setLogOut: (value: boolean) => void;
  activePlan: ISubscriptionPlan | null
  isPlanLoading: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export default AdminAuthContext;