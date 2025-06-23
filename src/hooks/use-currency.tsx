import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";

type ECurrencySymbol = "₦" | "$";

const useCurrency = () => {
  const sessionCurrencySymbol =
    typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("currencySymbol")
      : "$";

  const initialCurrencySymbol: ECurrencySymbol =
    sessionCurrencySymbol === "₦" || sessionCurrencySymbol === "$"
      ? (sessionCurrencySymbol as ECurrencySymbol)
      : "$";

  const [currencySymbol, setCurrencySymbol] = useState<ECurrencySymbol>(
    initialCurrencySymbol
  );
  const [currencyCode, setCurrencyCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const {
    data,
    isError,
    isLoading: isQueryLoading,
  } = useQuery({
    queryKey: ["currency-info"],
    queryFn: async () => {
      const response = await axios.get("https://ipapi.co/json/");
      const countryCode = response.data.country_code;

      if (countryCode === "NG") {
        return { currencySymbol: "₦", currencyCode: "NGN" };
      } else {
        return { currencySymbol: "$", currencyCode: "USD" };
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
      setIsLoading(false);
    }
    if (isError) {
      setCurrencySymbol("$");
      setCurrencyCode("USD");
      setIsLoading(false);
    }
  }, [data, isError]);

  return {
    currencySymbol,
    currencyCode,
    isLoading: isQueryLoading || isLoading,
  };
};

export default useCurrency;
