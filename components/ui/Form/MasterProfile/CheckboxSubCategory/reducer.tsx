import ApiActionTypes from 'constants/api'
import ActionTypes from './const'

export interface SubCategoryCheckboxState {
  subCategories: string[],
  categories: string[],
}

const initialState: SubCategoryCheckboxState = {
  subCategories: [],
  categories: []
}

export default function authReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_SUBCATEGORIES:

      break
    case ActionTypes.FETCH_SUBCATEGORIES + ApiActionTypes.SUCCESS:
      state.subCategories = action.payload
      break

      case ActionTypes.FETCH_CATEGORIES:

      break
    case ActionTypes.FETCH_CATEGORIES + ApiActionTypes.SUCCESS:
      state.categories = action.payload.map(item => {
        return  {
          label: item.name,
          value: item.id
    }
      })
      break
  }
   return {...state}
}
