import { AxiosError } from "axios";
import { getAllCountries } from "../services/country";
import { useEffect, useState } from "react";
import { Countries as C } from "../types";
import { Country } from "../components/Country";

const useAllCountries = () => {
  const [countries, setCountries] = useState<C>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    getAllCountries()
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { countries, loading, error };
};

export const Countries = () => {
  const { countries, loading } = useAllCountries();

  return (
    <div className="grid gap-4 overflow-y-auto h-full w-full grid-cols-[repeat(auto-fill,minmax(220px,1fr))] p-4">
      {!loading ? (
        [...countries].slice(0,20).map((country) => (
          <Country key={country.name.common} country={country} />
        ))
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-4xl font-bold">Loading...</h1>
        </div>
      )}
    </div>
  );
};
