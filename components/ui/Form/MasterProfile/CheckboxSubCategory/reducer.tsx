import ApiActionTypes from "constants/api";
import ActionTypes from "./const";
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubCategory } from "./actions";

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
      console.log("action.payload.checkbox", action.payload)
      state.subCategories = action.payload
      break

      case ActionTypes.FETCH_CATEGORIES:

      break
    case ActionTypes.FETCH_CATEGORIES + ApiActionTypes.SUCCESS:
      console.log("action.payload", action.payload)
      state.categories = action.payload.map(item => {
        return  {
          label: item.name,
          value: item.id
    }
      });
      break
  }
  return state
}
