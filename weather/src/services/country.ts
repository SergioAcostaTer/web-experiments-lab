import axios from "axios";

const getCountries = async (q: string) => {
  const { data } = await axios.get(
    `https://restcountries.com/v3.1/name/${q}?fields=name,capital,flags,population,region,subregion,languages,latlng,area,timezones`
  );
  return data;
};

const getAllCountries = async () => {
  const { data } = await axios.get(
    `https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region,subregion,languages,latlng,area`
  );
  return data;
};

// getCountryByLatLng = async (lat: number, lng: number) => {
//     const { data } = await axios.get(

export { getCountries, getAllCountries };
