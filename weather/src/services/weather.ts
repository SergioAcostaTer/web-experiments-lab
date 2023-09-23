import axios from "axios";

const getWeather = async (latitude: number, longitude: number) => {
  const { data } = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,rain,weathercode,windspeed_120m,winddirection_120m,temperature_120m,uv_index&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_probability_max`
  );
  return data;
};

export { getWeather };
