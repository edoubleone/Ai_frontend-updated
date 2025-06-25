import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";

type ECurrencySymbol = "₦" | "$";

const useCurrency = () => {
  const [currencySymbol, setCurrencySymbol] = useState<ECurrencySymbol>("$");
  const [currencyCode, setCurrencyCode] = useState("USD");

  const {
    data,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currency-info"],
    queryFn: async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        const countryCode = response.data.country_code;

        if (countryCode === "NG") {
          return { currencySymbol: "₦", currencyCode: "NGN" };
        } else {
          return { currencySymbol: "$", currencyCode: "USD" };
        }
      } catch (error) {
        throw error;
      }
    },
    staleTime: 1000 * 60 * 60 * 24,
  });

  useEffect(() => {
    if (data) {
      setCurrencySymbol(data.currencySymbol as ECurrencySymbol);
      setCurrencyCode(data.currencyCode);
      sessionStorage.setItem("currencyCode", data.currencyCode);
      sessionStorage.setItem("currencySymbol", data.currencySymbol);
    }
    if (isError) {
      console.error("Error fetching currency info:", error);
      setCurrencySymbol("$");
      setCurrencyCode("USD");
    }
  }, [data, isError, error]);

  return {
    currencySymbol,
    currencyCode,
    isLoading,
  };
};

export default useCurrency;