import React from "react";
import { Link } from "react-router";
import "./NavBar.module.css";
const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Films populaires</Link>
          <Link to="/wishlist">Wishlist</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
