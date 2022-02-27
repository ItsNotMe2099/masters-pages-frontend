import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const fetchSubCategory = (categoryId: number, search?: string) => action(ActionTypes.FETCH_SUBCATEGORIES, {
  api: {
    url: `/api/service-category/${categoryId}/subcategory?lang=ru&search=${search}`,
    method: 'GET',
  }
})

export const fetchCategory = () => action(ActionTypes.FETCH_CATEGORIES, {
  api: {
    url: '/api/service-category?lang=en',
    method: 'GET',
  }
})
