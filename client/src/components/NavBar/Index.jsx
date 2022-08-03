import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

function NavBar() {
  return (
    <>
      <nav className="nav-bar">
        <h1 className="navBar-title">
          <span className="highlight">Zoomies</span>
        </h1>

        <NavLink to={"/"}>Home</NavLink>
      </nav>
    </>
  );
}

export default NavBar;
