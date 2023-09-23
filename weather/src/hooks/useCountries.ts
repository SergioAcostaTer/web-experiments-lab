import { useEffect, useState } from "react";
import { getCountries } from "../services/country";
import { Countries } from "../types";
import {AxiosError} from "axios";

export const useCountries = (q = "spain") => {
  const [data, setData] = useState<Countries | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (q === "") {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    getCountries(q)
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [q]);

  return { data, loading, error };
};
