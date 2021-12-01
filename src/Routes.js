import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";

import AdminContextProvider from "./contexts/AdminContext";
import AuthContextProvider from "./contexts/AuthContext";
import AddPage from "./pages/AdminAdd";
import EditPage from "./pages/AdminEdit";

import AdminPage from "./pages/AdminPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RegistePpage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ClientContextProvider from "./contexts/ClientContext";
import AllMovies from "./pages/AllMovies";
import DetailPage from "./pages/DetailPage";
import Navbar from "./components/Navbar/Navbar";
import CommentContextProvider from "./contexts/CommentContext";
import BuyAccPage from "./pages/BuyAccPage";
import PaymentPage from "./pages/PaymentPage";
import SuccessPayment from "./pages/SuccessPayment";
import LikesContextProvider from "./contexts/LikesContext";

const MyRoutes = () => {
  return (
    <LikesContextProvider>
      <CommentContextProvider>
        <ClientContextProvider>
          <AuthContextProvider>
            <AdminContextProvider>
              <BrowserRouter>
                <Navbar />
                <Routes>
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/admin/add" element={<AddPage />} />
                  <Route path="/admin/edit/:id" element={<EditPage />} />
                  <Route path="/register" element={<RegistePpage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/forgot" element={<ForgotPasswordPage />} />
                  <Route path="/" element={<MainPage />} />
                  <Route path="/movies" element={<AllMovies />} />
                  <Route path="/detail/:id" element={<DetailPage />} />
                  <Route path="/order" element={<BuyAccPage />} />
                  <Route path="/pay" element={<PaymentPage />} />
                  <Route path="/success" element={<SuccessPayment />} />
                </Routes>
              </BrowserRouter>
            </AdminContextProvider>
          </AuthContextProvider>
        </ClientContextProvider>
      </CommentContextProvider>
    </LikesContextProvider>
  );
};

export default MyRoutes;
