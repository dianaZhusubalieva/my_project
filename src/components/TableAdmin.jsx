import React from "react";
import { Table } from "react-bootstrap";
import { adminContext } from "../contexts/AdminContext";

export default function TableAdmin() {
  const { getMovies, movies } = React.useContext(adminContext);
  React.useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      {movies ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>name of movie</th>
              <th>image of movie</th>
              <th>link of movie</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <th>{movie.id}</th>
                <th>{movie.name}</th>
                <th>{movie.image}</th>
                <th>{movie.link}</th>
              </tr>
            ))}
            console.log(movie);
          </tbody>
        </Table>
      ) : (
        <h2>loading...</h2>
      )}
    </>
  );
}

<tbody>
  <tr>
    <td>1</td>
    <td>Mark</td>
    <td>Otto</td>
    <td>@mdo</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Jacob</td>
    <td>Thornton</td>
    <td>@fat</td>
  </tr>
  <tr>
    <td>3</td>
    <td colSpan="2">Larry the Bird</td>
    <td>@twitter</td>
  </tr>
</tbody>;
