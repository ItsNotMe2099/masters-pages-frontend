import ApiActionTypes from "constants/api";
import ActionTypes from "./const";

export interface LocationInputState {
  cities: string[]
}

const initialState: LocationInputState = {
cities: []
}

export default function authReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_LOCATION_CITIES:

      break
    case ActionTypes.FETCH_LOCATION_CITIES + ApiActionTypes.SUCCESS:
      state.cities = action.payload.map(item => {
        return  {
          label: item.name,
          value: item.geonameid,
          location: {lat: item.latitude, lng: item.longitude}
        }
      });
      break

  }
  return state
}
