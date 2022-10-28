import { API_KEY, API_URL } from "./getTrendMoviesPics";

async function getSearchPreview(keyword) {
  const response = await fetch(
    `${API_URL}/search/movie${API_KEY}&query=${keyword}`
  );
  const res = await response.json();
  return res;
}

export default getSearchPreview;
