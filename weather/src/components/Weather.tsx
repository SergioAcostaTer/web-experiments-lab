import { useWeather } from "../hooks/useWeather";
import { Country } from "../types";
// import { Chart } from "./Chart";
import { Forecast } from "./Forecast";
import { GeneralInfo } from "./GeneralInfo";

export const Weather = ({ country }: { country: Country | undefined }) => {
  const { data, loading } = useWeather({
    latitud: country?.latlng[0] || 0,
    longitud: country?.latlng[1] || 0,
    gps: false,
  });

  console.log(country, data);

  return (
    <div>
      <header className="w-full h-[60px] bg-white border-y-2 border-gray-200">
        <div className="flex items-center w-full h-full px-4 gap-2">
          <img
            src={country?.flags.png}
            alt={country?.name.common}
            className="w-[30px] h-[20px] rounded-[5%]"
          />
          <h2>{country?.name.common}</h2>
        </div>
      </header>

      <div className="w-full grid gap-4 p-4 box-border h-[calc(100vh-65px-60px)] grid-cols-[60%,40%] grid-rows-[auto]">
        {!loading ? (
          <>
            <div>
              <GeneralInfo weather={data} country={country} />
              <Forecast data={data} />
            </div>
            {/* <Chart
              title="Temperatura"
              data={data?.hourly.temperature_2m}
              time={data?.hourly.time}
              unit="°C"
            /> */}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-4xl font-bold">Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
};
