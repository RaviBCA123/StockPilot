import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBoxes, FaTags } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ minHeight: "70px" }}>
      <div className="container-fluid px-5">
        <div className="navbar-brand fw-bold ms-4">StockPilot</div>

        <div className="collapse navbar-collapse">
          {/* Centered Navigation Items */}
          <ul className="navbar-nav mx-auto position-absolute start-50 translate-middle-x">
            {user && (
              <>
                <li className="nav-item mx-4">
                  <Link className={`nav-link ${location.pathname === "/categories" ? "active" : ""}`} to="/categories">
                    <FaTags className="me-2" /> Categories
                  </Link>
                </li>
                <li className="nav-item mx-4">
                  <Link className={`nav-link ${location.pathname === "/products" ? "active" : ""}`} to="/products">
                    <FaBoxes className="me-2" /> Products
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Right-aligned User Info */}
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">Hi, {user.username}</span>
                </li>
                <li className="nav-item ms-3">
                  <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;