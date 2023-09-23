import { Link } from "react-router-dom";
import { Country as CountryType } from "../types";
import { useWeather } from "../hooks/useWeather";
import { useColapse } from "../hooks/useColapse";

export const Country = ({ country }: { country: CountryType }) => {
  const { data } = useWeather({
    latitud: country.latlng[0],
    longitud: country.latlng[1],
    gps: false,
  });
  const setColapse = useColapse(state => state.setColapse)

  return (
    <div>
      <Link
        to={`/weather/${country.name.common}`}
        className="w-full h-[150px] flex items-center  bg-white rounded-[9px] shadow-md overflow-hidden flex-col p-4"
        onClick={() => setColapse(true)}
      >
        <div className="h-[30px] w-full flex items-center gap-2">
          <img
            src={country.flags.png}
            alt="flag"
            className="h-[30px] w-[45px] square rounded-[5%]"
          />
          <h2>{country.name.common}</h2>
        </div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">
            {data?.hourly.temperature_2m[0]}
            °C
          </h2>
        </div>
      </Link>
    </div>
  );
};
