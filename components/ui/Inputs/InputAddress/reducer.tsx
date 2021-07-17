import ApiActionTypes from "constants/api";
import ActionTypes from "./const";

export interface LocationInputState {
  cities: string[],
  countries: string[],
}

const initialState: LocationInputState = {
cities: [],
  countries: []
}

export default function authReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_LOCATION_CITIES:

      break
    case ActionTypes.FETCH_LOCATION_COUNTRIES:

      break
    case ActionTypes.FETCH_LOCATION_CITIES + ApiActionTypes.SUCCESS:
      console.log("action.payload", action.payload)
      state.cities = action.payload.map(item => {
        return  {
          label: item.name,
          value: item.geonameid,
          location: {lat: item.latitude, lng: item.longitude}
        }
      });
      break
    case ActionTypes.FETCH_LOCATION_COUNTRIES + ApiActionTypes.SUCCESS:
      state.countries = action.payload
      break

  }
  return state
}
