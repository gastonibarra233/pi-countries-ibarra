import {
  GET_ACTIVITIES,
  DELETE_ACTIVITIES,
  GET_COUNTRIES,
  GET_COUNTRY_DETAIL,
  CREATE_ACTIVITY,
  SEARCH_COUNTRY,
  FILTER_COUNTRY,
  ORDER_BY_NAME,
} from "./actionTypes";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

export const getCountries = () => {
    return async (dispatch) => {
      try {
          const { data } = await axios.get("/countries");
          dispatch({ type: GET_COUNTRIES, payload: data });        
      } catch (error) {
        console.error("Error fetching countries", error)
      }
  };
};

export const getCountryDetail = (id) => {
    return async (dispatch) => {
      try {
          let { data } = await axios.get(`/countries/${id}`);
          dispatch({ type: GET_COUNTRY_DETAIL, payload: data });        
      } catch (error) {
        console.error('Error fetching country detail', error)
      }
  };
};

export const createActivity = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/activities', payload)
      dispatch({
        type: CREATE_ACTIVITY,
        payload: response.data
      })
    } catch (error) {
      console.error('Error creating a new activity', error)
    }
  }
}

export const getActivities = (payload) => {
    return async (dispatch) => {
      try {
          let { data } = await axios.get("/activities", payload);
          dispatch({ type: GET_ACTIVITIES, payload: data });        
      } catch (error) {
        console.error('Error fetching activities', error)
      }
  };
};

export const deleteActivities = (name) => {
  return async (dispatch) => {
    if (!name) {
      console.error('Activity name is undefined')
      return;
    }

    try {
      const response = await axios.delete(`/activities?name=${name}`);
      dispatch({
        type: DELETE_ACTIVITIES,
        payload: response.data.message
      })
    } catch (error) {
      console.error("Error deleting activity", error);
    }
  };
};

export const searchCountry = (name) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/countries?name=${name}`);
      const currentState = getState();
      const allCountries =
        currentState.allCountries.length > 0
          ? currentState.allCountries
          : response.data;

      dispatch({
        type: SEARCH_COUNTRY,
        payload: response.data,
        allCountries,
      });
    } catch (error) {
      console.error("Error searching country", error);
    }
  };
};

//Filters
export const countryFilter = (payload) => {
  return {
    type: FILTER_COUNTRY,
    payload,
  };
};

//Order
export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};
