import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { timeSince } from "../../helpers/calcTimeAgo";
import { Button } from "react-bootstrap";
import { commentContext } from "../../contexts/CommentContext";
import "./Comments.css";
import accIcon from "../../images/account (1).png";

const Comments = () => {
  const {
    addComment,
    getComment,
    comments,
    deleteComment,
    editComment,
    comment,
    getCommentById,
  } = useContext(commentContext);

  const [val, setVal] = useState("");
  const [newEditComm, setNewEditComm] = useState("");
  let params = useParams();
  let user = JSON.parse(localStorage.getItem("users"));
  useEffect(() => {
    getComment(params.id);
  }, []);
  const creatingComment = (e) => {
    e.preventDefault();
    let time = new Date().toLocaleDateString();
    let timeSeconds = Date.now();
    addComment(
      val,
      user.username,
      user.displayName,
      user.photoURL,
      params.id,
      time,
      timeSeconds
    );
    setVal("");
  };
  const handleChangeEdit = (e) => {
    setVal(e.target.value);
  };
  function deleteCommentTemp(id, productId) {
    deleteComment(id, productId);
  }
  const [bool, setBool] = useState(false);
  const [checkid, setCheckid] = useState();
  let [bool2, setBool2] = useState(true);
  const editComm = (id) => {
    setBool(true);
    setCheckid(id);
  };
  const changeEditedComm = (e) => {
    setNewEditComm(e.target.value);
  };
  const saveEditedComm = () => {
    editComment(newEditComm);
    setBool(false);
    setBool2(true);
    getComment(params.id);
  };
  return (
    <>
      {comments
        ? comments
            .sort((a, b) => b.timeSeconds - a.timeSeconds)
            .map((item) => (
              <div className="main-comments">
                <div className="comments-block" key={item.id}>
                  <div className="who-is">
                    <img style={{ width: "30px" }} src={accIcon} alt="" />
                    <p className="disp-name">
                      {item.displayName !== null
                        ? item.displayName
                        : item.owner}
                    </p>
                  </div>
                  <span className="date-comm">
                    Created {item.time}, {timeSince(item.timeSeconds)} ago{" "}
                  </span>

                  {bool && checkid === item.id ? (
                    <>
                      <div className="input-div edit-comm ">
                        <strong className="input-name">
                          {item.displayName !== null
                            ? item.displayName
                            : item.owner}
                        </strong>
                        <textarea
                          rows="2"
                          className="input-box2 edit-comm-box"
                          type="text"
                          placeholder="Type your reply here."
                          component="input"
                          value={newEditComm}
                          onChange={changeEditedComm}
                        ></textarea>
                      </div>
                      <Button
                        variant="outline-dark"
                        onClick={() => saveEditedComm()}
                      >
                        Сохранить
                      </Button>
                    </>
                  ) : (
                    <p className="comment-text">{item.text}</p>
                  )}
                  {user ? (
                    item.owner === user.username ? (
                      bool2 ? (
                        <>
                          <Button
                            variant="outline-secondary"
                            onClick={() => {
                              setNewEditComm(item.text);
                              getCommentById(item.id);
                              editComm(item.id);
                              setBool2(false);
                            }}
                          >
                            edit
                          </Button>
                          <Button
                            variant="outline-secondary"
                            onClick={() => {
                              deleteCommentTemp(item.id, item.productId);
                            }}
                          >
                            delete
                          </Button>
                        </>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )
                  ) : null}
                </div>
              </div>
            ))
        : null}
      {user ? (
        <>
          <div className="comments-block">
            <form>
              <div className="form2">
                <div className="row2">
                  <div className="row2">
                    <div className="input-div">
                      <span className="input-name">
                        {user.displayName !== null ? user.displayName : null}
                      </span>
                      {bool2 ? (
                        <textarea
                          rows="2"
                          className="input-box2"
                          type="text"
                          value={val}
                          placeholder="leave a comment"
                          component="input"
                          onChange={handleChangeEdit}
                        ></textarea>
                      ) : (
                        <textarea
                          readOnly
                          rows="2"
                          className="input-box2"
                          type="text"
                          component="input"
                          value={val}
                          onChange={handleChangeEdit}
                        ></textarea>
                      )}
                    </div>
                  </div>
                </div>
                <div className="btn-div">
                  <Button
                    style={{ backgroundColor: "grey", border: "none" }}
                    className="post-btn"
                    onClick={creatingComment}
                    type="submit"
                  >
                    send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <Link to="/register">
          <h5 className="login-to">sign in to leave a comment</h5>
        </Link>
      )}
    </>
  );
};

export default Comments;
