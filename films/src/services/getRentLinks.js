import { API_KEY, API_URL } from "./getTrendMoviesPics";

async function getRentLinks(id) {
  const response = await fetch(
    `${API_URL}/movie/${id}/watch/providers${API_KEY}`
  );
  const data = await response.json();

  return data.results.link;
}

const printLinks = async (id) => {
  const response = getRentLinks(id);
  const final = await response;
  return final;
};

export default printLinks;
