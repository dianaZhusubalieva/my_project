import React from "react";
import "./style.css";
import Data from "./data";
import Card from "./card";
import { Button } from "react-bootstrap";

import Carousel from "react-elastic-carousel";
import { adminContext } from "../../contexts/AdminContext";
import { Link } from "react-router-dom";
import next from "../../images/next.png";

const breakPoints = [
  { width: 1, itemsToShow: 5, pagination: false },
  { width: 0, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  { width: 0, itemsToShow: 3, pagination: false },
  { width: 0, itemsToShow: 5, pagination: false },
];

function Pop() {
  const { getMovies, movies } = React.useContext(adminContext);

  React.useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      {/* <div>
        <h3 className="pop_nf_h3">Popular on Netflix</h3>
      </div>
      <div className="pop_main">
        <Carousel breakPoints={breakPoints} pagination="false">
          {originals ? (
            movies.map((movie) =>
              movie.category === "originals2" ? (
                <>
                  <Card imgs={movie.image} key={movie.id} link={""} />
                </>
              ) : (
                <div></div>
              )
            )
          ) : (
            <h2>loading...</h2>
          )}
        </Carousel>
      </div> */}

      <div>
        <h3 className="pop_nf_h3">Popular on Netflix</h3>
      </div>
      <div className="pop_main">
        <Carousel breakPoints={breakPoints} pagination="false">
          {movies ? (
            movies.map((movie) =>
              // movie.category === "originals2" ? (
              //   <>
              //     <Card imgs={movie.image} key={movie.id} link={""} />
              //   </>
              // ) : (
              //   <div></div>
              // )
              {
                if (movie.category === "originals2") {
                  return <Card imgs={movie.image} key={movie.id} link={""} />;
                }
              }
            )
          ) : (
            <h2>loading...</h2>
          )}
        </Carousel>
      </div>

      <div>
        <h3 className="pop_nf_h3">Trending Now</h3>
      </div>
      <div className="pop_main">
        <Carousel breakPoints={breakPoints} pagination="false">
          {movies ? (
            movies.map((movie) => {
              if (movie.category === "pop") {
                return <Card imgs={movie.image} key={movie.id} link={""} />;
              }
            })
          ) : (
            <h2>loading...</h2>
          )}
        </Carousel>
      </div>

      <div>
        <h3 className="pop_nf_h3">TV Family&Kids</h3>
      </div>
      <div className="pop_main">
        <Carousel breakPoints={breakPoints} pagination="false">
          {movies ? (
            movies.map((movie) => {
              if (movie.category === "fam") {
                return <Card imgs={movie.image} key={movie.id} link={""} />;
              }
            })
          ) : (
            <h2>loading...</h2>
          )}
        </Carousel>
      </div>

      <div className="moviesBtn">
        <Link to="/movies">
          <Button variant="danger">
            See all movies <img width="21px" src={next} alt="" />{" "}
          </Button>
        </Link>
      </div>
    </>
  );
}

export default Pop;
