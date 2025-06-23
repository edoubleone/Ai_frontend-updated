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
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const {
    data,
    isError,
    isLoading: isQueryLoading,
  } = useQuery({
    queryKey: ["currency-info"],
    queryFn: async () => {
      const response = await axios.get("http://ip-api.com/json");
      const countryCode = response.data.countryCode;

      if (countryCode === "NG") {
        const exchangeRateResponse = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/USD`
        );
        const exchangeRate = exchangeRateResponse.data.rates.NGN;
        return { currencySymbol: "₦", currencyCode: "NGN", exchangeRate };
      } else {
        return { currencySymbol: "$", currencyCode: "USD", exchangeRate: 1 };
      }
    },
    staleTime: 1000 * 60 * 60 * 24,
  });

  useEffect(() => {
    if (data) {
      setCurrencySymbol(data.currencySymbol as ECurrencySymbol);
      setExchangeRate(data.exchangeRate);
      setCurrencyCode(data.currencyCode);
      sessionStorage.setItem("currencyCode", data.currencyCode);
      sessionStorage.setItem("currencySymbol", data.currencySymbol);
      setIsLoading(false);
    }
    if (isError) {
      setCurrencySymbol("$");
      setExchangeRate(1);
      setCurrencyCode("USD");
      setIsLoading(false);
    }
  }, [data, isError]);

  return {
    currencySymbol,
    exchangeRate,
    currencyCode,
    isLoading: isQueryLoading || isLoading,
  };
};

export default useCurrency;
