import axios from "axios";
import React, { useReducer } from "react";
import { COMMENTS_API } from "../helpers/const";

export const commentContext = React.createContext();
const INIT_STATE = {
  comments: null,
  comment: null,
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_COMM":
      return { ...state, comments: action.payload };
    case "GET_COMM_BY_ID":
      return { ...state, comment: action.payload };
    default:
      return state;
  }
};

const CommentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const addComment = async (
    text,
    owner,
    displayName,
    photoURL,
    productId,
    time,
    timeSeconds
  ) => {
    try {
      let comment = {
        text,
        owner,
        displayName,
        photoURL,
        productId,
        time,
        timeSeconds,
      };
      await axios.post(COMMENTS_API, comment);
      getComment(productId);
    } catch (e) {
      console.log(e);
    }
  };
  const getComment = async (productId) => {
    try {
      const { data } = await axios(`${COMMENTS_API}/?productId=${productId}`);
      dispatch({
        type: "GET_COMM",
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const deleteComment = async (id, productId) => {
    try {
      await axios.delete(`${COMMENTS_API}/${id}`);
      getComment(productId);
    } catch (e) {
      console.log(e);
    }
  };
  const getCommentById = async (id) => {
    try {
      const { data } = await axios(`${COMMENTS_API}/${id}`);
      dispatch({
        type: "GET_COMM_BY_ID",
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const editComment = async (editedComm) => {
    try {
      let newComm = {
        ...state.comment,
        text: editedComm,
      };
      await axios.patch(`${COMMENTS_API}/${newComm.id}`, newComm);
      getComment(newComm.productId);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <commentContext.Provider
      value={{
        addComment,
        getComment,
        deleteComment,
        getCommentById,
        editComment,
        comments: state.comments,
        comment: state.comment,
      }}
    >
      {children}
    </commentContext.Provider>
  );
};

export default CommentContextProvider;
