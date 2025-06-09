import type { UserData } from "@/services/models/conversation.model";
import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: string | null) => void;
  logout: () => void;
  isLogOut: boolean;
  user: UserData | null;
  setLogOut: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;