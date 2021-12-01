import axios from "axios";
import { API } from "../helpers/const";

import React, { useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";
export const ClientContext = React.createContext();

const INIT_STATE = {
  movies: null,
  detailMovie: null,
  productsCountInFavorites: JSON.parse(localStorage.getItem("favorite"))
    ? JSON.parse(localStorage.getItem("favorite")).favorites.length
    : 0,
  favorites: null,
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return { ...state, movies: action.payload };

    case "GET_DETAILS":
      return { ...state, detailMovie: action.payload };

    case "ADD_AND_DELETE_FAVORITES":
      return { ...state, productsCountInFavorites: action.payload };
    case "GET_FAVORITES":
      return { ...state, favorites: action.payload };

    default:
      return state;
  }
};

const ClientContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  //! READ
  const getMovies = async () => {
    try {
      let filter = window.location.search;

      const response = await axios(`${API}${filter}`);

      dispatch({
        type: "GET_MOVIES",
        payload: response.data,
      });
      resetCurrentPage();
    } catch (e) {
      console.log(e);
    }
  };

  //! для страницы деталей
  const getDetails = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      dispatch({
        type: "GET_DETAILS",
        payload: response.data,
      });
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  //! пагинация
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  useEffect(() => {
    if (state.movies) {
      const data1 = state.movies;
      setPosts(data1);
    }
  }, [state.movies]);

  const numberOfLastPost = currentPage * postsPerPage;
  const numberOfFirstPost = numberOfLastPost - postsPerPage;
  const currentPosts = posts.slice(numberOfFirstPost, numberOfLastPost);
  const totalPosts = posts.length;

  const handlePage = (newPage) => {
    setCurrentPage(newPage);
  };
  function resetCurrentPage() {
    setCurrentPage(1);
  }

  //! корзина

  const addAndDeleteProductInFavorites = (item) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        favorites: [],
      };
    }
    let favProduct = {
      item: item,
    };
    let checkArr = favorite.favorites.filter((elem) => {
      return elem.item.id === item.id;
    });
    if (checkArr.length === 0) {
      favorite.favorites.push(favProduct);
    } else {
      favorite.favorites = favorite.favorites.filter((elem) => {
        return elem.item.id !== item.id;
      });
    }
    localStorage.setItem("favorite", JSON.stringify(favorite));
    dispatch({
      type: "ADD_AND_DELETE_FAVORITES",
      payload: favorite.favorites.length,
    });
  };
  const checkFavoriteInFavorites = (id) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        favorites: [],
      };
    }
    let checkArr = favorite.favorites.filter((elem) => {
      return elem.item.id === id;
    });
    if (checkArr.length === 0) {
      return false;
    } else {
      return true;
    }
  };
  const getFavorite = () => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    dispatch({
      type: "GET_FAVORITES",
      payload: favorite,
    });
  };

  return (
    <ClientContext.Provider
      value={{
        getMovies: getMovies,
        getDetails: getDetails,
        handlePage: handlePage,
        addAndDeleteProductInFavorites: addAndDeleteProductInFavorites,
        checkFavoriteInFavorites: checkFavoriteInFavorites,
        getFavorite: getFavorite,

        detailMovie: state.detailMovie,
        movies: state.movies,

        totalPosts: totalPosts,
        currentPosts: currentPosts,
        postsPerPage: postsPerPage,
        currentPage: currentPage,
        productsCountInFavorites: state.productsCountInFavorites,
        favorites: state.favorites,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientContextProvider;
