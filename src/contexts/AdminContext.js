import axios from "axios";
import React, { createContext, useReducer } from "react";
import { API } from "../helpers/const";

export const adminContext = React.createContext();

const INIT_STATE = {
  movies: null,
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return { ...state, movies: action.payload };

    default:
      return state;
  }
};

const AdminContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  //! READ

  const getMovies = async () => {
    try {
      const response = await axios(API);
      let action = {
        type: "GET_MOVIES",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };

  //!CREATE

  const addMovie = async (movie) => {
    try {
      const response = await axios.post(API, movie);
      getMovies();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <adminContext.Provider
      value={{
        addMovie: addMovie,
        getMovies: getMovies,
        movies: state.movies,
      }}
    >
      {props.children}
    </adminContext.Provider>
  );
};

export default AdminContextProvider;
