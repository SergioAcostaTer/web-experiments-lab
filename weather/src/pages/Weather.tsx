import { useParams } from "react-router-dom";
import { useCountries } from "../hooks/useCountries";
import { Weather } from "../components/Weather";

export const Home = () => {
  const { country } = useParams();
  const { data: countries, loading, error } = useCountries(country);

  console.log(countries, loading, error?.response?.status);
  return (
    <div className="w-full h-full">
      {!loading ? (
        <>
          {error?.response?.status === 404 ? (
            <div className="w-full h-full flex items-center justify-center">
              <h1 className="text-4xl font-bold">Country not found</h1>
            </div>
          ) : (
            <>
              <Weather country={countries?.[0]} />
            </>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-4xl font-bold">Loading...</h1>
        </div>
      )}
    </div>
  );
};
