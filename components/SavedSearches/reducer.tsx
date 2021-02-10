import ApiActionTypes from "constants/api";
import ActionTypes from "./const";
export interface SavedSearchesState {
  list: any[]
  isLoading: boolean
}

const initialState: SavedSearchesState = {
  list: [],
  isLoading: false
}

export default function TaskUserReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_SAVED_SEARCHES:

      break

    case ActionTypes.FETCH_SAVED_SEARCHES_REQUEST:
      state.isLoading = true;
      break
    case ActionTypes.FETCH_SAVED_SEARCHES_REQUEST + ApiActionTypes.SUCCESS:
      state.isLoading = false;
      state.list = action.payload.data
      console.log('payloadSearches!!!', action.payload)
      break
    case ActionTypes.FETCH_SAVED_SEARCHES_REQUEST + ApiActionTypes.FAIL:
      state.isLoading = false;
      break
    case ActionTypes.DELETE_SAVED_SEARCHES_REQUEST + ApiActionTypes.SUCCESS:
      console.log("Delete success", action.payload);
      state.list = state.list.filter(item => item.id !== action.payload.id)
      break
  }

  return state
}
