import ApiActionTypes from "constants/api";
import ActionTypes from "./const";
export interface SavedTasksState {
  list: any[]
  isLoading: boolean
}

const initialState: SavedTasksState = {
  list: [],
  isLoading: false
}

export default function TaskUserReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_SAVED_TASKS:

      break
    
    case ActionTypes.FETCH_SAVED_TASKS_REQUEST:
      state.isLoading = true;
      break
    case ActionTypes.FETCH_SAVED_TASKS_REQUEST + ApiActionTypes.SUCCESS:
      state.isLoading = false;
      state.list = action.payload.data
      break
    case ActionTypes.FETCH_SAVED_TASKS_REQUEST + ApiActionTypes.FAIL:
      state.isLoading = false;
      break
  }

  return state
}
