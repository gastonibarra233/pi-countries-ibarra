import React from "react";
import { NavLink } from "react-router-dom";
import linkedin from "../../img/linkedin.png";
import github from "../../img/github.png";
import './Nav.css'

const Nav = () => {
  return (
    <div className="bar">
      <NavLink className="countries" to="/home">
        Countries PI
      </NavLink>
      <NavLink className="select" to="/">
        Exit
      </NavLink>
      <NavLink className="select" to="/form">
        Crete Activity
      </NavLink>
      <a
        href="https://www.linkedin.com/in/gast%C3%B3n-leonardo-ibarra-4b092a268/"
        target="_blank"
        rel="noneferrer"
        className="alink">
        <img src={linkedin} alt="linkedin" className="img" />
      </a>
      <a
        href="https://github.com/gastonibarra233"
        target="_blank"
        rel="noneferrer"
        className="alink">
        <img src={github} alt="github" className="img" />
      </a>
    </div>
  );
};

export default Nav;
