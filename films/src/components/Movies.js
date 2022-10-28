import { useState, useEffect } from "react";
import Movie from "./Movie";
import getTrendMoviesPics from "../services/getTrendMoviesPics";

const Movies = () => {
  const [mainMovies, setMainMovies] = useState([]);

  useEffect(() => {
    // if (!localStorage.trend || JSON.parse(localStorage.trend) === []) {
      getTrendMoviesPics("day").then((result) => setMainMovies(result));
    //   localStorage.trend = JSON.stringify(mainMovies);
    // }
    // if (localStorage.trend) {
    //   // console.log(localStorage.trend)
    //   setMainMovies(JSON.parse(localStorage.trend));
    // }
  }, []); //eslint-disable-line

  return (
    <div className="movie-container">
      {mainMovies?.slice(0, 50).map((e) => (
        <Movie
          key={e.image}
          rate={e.vote_average ? Math.round(e.vote_average * 100) / 100 : "?"}
          id={e.id}
          image={`https://image.tmdb.org/t/p/original${e.poster_path}`}
          alt={e.original_title}
        ></Movie>
      ))}
    </div>
  );
};

export default Movies;
