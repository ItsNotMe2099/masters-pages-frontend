import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const fetchCategory = () => action(ActionTypes.FETCH_CATEGORIES, {
  api: {
    url: `/api/service-category?lang=en`,
    method: 'GET',
  }
})
