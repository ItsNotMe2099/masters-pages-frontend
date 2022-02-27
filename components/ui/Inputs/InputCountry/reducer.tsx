import ApiActionTypes from 'constants/api'
import ActionTypes from './const'

export interface CountryInputState {
  countries: string[],
}

const initialState: CountryInputState = {
  countries: []
}

export default function authReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_LOCATION_COUNTRIES:

      break
    case ActionTypes.FETCH_LOCATION_COUNTRIES + ApiActionTypes.SUCCESS:
      state.countries = action.payload.map(item => {
        return  {
          label: item.country_name,
          value: item.country_code
        }
      })
      break

  }
  return state
}
