// AuthProvider.js
import React, { useContext, useState } from "react";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthContext from "./auth-context";
import { GetUserData } from "@/services/api/auth";
import {
  getCurrentPlanPaystack,
  getCurrentPlanStripe,
} from "@/services/api/payment";
import useCurrency from "@/hooks/use-currency";

const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = sessionStorage.getItem("access_token") ?? null;
  const [isLogOut, setLogOut] = useState(false);

  const { currencyCode, isLoading: isCurrencyLoading } = useCurrency();

  const isAuthenticated = !!token;

  const router = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryFn: GetUserData,
    queryKey: ["user"],
    enabled: isAuthenticated,
  });

  const paymentGateway = currencyCode === "NGN" ? "paystack" : "stripe";

  const { data: activePlan, isLoading: isPlanLoading } = useQuery({
    queryFn: async () => {
      if (!user?.email) return null;
      if (paymentGateway === "paystack") {
        return getCurrentPlanPaystack(user.email);
      } else {
        return getCurrentPlanStripe(user.email);
      }
    },
    queryKey: ["current-plan", user?.email, paymentGateway],
    enabled:
      isAuthenticated && !!user?.email && !isCurrencyLoading && !isUserLoading,
    placeholderData: keepPreviousData,
  });

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
        isPlanLoading: isPlanLoading || isCurrencyLoading || isUserLoading,
        activePlan: activePlan ?? null,
        logout,
        user: user ?? null,
        isLogOut,
        setLogOut,
      },
    },
    children
  );
};

export const useAdminAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AdminAuthProvider;