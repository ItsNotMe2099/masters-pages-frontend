import ApiActionTypes from "constants/api";
import ActionTypes from "./const";

export interface SubCategoryInputState {
  subCategories: string[],
}

const initialState: SubCategoryInputState = {
  subCategories: []
}

export default function authReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_SUBCATEGORIES:
      break
    case ActionTypes.FETCH_SUBCATEGORIES + ApiActionTypes.SUCCESS:
      console.log("action.payload", action.payload)
      state.subCategories = action.payload
      break
    case ActionTypes.RESET_SUBCATEGORIES:
      state.subCategories = [];
      break;
  }
  return state
}