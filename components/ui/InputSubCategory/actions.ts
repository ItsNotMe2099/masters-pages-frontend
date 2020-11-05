import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const fetchSubCategory = () => action(ActionTypes.FETCH_SUBCATEGORIES, {
  api: {
    url: `/api/service-category/1/subcategory?lang=ru`,
    method: 'GET',
  }
})
