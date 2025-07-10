import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "./HomePage.css";

const HomePage = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase(); // To match routes case-insensitively

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of the Admin Panel!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Logged out!', '', 'success');
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        navigate("/");
      }
    });
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        <h2 className="logo">Vendor Panel</h2>
        <ul>
          <li className={currentPath === "/dashboard" ? "active" : ""}>
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          <li className={currentPath === "/orders" ? "active" : ""}>
            <Link to="/orders">Orders</Link>
          </li>
          <li className={currentPath === "/products" ? "active" : ""}>
            <Link to="/Products">Products</Link>
          </li>
          <li className={currentPath === "/addproducts" ? "active" : ""}>
            <Link to="/AddProducts">Add Products</Link>
          </li>
          <li className={currentPath === "/category" ? "active" : ""}>
            <Link to="/Category">Categories</Link>
          </li>
          <li className={currentPath === "/customers" ? "active" : ""}>
            <Link to="/Customers">Customers</Link>
          </li>
          <li className={currentPath === "/profile" ? "active" : ""}>
            <Link to="/Profile">Profile</Link>
          </li>
          <li className={currentPath === "/Team" ? "active" : ""}>
            <Link to="/Team">Team</Link>
          </li>
          <li className="logout" onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Logout{" "}
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/material-rounded/24/FFFFFF/exit.png"
              alt="exit"
            />
          </li>
        </ul>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default HomePage;
