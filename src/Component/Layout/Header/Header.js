import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <ul className="navbar-list">
        <li>
          <NavLink className="navbar-link" to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-link" to="/experience">
            Experience
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-link" to="/projects">
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-link" to="/blogs">
            Blogs
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
