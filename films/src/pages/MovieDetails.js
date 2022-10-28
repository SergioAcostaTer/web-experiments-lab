import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import Footer from "../components/Footer";
import Header from "../components/Header";
import accessMovieData from "../services/accessMovieData";
import "../styles/details.css"

const MovieDetails = () => {
  const [details, setDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      await accessMovieData(id).then((data) => setDetails(data));
    }
    fetchData();
  }, []); //eslint-disable-line

  console.log(details);


  return (
    <>
      <Header></Header>
      {console.log(details)}
      <div className="global-container">
        <div className="film-container">
          <div>
            <h1 className="title">{details.title}</h1>
          </div>
          <div>
            <h2 className="subtitle">
              Original Title: {details.original_title}
            </h2>
            <ul className="date">
              <li>{details.original_title}</li>
              {/* <li>{details.tagline}</li> */}
              <li className="before">{details.release_date ? details.release_date.substring(0, 4) : ""}</li>
            </ul>
          </div>

            <div className="pictures">
              <img
                src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
                alt={details.original_title}
                className="poster pics"
              ></img>
              <img
                src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
                alt={details.original_title}
                className="backd pics"
              ></img>
            </div>
        </div>

        <ul className="extra-info">
          <li className="extra-info-genre">Genres: {details.genres ? details.genres.map(e=>(<span className="span-genre">{e.name}</span>)) : "  "}</li>
          <li className="overview">{details.overview}</li>
        </ul>

        <Comments id={id} />
        
      </div>
      <Footer/> 
    </>
  );
};

export default MovieDetails;
