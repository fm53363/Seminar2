// Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ links }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink
            to="/"
            className={({ isActive }) => {
              if (isActive) {
                return "nav-item nav-link active";
              }
              return "nav-item nav-link";
            }}
          >
            Home
          </NavLink>

          <NavLink
            to="/croatia"
            className={({ isActive }) => {
              if (isActive) {
                return "nav-item nav-link active";
              }
              return "nav-item nav-link";
            }}
          >
            Croatia
          </NavLink>
          <NavLink
            to="/slovenia"
            className={({ isActive }) => {
              if (isActive) {
                return "nav-item nav-link active";
              }
              return "nav-item nav-link";
            }}
          >
            Slovenia
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
