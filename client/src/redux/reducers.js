import {
  GET_ACTIVITIES,
  DELETE_ACTIVITIES,
  GET_COUNTRIES,
  GET_COUNTRY_DETAIL,
  CREATE_ACTIVITY,
  SEARCH_COUNTRY,
  ORDER_BY_NAME,
  FILTER_COUNTRY,
} from "./actionTypes";
import { orderByName } from "./actions";

const initialState = {
  countries: [],
  allCountries: [],
  countryDetail: {},
  activities: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COUNTRIES:
      return { ...state, countries: payload, allCountries: payload };

    case GET_COUNTRY_DETAIL:
      return { ...state, countryDetail: payload };

    case CREATE_ACTIVITY:
      return { ...state };

    case GET_ACTIVITIES:
      return { ...state, activities: payload };

    case DELETE_ACTIVITIES:
      return { ...state };

    case SEARCH_COUNTRY:
      let searchedCountries

      if (state.countries.length === 0 || state.countries === state.allCountries) {
        searchedCountries = state.allCountries.filter((country) =>
          payload.some(searchCountry => searchCountry.id === country.id)
        );
      } else {
        searchedCountries = state.countries.filter(country => 
          payload.some(searchCountry => searchCountry.id === country.id)
        )
      }
      return { ...state, countries: searchedCountries };

    //filters
    case FILTER_COUNTRY:
      let filtCountries = [...state.allCountries];

      if (payload.continent !== "ALL") {
        filtCountries = filtCountries.filter(
          (c) => c.continent === payload.continent
        );
      }
      
      if (payload.activity !== "ALL") {
        filtCountries = filtCountries.filter((c) =>
          c.Activities && c.Activities.some((act) => act.name === payload.activity)
      );
      }
      console.log(filtCountries)

      return {
        ...state,
        countries: filtCountries,
      };

    //order
    case ORDER_BY_NAME:
      const allCountriesCopy = [...state.countries];

      if (payload === "ascName")
        return {
          ...state,
          countries: allCountriesCopy.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        };
      if (payload === "descName")
        return {
          ...state,
          countries: allCountriesCopy.sort((a, b) =>
            b.name.localeCompare(a.name)
          ),
        };
      if (payload === "ascPopulation")
        return {
          ...state,
          countries: allCountriesCopy.sort(
            (a, b) => parseInt(a.population, 10) - parseInt(b.population, 10)
          ),
        };
      if (payload === "descPopulation")
        return {
          ...state,
          countries: allCountriesCopy.sort(
            (a, b) => parseInt(b.population, 10) - parseInt(a.population, 10)
          ),
        };
      break;

    default:
      return state;
  }
};

export default reducer;
