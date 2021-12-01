import React, { useEffect, useState } from "react";
import "../../styles/Styles.css";
import { FiSearch } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import bookmark from "../../images/bookmark.png";
import { ClientContext } from "../../contexts/ClientContext";
import Favorites from "../FavModal/FavModal";
import logout1 from "../../images/log-out.png";
import admin from "../../images/admin.png";
import account from "../../images/profile.png";
import burger from "../../images/options.png";

const Navbar = () => {
  const { currentUser, logout, adminEmail } = useAuth();
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();
  const { getMovies, productsCountInFavorites, getFavorite } =
    React.useContext(ClientContext);

  // ! favorites
  // const [open, setOpen] = React.useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  //adaptive navbar

  const [open, setOpen] = useState(false);

  //  filter
  let object = new URLSearchParams(window.location.search);
  function filterMovies(key, value) {
    object.set(key, value);
    let newUrl = `${window.location.pathname}?${object.toString()}`;
    console.log(newUrl);
    navigate(newUrl);
    getMovies();
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  return (
    <>
      <div className={`nav ${show && "nav__black"}`}>
        <header className="navbar-header">
          <div className="netflixLogo">
            <a id="logo" href="/">
              <img
                width="100px"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
                alt="Logo "
              />
            </a>
          </div>
          <nav className="main-nav">
            <a href="#home">Home</a>
            <a href="#tvShows">TV Shows</a>
            <a href="/movies">Movies</a>
            <a href="#originals">Originals</a>
            <a href="#">Recently Added</a>
            <a target="_blank" href="https://codepen.io/cb2307/full/NzaOrm">
              Portfolio
            </a>

            <div className="input-box">
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  filterMovies("q", e.target.value);
                }}
              />
              <FiSearch className="sr" size="20" />
            </div>
          </nav>
          <nav className="sub-nav">
            {/* search */}

            {currentUser ? (
              <>
                <div className="usersEmail">
                  <p style={{ fontSize: "15px" }} className="text3">
                    {currentUser.email}
                  </p>
                </div>
                <img
                  width="25px"
                  style={{ cursor: "pointer" }}
                  src={logout1}
                  alt=""
                  onClick={logout}
                />
              </>
            ) : (
              <Link to="/register">
                <img width="25px" src={account} alt="" />
              </Link>
            )}
          </nav>
          {currentUser ? (
            currentUser.email === adminEmail ? (
              <Link to="/admin">
                <img
                  className="adminIcon"
                  width="25px"
                  src={admin}
                  alt="admin icon"
                />
              </Link>
            ) : null
          ) : null}

          <img
            className="bookmarkI"
            style={{ cursor: "pointer" }}
            width="25px"
            src={bookmark}
            alt=""
            onClick={() => {
              handleShow1();
              getFavorite();
            }}
          />
        </header>
        <Favorites
          show1={show1}
          handleClose1={handleClose1}
          handleShow1={handleShow1}
        />

        {/* toggle navbar */}

        <div className="burger-btn">
          <button onClick={() => setOpen(!open)}>
            <img width="40px" src={burger} alt="burger icon" />
          </button>
        </div>
      </div>

      {open ? (
        <div className={`nav ${show && "nav__black"}`}>
          <header className="navbar-header2">
            <div className="netflixLogo">
              <a id="logo" href="/">
                <img
                  width="50px"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
                  alt="Logo "
                />
              </a>
            </div>
            <nav className="main-nav2">
              <a href="#home">Home</a>
              <a href="#tvShows">TV Shows</a>
              <a href="#movies">Movies</a>
              <a href="#originals">Originals</a>
              <a href="#">Recently Added</a>
              <a target="_blank" href="https://codepen.io/cb2307/full/NzaOrm">
                Portfolio
              </a>

              <div className="input-box2">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    filterMovies("q", e.target.value);
                  }}
                />
                <FiSearch className="sr" size="20" />
              </div>
            </nav>
          </header>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
