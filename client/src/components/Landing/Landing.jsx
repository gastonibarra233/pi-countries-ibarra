import linkedin from "../../img/linkedin.png";
import github from "../../img/github.png";
import rose from "../../img/compassrose.png";
import { NavLink } from "react-router-dom";
import "./Landing.css";
import React from "react";

const Landing = () => {
  return (
    <div className="landing">
      <div className="shadow">
        <div className="topLeft">
          <a
            href="https://www.linkedin.com/in/gast%C3%B3n-leonardo-ibarra-4b092a268/"
            target="_blank"
            rel="noreferrer"
            className="alink">
            <img src={linkedin} alt="linkedin" className="img" />
          </a>
          <a
            href="https://github.com/gastonibarra233"
            target="_blank"
            rel="noreferrer"
            className="alink">
            <img src={github} alt="github" className="img" />
          </a>
        </div>

        <div className="text">
          <div className="textSmall">
            <h5>Henry PI</h5>
          </div>

          <div className="textBig">
            <h1>Countries App Project</h1>
          </div>

          <div className="image">
            <NavLink to="/home">
              <img src={rose} alt="compassrose" className="rose" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
