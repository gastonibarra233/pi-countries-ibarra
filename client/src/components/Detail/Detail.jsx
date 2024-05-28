import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail } from "../../redux/actions";
import "./Detail.css";

const Detail = () => {
  const { id } = useParams();
  const countries = useSelector((state) => state.countryDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, [id]);

  return (
    <div>
      <div className="containerPage">
        <div className="containerImage">
          <h1 className="country">{countries?.name}</h1>
          <img
            src={countries?.flagImg}
            alt={countries?.name}
            className="image"
          />
        </div>
        <div>
          <div className="containerDetails">
            <h1 className="title">Country Data</h1>
            <h3 className="text">Continent: {countries?.continent}</h3>
            <h3 className="text">Capital: {countries?.capital}</h3>
            <h3 className="text">Subregion: {countries?.subregion}</h3>
            <h3 className="text">Area: {countries?.area} km²</h3>
            <h3 className="text">Population: {countries?.population}</h3>
          </div>

          <div className="containerDetails">
            <h1 className="title">Tourist Activities</h1>
            <div className="activities">
              {countries?.Activities?.length > 0 ? (
                countries?.Activities?.map((act) => (
                  <div className="actcontainer" key={act.name}>
                    <h3 className="textsub">{act.name}</h3>
                    <h5 className="text">Difficulty: {act.difficulty}</h5>
                    <h5 className="text">Duration: {act.duration} hs</h5>
                    <h5 className="text">Season: {act.season}</h5>
                  </div>
                ))
              ) : (
                <p className="divLoading">No Tourist Activities added so far</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
