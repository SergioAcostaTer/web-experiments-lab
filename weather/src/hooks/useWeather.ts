import { useEffect, useState } from "react";
import { getWeather } from "../services/weather";
import { WeatherResponse } from "../types";

export const useWeather = ({ latitud, longitud, gps }: { latitud: number; longitud: number; gps: boolean }) => {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (gps) {
      navigator.geolocation.getCurrentPosition((geoPosition) => {
        setPosition([geoPosition.coords.latitude, geoPosition.coords.longitude]);
      });
    } else {
      setPosition([latitud, longitud]);
    }
  }, [gps, latitud, longitud]);

  useEffect(() => {
    if (position) {
      getWeather(position[0], position[1])
        .then((response) => {
          setData(response);
          setError(null);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [position]);

  return { data, loading, error };  
};
