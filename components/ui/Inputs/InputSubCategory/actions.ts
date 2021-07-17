import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const fetchSubCategory = (categoryId: number, search?: string, lang?: string) => action(ActionTypes.FETCH_SUBCATEGORIES, {
  api: {
    url: `/api/service-category/${categoryId}/subcategory?search=${search}`,
    method: 'GET',
  }
})

export const resetSubCategory = () => action(ActionTypes.RESET_SUBCATEGORIES)
