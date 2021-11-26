import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import TableAdmin from "../components/TableAdmin";

const AdminPage = () => {
  return (
    <>
      <Navbar />
      <div className="addMovie">
        <Link to="/admin/add">
          <Button variant="dark">add a movie</Button>
        </Link>
      </div>
      <div>
        <TableAdmin />
      </div>
    </>
  );
};

export default AdminPage;
