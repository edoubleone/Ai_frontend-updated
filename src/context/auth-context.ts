import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: string | null) => void;
  logout: () => void;
  isLogOut: boolean;
  setLogOut: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;