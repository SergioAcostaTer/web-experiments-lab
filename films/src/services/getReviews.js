import { API_KEY, API_URL } from "./getTrendMoviesPics";

async function getReviews(id) {
  const response = await fetch(`${API_URL}/movie/${id}/reviews${API_KEY}`);
  const res = await response.json();

  return res;
}

export default getReviews;
