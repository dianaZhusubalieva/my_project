import React from "react";
import Data from "./data";

function Card(props) {
  return (
    <div className="pop_nef">
      <div className="pop_item">
        <div className="pop_link">
          <a href={props.link} target="_blank">
            <img className="carousel-imgs" src={props.imgs} alt="test"></img>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
