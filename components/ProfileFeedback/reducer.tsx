import ApiActionTypes from "constants/api";
import ActionTypes from "./const";
export interface ProfileFeedbackState {
  list: any[]
  listLatest: any[]
  listShort: any[]
  isLoading: boolean
  isLoadingShort: boolean
  totalShort: number
  formError?: string
  formLoading: boolean
  total: number
  page: number
}

const initialState: ProfileFeedbackState = {
  list: [],
  listLatest: [],
  listShort: [],
  isLoading: false,
  formLoading: false,
  isLoadingShort: false,
  total: 0,
  totalShort: 0,
  page: 1

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

    case ActionTypes.FEEDBACK_SET_PAGE:
      state.page = action.payload
      break

    case ActionTypes.FETCH_FEEDBACKS_TO_PROFILE_REQUEST + ApiActionTypes.SUCCESS:
      state.isLoading = false;
      state.list = [...state.list, ...action.payload.data]
      state.total = action.payload.total
      console.log("FETCH_FEEDBACKS_TO_PROFILE_REQUEST + ApiActionTypes.SUCCESS", state.list)
      break
    case ActionTypes.FETCH_FEEDBACKS_TO_PROFILE_REQUEST + ApiActionTypes.FAIL:
      state.isLoading = false;
      break

    case ActionTypes.FETCH_FEEDBACKS_TO_PROFILE_SHORT_REQUEST + ApiActionTypes.SUCCESS:
      state.isLoadingShort = false;
      state.listShort = action.payload.data
      state.totalShort = action.payload.total
      console.log("FETCH_FEEDBACKS_TO_PROFILE_REQUEST + ApiActionTypes.SUCCESS", state.list)
      break
    case ActionTypes.FETCH_FEEDBACKS_TO_PROFILE_SHORT_REQUEST + ApiActionTypes.FAIL:
      state.isLoadingShort = false;
      break



    case ActionTypes.FETCH_FEEDBACKS_MAIN_PAGE_REQUEST:
      state.isLoading = true;
      break
    case ActionTypes.FETCH_FEEDBACKS_MAIN_PAGE_REQUEST + ApiActionTypes.SUCCESS:
      state.isLoading = false;
      state.listLatest = action.payload.data
      break
    case ActionTypes.FETCH_FEEDBACKS_MAIN_PAGE_REQUEST + ApiActionTypes.FAIL:
      state.isLoading = false;
      break
    case ActionTypes.FETCH_FEEDBACKS_SITE_REQUEST:
      state.isLoading = true;
      break;
    case ActionTypes.FETCH_FEEDBACKS_SITE_REQUEST + ApiActionTypes.SUCCESS:
      state.list = [... state.list, ...action.payload.data]
      state.total = action.payload.total
      state.isLoading = false;
      break;
    case ActionTypes.FETCH_FEEDBACKS_SITE_REQUEST + ApiActionTypes.FAIL:
      state.isLoading = false;
      break;

    case ActionTypes.CREATE_FEEDBACK_MASTER_REQUEST:
      state.formLoading = true;
      break;
    case ActionTypes.CREATE_FEEDBACK_MASTER_REQUEST + ApiActionTypes.SUCCESS:
      state.formLoading = false;
      break;
    case ActionTypes.CREATE_FEEDBACK_MASTER_REQUEST + ApiActionTypes.FAIL:
      state.formLoading = false;
      state.formError = action.payload.error || action.payload.errors || 'Unknow error'
      break;

    case ActionTypes.CREATE_FEEDBACK_CLIENT_REQUEST:
      state.formLoading = true;
      break;
    case ActionTypes.CREATE_FEEDBACK_CLIENT_REQUEST + ApiActionTypes.SUCCESS:
      state.formLoading = false;
      break;
    case ActionTypes.CREATE_FEEDBACK_CLIENT_REQUEST + ApiActionTypes.FAIL:
      state.formLoading = false;
      state.formError = action.payload.error || action.payload.errors || 'Unknow error'
      break;

    case ActionTypes.CREATE_FEEDBACK_SITE_REQUEST:
      state.formLoading = true;
      break;
    case ActionTypes.CREATE_FEEDBACK_SITE_REQUEST + ApiActionTypes.SUCCESS:
      state.formLoading = false;
      break;
    case ActionTypes.CREATE_FEEDBACK_SITE_REQUEST + ApiActionTypes.FAIL:
      state.formLoading = false;
      state.formError = action.payload.error || action.payload.errors || 'Unknow error'
      break;
    case ActionTypes.RESET_FEEDBACK_LIST:
      state.list = [];
      state.total = 0;
      state.isLoading = false;
      break;
  }

  return state
}
