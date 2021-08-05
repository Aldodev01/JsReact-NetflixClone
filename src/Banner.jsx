import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./Requests";
import "./Banner.css";

const Banner = () => {
  const [movie, setMoovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMoovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      ); // [..., ..., ...,]; -> object {}
      // TODO: Math.floor(Math.random() * requests.data.results.length - 1)
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner-buttons">
          <button className="banner-button">Play</button>
          <button className="banner-button">My List</button>
        </div>
        <h3 className="banner-desc">{truncate(movie?.overview, 150)}</h3>
      </div>

      <div className="banner-fade-bottom"></div>
    </header>
  );
};

export default Banner;
