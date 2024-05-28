import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getActivities,
  countryFilter,
  orderByName,
} from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import Card from "../Card/Card";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const elementsPerPage = 10;

  const indexOfLastElement = currentPage * elementsPerPage;
  const indexOfFirstElement = indexOfLastElement - elementsPerPage;
  const currentElements = countries?.slice(
    indexOfFirstElement,
    indexOfLastElement
  );

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  //filters
  const [continentFilter, setContinentFilter] = useState("All");
  const [activityFilter, setActivityFilter] = useState("All");
  
  const handleFilterContinent = e => {
    e.preventDefault()
    setContinentFilter(e.target.value)
  }

  const handleFilterActivity = e => {
    e.preventDefault()
    setActivityFilter(e.target.value)
  }

  const handleFilter = () => {
    setCurrentPage(1);
    dispatch(countryFilter({
      continent: continentFilter,
      activity: activityFilter,
    }));
  };
  
  const [orderBy, setOrderBy] = useState("");

  const handleOrderByName = (e) => {
    setOrderBy(e.target.value)
  };

  useEffect(() => {
    if (orderBy) {
      dispatch(orderByName(orderBy))
    }
  }, [orderBy, dispatch])

  //pagination
  const totalPages = Math.ceil(countries?.length / elementsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (

    <div>
      <div>
        <SearchBar
          handleFilter={handleFilter}
          onPageChange={handlePageChange}
          />
      </div>
      
      <div className="home">
        <div className="side">

          <div className="filterContainer">
            <h1 className="title">Filters</h1>
            <div>
              <h3 className="subtitle">By Continent</h3>
              <select
                className="select"
                value={continentFilter}
                onChange={handleFilterContinent}
                >
                <option value="All">All Continents</option>
                <option value="Africa">Africa</option>
                <option value="Antarctica">Antartica</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="Oceania">Oceania</option>
                <option value="South America">South America</option>
              </select>
            </div>

            <div>
              <h3 className="subtitle">By Activity</h3>
              <select
                className="select"
                value={activityFilter}
                onChange={handleFilterActivity}
                >
                <option value="All">All Activities</option>
                {allActivities &&
                  allActivities.map((act) => {
                    return (
                      <option key={act.id} value={act.name}>{act.name}</option>
                    )
                  })}
              </select>
            </div>

            <button className="reload" onClick={handleFilter}>
              Apply
            </button>
          </div>

          <div className="orderContainer">
            <h1 className="title">Order By</h1>
            <h3 className="subtitle">Name/Population</h3>
            <select
              className="select"
              value={orderBy}
              onChange={handleOrderByName}
              >
              <option value="" disabled>
                Order by...
              </option>
              <option value="ascName">Names A - Z</option>
              <option value="descName">Names Z - A</option>
              <option value="ascPopulation">Population Low-High</option>
              <option value="descPopulation">Population High-Low</option>
            </select>
          </div>

          <button
            className="reload"
            onClick={() => window.location.reload(false)}>
            Re-Load
          </button>
        </div>

        <div className="container">
          {currentElements.length !== 0 ? (
            currentElements.map(({ id, name, flagImg, continent }) => {
              return (
                <Card
                key={id}
                id={id}
                name={name}
                flagImg={flagImg}
                continent={continent}
                />
              );
            })
          ) : (
            <p className="msg">Country not found</p>
          )}
          <div className="space"> </div>
          <div className="page">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChangePage={handlePageChange}
              />
          </div>
              </div>
      </div>

    </div>
  );
};

export default Home;
