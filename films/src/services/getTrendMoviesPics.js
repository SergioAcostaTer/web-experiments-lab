export const API_URL = "https://api.themoviedb.org/3";
export const API_KEY = "?api_key=c6b78e19f7ba833c205511b80032a27c";

// export default function getTrendMoviesPics(){
//     return fetch( `${API_URL}/trending/movie/day${API_KEY}`  )
//         .then(async response => await response.json())
//         .then(data => {return data})
// }

let actualPages = 1;

async function fetchTwenty(pages, time) {
  const response = await fetch(
    `${API_URL}/trending/movie/${time}${API_KEY}&page=${pages}`
  );
  const res = await response.json();
  return res;
}

let dataFromApi;
let dataLength = 0;
let res = [];

export default async function getTrendMoviesPics(timeWindow) {
  for (let i = 0; i < 5; i++) 
  // while (dataLength == 0 || dataLength == 20)
  {
    dataFromApi = await fetchTwenty(actualPages, timeWindow);

    dataLength = dataFromApi.results.length;

    res.push(...dataFromApi.results);

    actualPages++;
  }

  return res;
}
