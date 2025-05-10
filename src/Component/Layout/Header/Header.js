import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import { MdHomeFilled } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { HiMiniCodeBracket } from "react-icons/hi2";
import { IoDocument } from "react-icons/io5";

const Header = () => {
  return (
    <div className="header">
      <ul className="navbar-list">
        <li>
          <NavLink className="navbar-link" to="/">
            <span className="link-text">Home</span>
            <span className="icon-wrapper">
              <MdHomeFilled />
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-link" to="/experience">
            <span className="link-text">Experience</span>
            <span className="icon-wrapper">
              <FaUserTie />
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-link" to="/projects">
            <span className="link-text">Projects</span>
            <span className="icon-wrapper">
              <HiMiniCodeBracket />
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-link" to="/blogs">
            <span className="link-text">Blogs</span>
            <span className="icon-wrapper">
              <IoDocument />
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
