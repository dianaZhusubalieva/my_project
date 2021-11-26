import React, { useEffect, useState } from "react";
import "../../styles/Styles.css";
import { FiSearch } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Navbar = () => {
  const { currentUser, logout, adminEmail } = useAuth();

  const [show, handleShow] = useState(false);

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
          <a href="#">
            <FiSearch size="1.5em" />
          </a>
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

/* <div className={`nav ${show && "nav__black"}`}>
      <header>
        <div class="netflixLogo">
          <a id="logo" href="/">
            <img
              src="https://raw.githubusercontent.com/carlosavilae/Netflix-Clone/master/img/logo.PNG"
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
          <a href="#">
            <FiSearch size="1.5em" />
          </a>
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
    </div> */
