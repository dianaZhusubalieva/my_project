import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { ClientContext } from "../contexts/ClientContext";
import { Button, Modal } from "react-bootstrap";
import Comments from "../components/Comments/Comments";
import { Link } from "react-router-dom";
import Likes from "../components/Likes/Likes";

const DetailPage = () => {
  const { getDetails, detailMovie } = useContext(ClientContext);

  const [modalShow, setModalShow] = React.useState(false);

  const params = useParams();
  useEffect(() => {
    getDetails(params.id);
  }, []);

  // modal
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        className="main-modal"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <iframe
            width="760"
            height="355"
            src={detailMovie.video}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </Modal.Body>

        <Button variant="outline-danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal>
    );
  }
  return (
    <>
      <div>
        {detailMovie ? (
          <>
            <div className="detail-page">
              <div className="detailImage">
                <img width="300px" src={detailMovie.image} alt="" />
                <div className="underMovieBtns">
                  <a href={detailMovie.link}>
                    <Button variant="outline-danger">watch</Button>
                  </a>
                  <Likes />
                </div>
              </div>

              <div className="movie-desc">
                <h3>{detailMovie.name}</h3>
                <p>{detailMovie.description}</p>

                <Button variant="outline-danger">add to favorites</Button>

                <Button
                  variant="outline-light"
                  onClick={() => setModalShow(true)}
                >
                  watch trailer
                </Button>

                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
            </div>
          </>
        ) : (
          <h2>loading...</h2>
        )}
      </div>
      <Comments />
    </>
  );
};

export default DetailPage;
