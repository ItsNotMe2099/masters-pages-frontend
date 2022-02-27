import ApiActionTypes from 'constants/api'
import ActionTypes from './const'
export interface SavedTasksState {
  list: any[]
  isLoading: boolean
  listTotal: number
}

const initialState: SavedTasksState = {
  list: [],
  isLoading: false,
  listTotal: 0
}

export default function TaskUserReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_SAVED_TASKS:

      break
    
    case ActionTypes.FETCH_SAVED_TASKS_REQUEST:
      state.isLoading = true
      break
    case ActionTypes.FETCH_SAVED_TASKS_REQUEST + ApiActionTypes.SUCCESS:
      state.isLoading = false
      state.list = [...state.list, ...action.payload.data]
      state.listTotal = action.payload.total
      break
    case ActionTypes.FETCH_SAVED_TASKS_REQUEST + ApiActionTypes.FAIL:
      state.isLoading = false
      break

    case ActionTypes.RESET_SAVED_TASKS_LIST:
      state.isLoading = false
      state.list = []
      state.listTotal = 0
      break
  }

  return state
}
