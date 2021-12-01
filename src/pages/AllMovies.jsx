import React from "react";
import AllMoviesComp from "../components/AllMovies/AllMoviesComp";
import Navbar from "../components/Navbar/Navbar";
import MyPagination from "../components/Pagination/Pagination";

const AllMovies = () => {
  return (
    <>
      <Navbar />
      <AllMoviesComp />
    </>
  );
};

export default AllMovies;
