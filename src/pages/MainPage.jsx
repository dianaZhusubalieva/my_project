import React from "react";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Pop from "../components/PopularOnNet/Pop";
import Row from "../components/Row/Row";
import requests from "../requests";

const MainPage = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Row title="NETFLIX ORIGINALS" isLargeRow />
      <br />
      <Pop />

      <Footer />
    </div>
  );
};

export default MainPage;
