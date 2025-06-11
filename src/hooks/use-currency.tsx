import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";

const useCurrency = () => {
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [exchangeRate, setExchangeRate] = useState(1);

  const { data, isError } = useQuery({
    queryKey: ["currency-info"],
    queryFn: async () => {
      const response = await axios.get("http://ip-api.com/json");
      const countryCode = response.data.countryCode;

      if (countryCode === "NG") {
        const exchangeRateResponse = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/USD`
        );
        const exchangeRate = exchangeRateResponse.data.rates.NGN;
        return { currencySymbol: "₦", exchangeRate };
      } else {
        return { currencySymbol: "$", exchangeRate: 1 };
      }
    },
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (data) {
      setCurrencySymbol(data.currencySymbol);
      setExchangeRate(data.exchangeRate);
    }
    if (isError) {
      setCurrencySymbol("$");
      setExchangeRate(1);
    }
  }, [data, isError]);

  return { currencySymbol, exchangeRate };
};

export default useCurrency;
