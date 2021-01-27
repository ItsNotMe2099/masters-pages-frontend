import ApiActionTypes from "constants/api";
import ActionTypes from "./const";
export interface ProfileFeedbackState {
  list: any[]
  listLatest: any[]
  isLoading: boolean
  total: number
}

const initialState: ProfileFeedbackState = {
  list: [],
  listLatest: [],
  isLoading: false,
  total: 0
}

export default function TaskUserReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_FEEDBACKS_TO_PROFILE:
      console.log("FETCH_FEEDBACKS_TO_PROFILE")
      break
    
    case ActionTypes.FETCH_FEEDBACKS_TO_PROFILE_REQUEST:
      state.isLoading = true;
      console.log("FETCH_FEEDBACKS_TO_PROFILE_REQUEST")
      break
    case ActionTypes.FETCH_FEEDBACKS_TO_PROFILE_REQUEST + ApiActionTypes.SUCCESS:
      state.isLoading = false;
      state.list = action.payload.data
      state.total = action.payload.total
      console.log("FETCH_FEEDBACKS_TO_PROFILE_REQUEST + ApiActionTypes.SUCCESS")
      break
    case ActionTypes.FETCH_FEEDBACKS_TO_PROFILE_REQUEST + ApiActionTypes.FAIL:
      state.isLoading = false;
      break
    case ActionTypes.FETCH_LATEST_FEEDBACKS_TO_PROFILE:

      break
      
    case ActionTypes.FETCH_LATEST_FEEDBACKS_TO_PROFILE_REQUEST:
      state.isLoading = true;
      break
    case ActionTypes.FETCH_LATEST_FEEDBACKS_TO_PROFILE_REQUEST + ApiActionTypes.SUCCESS:
      state.isLoading = false;
      state.listLatest = action.payload.data
      break
    case ActionTypes.FETCH_LATEST_FEEDBACKS_TO_PROFILE_REQUEST + ApiActionTypes.FAIL:
      state.isLoading = false;
      break
  }

  return state
}
