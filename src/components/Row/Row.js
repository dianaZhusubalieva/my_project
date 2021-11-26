import React, { useState, useEffect } from "react";

import "./Row.css";
// import YouTube from "react-youtube";
import { adminContext } from "../../contexts/AdminContext";

function Row({ isLargeRow }) {
  const { getMovies, movies } = React.useContext(adminContext);
  React.useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);

  return (
    <div className="row">
      <h2></h2>
      <div className="row__posters">
        {movies ? (
          movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={movie.image}
              alt={movie.name}
            />
          ))
        ) : (
          <h2>loading...</h2>
        )}
      </div>
    </div>
  );
}

export default Row;
