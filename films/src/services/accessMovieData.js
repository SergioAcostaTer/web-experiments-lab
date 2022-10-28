import { API_KEY, API_URL } from "./getTrendMoviesPics";

async function accessMovieData(id) {
  const response = await fetch(`${API_URL}/movie/${id}${API_KEY}`);
  const res = await response.json();

  return res;
}

export default accessMovieData;
