import ApiActionTypes from "constants/api";
import ActionTypes from "./const";
export interface SavedPeopleState {
  list: any[]
  isLoading: boolean
}

const initialState: SavedPeopleState = {
  list: [],
  isLoading: false
}

export default function TaskUserReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_SAVED_PEOPLE:

      break
    
    case ActionTypes.FETCH_SAVED_PEOPLE_REQUEST:
      state.isLoading = true;
      break
    case ActionTypes.FETCH_SAVED_PEOPLE_REQUEST + ApiActionTypes.SUCCESS:
      state.isLoading = false;
      state.list = action.payload
      console.log('payload!!!', action.payload)
      break
    case ActionTypes.FETCH_SAVED_PEOPLE_REQUEST + ApiActionTypes.FAIL:
      state.isLoading = false;
      break
  }

  return state
}
