import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const fetchLocationCountries = ({search = '', page, limit = 10, country = 'CA'}) => action(ActionTypes.FETCH_LOCATION_COUNTRIES, {
  api: {
    url: `/api/location/country?page=${page}&limit=${limit}&search=${search}&lang=en`,
    method: 'GET',
  }
})
