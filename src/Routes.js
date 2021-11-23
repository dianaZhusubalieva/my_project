import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminContextProvider from "./contexts/AdminContext";
import AddPage from "./pages/AdminAdd";

import AdminPage from "./pages/AdminPage";

const MyRoutes = () => {
  return (
    <AdminContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/add" element={<AddPage />} />
        </Routes>
      </BrowserRouter>
    </AdminContextProvider>
  );
};

export default MyRoutes;
