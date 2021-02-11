import ApiActionTypes from "constants/api";
import ActionTypes from "./const";
export interface SavedSearchesState {
  list: any[]
  isLoading: boolean
  listTotal: number
}

const initialState: SavedSearchesState = {
  list: [],
  isLoading: false,
  listTotal: 0
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
      state.list = [...state.list, ...action.payload.data]
      state.listTotal = action.payload.total
      console.log('payloadSearches!!!', action.payload)
      break
    case ActionTypes.FETCH_SAVED_SEARCHES_REQUEST + ApiActionTypes.FAIL:
      state.isLoading = false;
      break
    case ActionTypes.DELETE_SAVED_SEARCHES_REQUEST + ApiActionTypes.SUCCESS:
      console.log("Delete success", action.payload);
      state.list = state.list.filter(item => item.id !== action.payload.id)
      break

    case ActionTypes.RESET_SAVED_SEARCHES_LIST:
      state.isLoading = false;
      state.list = []
      state.listTotal = 0
      break
  }

  return state
}
