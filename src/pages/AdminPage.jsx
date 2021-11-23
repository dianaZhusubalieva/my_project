import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableAdmin from "../components/TableAdmin";

const AdminPage = () => {
  return (
    <div>
      hello admin!
      <Link to="/admin/add">
        <Button variant="dark">add a movie</Button>{" "}
      </Link>
      <div>
        <TableAdmin />
      </div>
    </div>
  );
};

export default AdminPage;
