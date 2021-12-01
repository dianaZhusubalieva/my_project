import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClientContext } from "../../contexts/ClientContext";
import { useNavigate } from "react-router";
import MyPagination from "../Pagination/Pagination";
import { Button } from "react-bootstrap";

import "./AllMovies.css";
import MovieCard from "../MovieCard/MovieCard";

const AllMoviesComp = () => {
  const { getMovies, movies, currentPosts } = React.useContext(ClientContext);
  const navigate = useNavigate();
  // console.log(movies);

  const [categoryValue, setCategoryValue] = useState("");

  let object = new URLSearchParams(window.location.search);

  function filterMovies(key, value) {
    object.set(key, value);
    let newUrl = `${window.location.pathname}?${object.toString()}`;
    navigate(newUrl);
    getMovies();

    setCategoryValue(value);
  }

  // !баг не стягивает (object.get("category"))
  useEffect(() => {
    setCategoryValue(object.get("category"));
  }, [object]);

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="topAll">
      {/* filter buttons */}
      <div
        className="mainFilter"
        name="radio-buttons-group"
        onChange={() => getMovies()}
      >
        <label
          class="rad-label"
          value="pop"
          onClick={() => navigate("/movies?category=pop2")}
        >
          <input type="radio" class="rad-input" name="rad" />
          <div class="rad-design"></div>
          <div class="rad-text">Popular</div>
        </label>

        <label
          class="rad-label"
          value="originals"
          onClick={() => navigate("/movies?category=originals2")}
        >
          <input type="radio" class="rad-input" name="rad" />
          <div class="rad-design"></div>
          <div class="rad-text">Trending now</div>
        </label>

        <label
          class="rad-label"
          onClick={() => navigate("/movies?category=exciting")}
        >
          <input type="radio" class="rad-input" name="rad" />
          <div class="rad-design"></div>
          <div class="rad-text">Exciting TV Shows</div>
        </label>

        <label
          class="rad-label"
          onClick={() => navigate("/movies?category=fam")}
        >
          <input type="radio" class="rad-input" name="rad" />
          <div class="rad-design"></div>
          <div class="rad-text">TV Family&kids</div>
        </label>
      </div>
      {/* end of filter buttons */}

      <Link to="/order">
        <div className="buyAcc">
          <Button variant="dark">buy netflix account</Button>
        </div>
      </Link>

      {movies ? (
        <>
          <body className="bodyAllMovies">
            <div className="hero-container">
              {currentPosts.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </body>

          <div>
            <MyPagination />
          </div>
        </>
      ) : (
        <h2>loading...</h2>
      )}
    </div>
  );
};

export default AllMoviesComp;
