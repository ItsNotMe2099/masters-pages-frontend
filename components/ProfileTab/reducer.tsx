import ApiActionTypes from "constants/api";
import {IProfileTab, SkillData, SkillListItem} from "types";
import ActionTypes from "./const";
export interface ProfileTabState {
  list: IProfileTab[],
  listTotal: number,
  currentProfileTab?: IProfileTab,
  formIsSuccess: boolean
  formError: string,
  listLoading: boolean,
  currentLoading: boolean
  formLoading: boolean,
}

const initialState: ProfileTabState = {
  list: [],
  listTotal: 0,
  formIsSuccess: false,
  formError: '',
  formLoading: false,
  listLoading: false,
  currentLoading: false,
}

export default function ProfileTabReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.RESET_PROFILE_TAB_FORM:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.CREATE_PROFILE_TAB_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.CREATE_PROFILE_TAB_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      break
    case ActionTypes.CREATE_PROFILE_TAB_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.UPDATE_PROFILE_TAB_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.UPDATE_PROFILE_TAB_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      break
    case ActionTypes.UPDATE_PROFILE_TAB_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.DELETE_PROFILE_TAB_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.DELETE_PROFILE_TAB_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      break
    case ActionTypes.DELETE_PROFILE_TAB_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break

    case ActionTypes.FETCH_PROFILE_TAB_LIST:
      state.listLoading = true;
      break
    case ActionTypes.FETCH_PROFILE_TAB_LIST + ApiActionTypes.SUCCESS:
      state.list = action.payload.data
      state.listTotal = action.payload.total
      state.listLoading = false;
      break
    case ActionTypes.FETCH_PROFILE_TAB_LIST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break

    case ActionTypes.FETCH_PROFILE_TAB:
      state.currentLoading = true;
      break
    case ActionTypes.FETCH_PROFILE_TAB + ApiActionTypes.SUCCESS:
      state.currentProfileTab = action.payload
      state.currentLoading = false;
      break
    case ActionTypes.FETCH_PROFILE_TAB + ApiActionTypes.FAIL:
      state.currentLoading = false;
      break
  }

  return state
}
