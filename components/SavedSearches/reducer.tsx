import ApiActionTypes from 'constants/api'
import ActionTypes from './const'
export interface SavedSearchesState {
  list: any[]
  isLoading: boolean
  listTotal: number,
  formLoading: boolean
}

const initialState: SavedSearchesState = {
  list: [],
  isLoading: false,
  listTotal: 0,
  formLoading: false
}

export default function TaskUserReducer(state = {...initialState}, action) {
  switch(action.type) {

    case ActionTypes.FETCH_SAVED_TASK_SEARCHES_REQUEST:
      state.isLoading = true
      break
    case ActionTypes.FETCH_SAVED_TASK_SEARCHES_REQUEST + ApiActionTypes.SUCCESS:
      state.isLoading = false
      state.list = action.payload.data
      state.listTotal = action.payload.total
      break
    case ActionTypes.FETCH_SAVED_TASK_SEARCHES_REQUEST + ApiActionTypes.FAIL:
      state.isLoading = false
      break
    case ActionTypes.FETCH_SAVED_PROFILE_SEARCHES_REQUEST:
      state.isLoading = true
      break
    case ActionTypes.FETCH_SAVED_PROFILE_SEARCHES_REQUEST + ApiActionTypes.SUCCESS:
      state.isLoading = false
      state.list = action.payload
      state.listTotal = action.payload.length
      break
    case ActionTypes.FETCH_SAVED_PROFILE_SEARCHES_REQUEST + ApiActionTypes.FAIL:
      state.isLoading = false
      break
    case ActionTypes.DELETE_SAVED_PROFILE_SEARCHES_REQUEST+ ApiActionTypes.SUCCESS:
    case ActionTypes.DELETE_SAVED_TASK_SEARCHES_REQUEST + ApiActionTypes.SUCCESS:
      state.list = state.list.filter(item => item.id !== action.payload.id)
      break
    case ActionTypes.SAVED_TASK_SEARCH_CREATE_REQUEST:
    case ActionTypes.SAVED_PROFILE_SEARCH_CREATE_REQUEST:
      state.formLoading = true
      break
    case ActionTypes.SAVED_TASK_SEARCH_CREATE_REQUEST+ ApiActionTypes.FAIL:
    case ActionTypes.SAVED_PROFILE_SEARCH_CREATE_REQUEST + ApiActionTypes.FAIL:
      state.formLoading = false
      break
    case ActionTypes.SAVED_TASK_SEARCH_CREATE_REQUEST+ ApiActionTypes.SUCCESS:
    case ActionTypes.SAVED_PROFILE_SEARCH_CREATE_REQUEST + ApiActionTypes.SUCCESS:
      state.formLoading = false
      break
    case ActionTypes.RESET_SAVED_SEARCHES_LIST:
      state.isLoading = false
      state.list = []
      state.listTotal = 0
      break
  }

   return {...state}
}
