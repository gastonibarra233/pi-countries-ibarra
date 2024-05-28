import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCountry } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import linkedin from "../../img/linkedin.png";
import github from "../../img/github.png";
import "./SearchBar.css";

const reload = () => {
  window.location.reload(false);
};

const SearchBar = (props) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchCountry(name));
    setName("");
    props.onPageChange(1);
  };
  return (
    <div className="bar">
      <button
        className="countries"
        onClick={reload}>
        Countries PI
      </button>
      <input
        className="search"
        type="search"
        placeholder="Search country..."
        value={name}
        onChange={handleChange}
      />
      <button
        className="buttonsearch"
        type="submit"
        disabled={name === ""}
        onClick={handleSubmit}>
        Search
      </button>
      <button
        className="buttonsearchh"
        type="button"
        onClick={props.handleFilter}>
        Reset Search
      </button>

      <NavLink className="select" to="/">
        Exit
      </NavLink>
      <NavLink className="select" to="/form">
        Create Activity
      </NavLink>
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
  );
};

export default SearchBar;
