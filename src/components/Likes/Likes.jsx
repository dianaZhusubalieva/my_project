import React, { useContext, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { useParams } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { likesContext } from "../../contexts/LikesContext";
const Likes = () => {
  const { getLikes, likes, addLike, saveEditedLikes } =
    useContext(likesContext);
  const params = useParams();
  useEffect(() => {
    getLikes(params.id);
  }, []);
  // let user = JSON.parse(localStorage.getItem("user"));

  const { currentUser } = useAuth();

  let idFeedTemp,
    checkFeed,
    myRate = 0;
  let count = 0;
  let avgRate = 0;

  if (likes) {
    // console.log(likes);
    likes.forEach((item) => {
      if (item.productId === params.id && item.owner === currentUser.email) {
        idFeedTemp = item.id;
        checkFeed = true;
        myRate = item.rate;
      }
      if (item.productId === params.id) {
        count++;
        avgRate += item.rate;
      } else {
        alert("likes.jsx 35");
      }
    });
  }
  const handleRating = () => {
    if (checkFeed) {
      let editRate = {
        owner: currentUser.email,
        productId: params.id,
        rate: myRate === 1 ? 0 : 1,
        id: idFeedTemp,
      };
      saveEditedLikes(editRate);
    } else {
      addLike(currentUser.email, params.id, 1);
    }
  };
  return (
    <>
      {likes ? (
        <div className="likeCombo">
          <AiOutlineLike
            style={{
              color: myRate === 1 ? "red" : "pink",

              fontSize: "30px",
              marginLeft: "10px",
              cursor: "pointer",
            }}
            onClick={handleRating}
          />
          <span style={{ fontSize: "25px" }}>
            {likes.filter((item) => item.rate === 1).length}
          </span>
        </div>
      ) : (
        <h2>Load</h2>
      )}
    </>
  );
};
export default Likes;
