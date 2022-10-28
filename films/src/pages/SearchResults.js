import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Movie from "../components/Movie";

import { Button } from "@mui/material";
import getSearchPreview from "../services/getSearchPreview";

const SearchResults = () => {
  const [results, setResults] = useState([]);

  const query = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await getSearchPreview(query.query);
      // const response = await search(query.query)
      setResults(response.results);
    }
    fetchData();
  }, [query]);

  return (
    <>
      <Header></Header>
      <div className="movie-container">
        {results ? (
          results
            // .slice(0, 20)
            .map((e) => (
              <Movie
                key={e.id}
                rate={e.vote_average}
                id={e.id}
                image={`https://image.tmdb.org/t/p/original${e.poster_path}`}
                alt={e.original_title}
              ></Movie>
            ))
        ) : (
          <Button size="large" loading variant="outlined"></Button>
        )}
      </div>
    </>
  );
};

export default SearchResults;
