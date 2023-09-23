import { Country, WeatherResponse } from "../types";

export const GeneralInfo = ({
  weather,
  country,
}: {
  weather: WeatherResponse | null;
  country: Country | undefined;
}) => {
  console.log(weather);
  return (
    <div className="w-full flex flex-col justify-between gap-4 h-[30%]">
      <div>
        <h1 className="text-4xl font-bold m-0">{country?.capital}</h1>
        <p className="text-xl font-bold">
          Chances of rain {weather?.daily.precipitation_probability_max[0]}%
        </p>
      </div>
      <h3 className="text-4xl font-bold">
        {weather?.hourly.temperature_2m[0]}º
      </h3>
    </div>
  );
};
