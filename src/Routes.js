import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import AdminContextProvider from "./contexts/AdminContext";
import AuthContextProvider from "./contexts/AuthContext";
import AddPage from "./pages/AdminAdd";
import EditPage from "./pages/AdminEdit";

import AdminPage from "./pages/AdminPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RegistePpage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

const MyRoutes = () => {
  return (
    <AuthContextProvider>
      <AdminContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/add" element={<AddPage />} />
            <Route path="/admin/edit/:id" element={<EditPage />} />
            <Route path="/register" element={<RegistePpage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot" element={<ForgotPasswordPage />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </AdminContextProvider>
    </AuthContextProvider>
  );
};

export default MyRoutes;
