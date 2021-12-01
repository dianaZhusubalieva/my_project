import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ClientContext } from "../../contexts/ClientContext";

const Favorites = ({ handleClose1, handleShow1, show1 }) => {
  //! modal

  //!
  const { favorites, addAndDeleteProductInFavorites, getFavorite } =
    useContext(ClientContext);
  useEffect(() => {
    getFavorite();
  }, []);

  return (
    <div className="listHeader">
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title className="listColor">Favorite movies list</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "black" }}>
          {favorites ? (
            favorites.favorites.length > 0 ? (
              favorites.favorites.map((item) => (
                <div key={item.item.id} className="favoriteModal">
                  <img alt="" width="100px" src={item.item.image} />

                  <div className="modal-desc">
                    <span style={{ marginRight: "50px", marginLeft: "30px" }}>
                      {item.item.name}
                    </span>

                    <Button
                      style={{ marginRight: "25px" }}
                      variant="outline-danger"
                      onClick={() => {
                        addAndDeleteProductInFavorites(item.item);
                        getFavorite();
                      }}
                    >
                      delete
                    </Button>
                    <a href={item.item.link}>
                      <Button variant="outline-dark">watch now</Button>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <h3>Favorites is empty </h3>
            )
          ) : (
            <h3>Loading...</h3>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleClose1}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Favorites;
