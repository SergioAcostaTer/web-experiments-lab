import { useState, useEffect } from "react";
import Movie from "./Movie";
import getTrendMoviesPics from "../services/getTrendMoviesPics";
import accessMovieData from "../services/accessMovieData";

const MoviesOfProviders = ({provider}) => {
  const [moviesProviders, setMoviesProviders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getTrendMoviesPics("day")
      response.map(async (film) => (
        await accessMovieData(film.id)
        .then(film => film.homepage.includes("netflix") ? setMoviesProviders(moviesProviders => [...moviesProviders, film]) : "")
      ))
        
    }
    fetchData()
  }, []);

  console.log(provider)
  console.log(moviesProviders)

  return (
    <div className="movie-container">
      {moviesProviders.map((e) => (
        <Movie
          rate={e.vote_average}
          id={e.id}
          image={`https://image.tmdb.org/t/p/original${e.poster_path}`}
          alt={e.original_title}
        ></Movie>
      ))}
    </div>
  );
};

export default MoviesOfProviders;
