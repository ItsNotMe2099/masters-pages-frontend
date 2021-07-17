import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const fetchLocationCity = ({search = '', page, limit = 10, country = 'CA', id = ''}) => action(ActionTypes.FETCH_LOCATION_CITIES, {
  api: {
    url: `/api/location/city?page=${page}&limit=${limit}&search=${search}&lang=en&country=${country}&id=${id}`,
    method: 'GET',
  }
})
