import React, { useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthContext from "./auth-context";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = sessionStorage.getItem("access_token") ?? null;
  const [isLogOut, setLogOut] = useState(false);

  const isAuthenticated = !!token;

  const router = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    sessionStorage.clear();
    queryClient.clear();
    router("/");
  };

  const setAuthenticated = (value: string | null) => {
    if (value) {
      sessionStorage.setItem("access_token", value);
    } else {
      logout();
    }
  };

  return React.createElement(
    AuthContext.Provider,
    {
      value: {
        isAuthenticated,
        setAuthenticated,
        logout,
        isLogOut,
        setLogOut,
      },
    },
    children
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
