import { WeatherResponse } from "../types";

export const Forecast = ({ data }: { data: WeatherResponse | null }) => {
  const weather = data?.daily.time.map((item, index) => {
    return {
      time: item,
      minTemp: data?.daily.apparent_temperature_min[index],
      maxTemp: data?.daily.apparent_temperature_max[index],
    };
  });

  return (
    <div className="w-full flex flex-col justify-between gap-4 h-[31%] bg-white rounded-[9px] shadow-md p-4">
      <ul className="w-full h-full flex items-center justify-between">
        {weather?.slice(0,5)?.map((item) => {

          const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

          return (
            <li key={item.time} className="flex flex-col items-center">
              <h3 className="text-lg font-bold">
                {new Date(item.time).getDate() === new Date().getDate()
                  ? "Today"
                  : days[new Date(item.time).getDay()]}
              </h3>

              <i className="bi bi-cloud-sun text-[50px]"></i>

              <div className="flex items-center gap-2">
                <p>
                  {item.minTemp}/{item.maxTemp}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
