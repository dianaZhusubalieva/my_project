import React, { useContext } from "react";
import { ClientContext } from "../../contexts/ClientContext";
import { Button } from "react-bootstrap";

const MyPagination = () => {
  const { totalPosts, postsPerPage, handlePage, currentPage } =
    useContext(ClientContext);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <ul className="pagination">
        {pageNumbers.map((page) => (
          <li key={page} className="page-item">
            <Button
              style={{
                background:
                  page === currentPage ? "rgb(150, 7, 7)" : "#684f4fc7",
                color: "black",
                border: "none",
              }}
              onClick={() => handlePage(page)}
            >
              {page}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPagination;
