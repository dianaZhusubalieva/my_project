import axios from "axios";
import React, { createContext, useReducer } from "react";
import { API } from "../helpers/const";

export const adminContext = React.createContext();

const INIT_STATE = {
  movies: null,
  movieToEdit: null,
  originals: null,
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return { ...state, movies: action.payload };
    case "GET_MOVIE_TO_EDIT":
      return { ...state, movieToEdit: action.payload };
    case "CLEAR_STATE":
      return { ...state, movieToEdit: action.payload };

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

  //!UPDATE
  //1
  const getMovieToEdit = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_MOVIE_TO_EDIT",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };
  //2
  const saveEditedMovie = async (editedMovie) => {
    try {
      const response = await axios.patch(
        `${API}/${editedMovie.id}`,
        editedMovie
      );
      getMovies();
      clearState();
    } catch (e) {
      console.log(e);
    }
  };

  const clearState = () => {
    let action = {
      type: "CLEAR_STATE",
      payload: null,
    };
    dispatch(action);
  };

  // !DELETE

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      getMovies();
    } catch (e) {
      console.log(e);
    }
  };

  // ! GET FOR ORIGINALS MOVIE

  return (
    <adminContext.Provider
      value={{
        addMovie: addMovie,
        getMovies: getMovies,
        getMovieToEdit: getMovieToEdit,
        saveEditedMovie: saveEditedMovie,
        clearState: clearState,
        deleteMovie: deleteMovie,

        movies: state.movies,
        movieToEdit: state.movieToEdit,
      }}
    >
      {props.children}
    </adminContext.Provider>
  );
};

export default AdminContextProvider;
