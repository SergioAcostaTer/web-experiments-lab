import axios from "axios";

export interface Location {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

export default async function locate(): Promise<Location> {
  try {
    const response = await axios.get<Location>("http://ip-api.com/json/");
    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch location data");
  }
}
