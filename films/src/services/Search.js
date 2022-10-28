import { API_KEY, API_URL } from "./getTrendMoviesPics";

let actualPages = 1;

async function searchTwenty(keyword, pages) {
  const response = await fetch(
    `${API_URL}/search/movie${API_KEY}&query=${keyword}&page=${pages}`
  );
  const res = await response.json();
  return res;
}

let dataFromApi;
let dataLength = 0;
let res = [];

export default async function search(keyword) {
  res = [];

  // while (dataLength === 0 || dataLength === 20)
  for (let i = 0; i < 5; i++) 
  {
    dataFromApi = await searchTwenty(keyword, actualPages);

    console.log(keyword);
    dataLength = dataFromApi.results.length;
    // console.log(dataLength)

    res.push(...dataFromApi.results);
    // console.log(dataFromApi)
    // console.log(res)

    actualPages++;
  }
  return res;
}
