import ApiActionTypes from "constants/api";
import ActionTypes from "./const";

export interface CategoryInputState {
  categories: string[],
}

const initialState: CategoryInputState = {
categories: [],
}

export default function authReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_CATEGORIES:

      break
    case ActionTypes.FETCH_CATEGORIES + ApiActionTypes.SUCCESS:
      console.log("action.payload", action.payload)
      state.categories = action.payload;
      break
  }
  return state
}
