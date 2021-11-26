import React, { useEffect, useState } from "react";
import "../../styles/Styles.css";
import { FiSearch } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ClientContext } from "../../contexts/ClientContext";

const Navbar = () => {
  const { currentUser, logout, adminEmail } = useAuth();
  const [show, handleShow] = useState(false);

  const navigate = useNavigate();
  const { getMovies } = React.useContext(ClientContext);

  //  filter
  let object = new URLSearchParams(window.location.search);
  function filterMovies(key, value) {
    object.set(key, value);
    let newUrl = `${window.location.pathname}?${object.toString()}`;
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
    <div className={`nav ${show && "nav__black"}`}>
      <header className="navbar-header">
        <div class="netflixLogo">
          <a id="logo" href="/">
            <img
              width="100px"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
              alt="Logo "
            />
          </a>
        </div>
        <nav class="main-nav">
          <a href="#home">Home</a>
          <a href="#tvShows">TV Shows</a>
          <a href="#movies">Movies</a>
          <a href="#originals">Originals</a>
          <a href="#">Recently Added</a>
          <a target="_blank" href="https://codepen.io/cb2307/full/NzaOrm">
            Portfolio
          </a>
        </nav>
        <nav class="sub-nav">
          {/* search */}
          <div class="input-box">
            <input
              type="text"
              class="form-control"
              onChange={(e) => {
                filterMovies("q", e.target.value);
              }}
            />
            <FiSearch className="sr" size="20" />
          </div>

          <a href="#">
            <FaCaretDown />
          </a>

          {currentUser ? (
            <>
              <p style={{ fontSize: "15px" }} className="text3">
                {currentUser.email}
              </p>
              <Button variant="danger" onClick={logout}>
                logout
              </Button>
            </>
          ) : (
            <Link to="/register">
              <Button variant="danger">sign up</Button>
            </Link>
          )}

          {currentUser ? (
            currentUser.email === adminEmail ? (
              <Link to="/admin">
                <Button variant="primary">Admin</Button>
              </Link>
            ) : null
          ) : null}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
