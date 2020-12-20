import ApiActionTypes from "constants/api";
import { ISavedSearch} from "types";
import ActionTypes from "./const";
export interface SavedSearchesState {
  list: ISavedSearch[]
}

const initialState: SavedSearchesState = {
  list: []
}

export default function TaskUserReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_SAVED_SEARCHES:
      state.list = action.payload
      console.log('working')
      break
  }

  return state
}
