import axios from "axios";
import { API } from "../helpers/const";

import React, { useEffect, useReducer, useState } from "react";
import { ClientContext } from "../../../../makers/week9/final_project_askhat2/src/contexts/ClientContext";
const INIT_STATE = {
  movies: null,
  detailMovie: null,
  moviesAmountInCart: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).movies.length
    : 0,
  cart: null,
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return { ...state, movies: action.payload };

    case "GET_DETAILS":
      return { ...state, detailMovie: action.payload };

    case "ADD_AND_DELETE_MOVIE_IN_CART":
      return { ...state, moviesAmountInCart: action.payload };

    case "GET_CART":
      return { ...state, cart: action.payload };

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
      //   resetCurrentPage();
    } catch (e) {
      console.log(e);
    }
  };

  //! для страницы деталей телефона
  const getDetails = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      dispatch({
        type: "GET_DETAILS",
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        getMovies: getMovies,
        getDetails: getDetails,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientContextProvider;
