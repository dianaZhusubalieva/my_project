import React from "react";
import { Link } from "react-router-dom";
import love from "../../images/heart.png";
import { Button } from "react-bootstrap";
import { ClientContext } from "../../contexts/ClientContext";

const MovieCard = ({ movie }) => {
  const { addAndDeleteProductInFavorites, checkFavoriteInFavorites } =
    React.useContext(ClientContext);

  return (
    <div className="main-container">
      <Link to={`/detail/${movie.id}`}>
        <div className="poster-container">
          <a href="#">
            <img src={movie.image} className="poster" alt="" />
          </a>
        </div>
      </Link>

      <div className="ticket-container">
        <div className="ticket__content">
          <h4 className="ticket__movie-title">{movie.name}</h4>

          <p className="ticket__movie-slogan">
            {movie.description.split("").slice(0, 50).join("")}
          </p>

          <div className="card-btns">
            <Button
              variant={
                checkFavoriteInFavorites(movie.id) ? "danger" : "inherit"
              }
              onClick={() => addAndDeleteProductInFavorites(movie)}
            >
              <img width="25px" src={love} alt="like icon" />
            </Button>
            <a href={movie.link}>
              <Button
                variant="outline-danger"
                style={{
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              >
                Watch now
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
