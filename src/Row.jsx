import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // * A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    // *if [], run once when the row loads, and dont run again
    async function fetchData() {
      const requests = await axios.get(fetchUrl);
      setMovies(requests.data.results);
      // https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35
      // console.log(requests)
      return requests;
    }
    fetchData();
  }, [fetchUrl]);

  //   console.table(movies);

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      //   https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleCLick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          // https://youtu.be/XtMThy8QKqU
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-container">
        {movies.map((movie) => (
          // "/asdpksaodamiqfmim.jpg"
          <img
            key={movie.id}
            onClick={() => {
              handleCLick(movie);
            }}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`row-poster ${isLargeRow && "row-poster-large"}`}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
