import type { UserData } from "@/services/models/conversation.model";
import type { ISubscriptionPlan } from "@/services/models/payment.model";
import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: string | null) => void;
  logout: () => void;
  isLogOut: boolean;
  user: UserData | null;
  setLogOut: (value: boolean) => void;
  activePlan: ISubscriptionPlan | null
  isPlanLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;