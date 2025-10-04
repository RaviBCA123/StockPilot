import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/categories" />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/categories" element={
          <PrivateRoute>
            <CategoriesPage />
          </PrivateRoute>
        } />

        <Route path="/products" element={
          <PrivateRoute>
            <ProductsPage />
          </PrivateRoute>
        } />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
}

export default App;
