import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { adminContext } from "../contexts/AdminContext";

export default function TableAdmin() {
  const { getMovies, movies, deleteMovie } = React.useContext(adminContext);
  React.useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      {movies ? (
        <div className="table">
          <Table sx={{ minWidth: 650 }} striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>name of movie</th>
                <th>image of movie</th>
                <th>link of movie</th>
                <th>#</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {movies.length > 0
                ? movies.map((movie) => (
                    <tr key={movie.id}>
                      <th>{movie.id}</th>
                      <th>{movie.name}</th>
                      <th>
                        <img width="70" src={movie.image} alt="movie" />
                      </th>
                      <th>{movie.link}</th>
                      <th>
                        <Link to={`/admin/edit/${movie.id}`}>
                          <Button variant="light">edit</Button>
                        </Link>
                      </th>
                      <th>
                        <Button
                          onClick={() => deleteMovie(movie.id)}
                          style={{ background: "darkred" }}
                        >
                          delete
                        </Button>
                      </th>
                    </tr>
                  ))
                : ""}
            </tbody>
          </Table>
        </div>
      ) : (
        <h2>loading...</h2>
      )}
    </>
  );
}
