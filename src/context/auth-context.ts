import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;