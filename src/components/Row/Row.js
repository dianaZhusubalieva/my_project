import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import "./Row.css";
// import YouTube from "react-youtube";
import { adminContext } from "../../contexts/AdminContext";
import { Link } from "react-router-dom";

function Row({ isLargeRow, title }) {
  const { getMovies, movies } = React.useContext(adminContext);
  React.useEffect(() => {
    getMovies();
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {movies ? (
            movies.map((movie) =>
              movie.category === "originals" ? (
                // <Link to={`/detail/${movie.id}`} style={{ width: "100%" }}>
                <img
                  key={movie.id}
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={movie.image}
                  alt={movie.name}
                  onClick={() => {
                    navigate(`/detail/${movie.id}`);
                  }}
                />
              ) : (
                <div></div>
              )
            )
          ) : (
            <h2>loading...</h2>
          )}
        </div>
      </div>

      {/* <div className="row">
        <h2>Trending now</h2>
        <div className="row__posters">
          {movies ? (
            movies.map((movie) =>
              movie.category === "horror" ? (
                <img
                  key={movie.id}
                  className={`row__poster ${"row__posterLarge"}`}
                  src={movie.image}
                  alt={movie.name}
                />
              ) : (
                <div></div>
              )
            )
          ) : (
            <h2>loading...</h2>
          )}
        </div>
      </div> */}
    </>
  );
}

export default Row;
