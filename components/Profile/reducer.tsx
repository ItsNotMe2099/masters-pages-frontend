import ApiActionTypes from "constants/api";
import { ProfileData } from "types";
import ActionTypes from "./const";
import cookie from "js-cookie";
import {parse, format} from 'date-fns'
export interface ProfileState {
  currentProfile: ProfileData
  formIsSuccess: boolean
  formError: string,
  loading: boolean,
  formLoading: boolean,
  avatarLoading: boolean,
  avatarFormError: null,
  isCompleted: boolean,
  role: string,
}

const initialState: ProfileState = {
  formIsSuccess: false,
  formError: '',
  formLoading: false,
  loading: false,
  isCompleted: false,
  avatarLoading: false,
  role: null,
  currentProfile: null,
  avatarFormError: null
}

export default function ProfileReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_PROFILE:
      state.formError = ''
      state.isCompleted = false;
      state.loading = true;
      break
    case ActionTypes.FETCH_PROFILE + ApiActionTypes.SUCCESS:
      state.loading = false;
      state.currentProfile = {...action.payload, birthday: action.payload.birthday ? format(parse(action.payload.birthday, 'yyyy-MM-dd', new Date()), 'MM/dd/yyyy') : null }
      break
    case ActionTypes.FETCH_PROFILE + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.loading = false;
      break
    case ActionTypes.CREATE_PROFILE:
      state.formError = ''
      state.isCompleted = false;
      state.formLoading = true;
      break
    case ActionTypes.CREATE_PROFILE + ApiActionTypes.SUCCESS:
      state.loading = false;
      state.formError = ''
      state.formIsSuccess = true
      state.formLoading = false
      break
    case ActionTypes.CREATE_PROFILE + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formLoading = false;
      break
    case ActionTypes.UPDATE_PROFILE:
      state.formError = ''
      state.isCompleted = false;
      state.formLoading = true;
      break
    case ActionTypes.UPDATE_PROFILE_AVATAR:
      state.avatarLoading = true;
      break;
    case ActionTypes.UPDATE_PROFILE_AVATAR + ApiActionTypes.FAIL:
      state.avatarLoading = false;
      state.avatarFormError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      break;
    case ActionTypes.UPDATE_PROFILE + ApiActionTypes.SUCCESS:
      state.formLoading = false;
      state.formError = ''
      state.formIsSuccess = true
      console.log("StateCurrentProfile", action.payload);
      state.currentProfile = {...state.currentProfile, ...action.payload}
      state.avatarLoading = false;
      break
    case ActionTypes.UPDATE_PROFILE + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formLoading = false;
      state.avatarLoading = false;
      break
    case ActionTypes.CHANGE_ROLE_SUCCESS:
      state.role = action.payload.role;
      break
    case ActionTypes.FORM_RESET:
      state.formError = null;
      state.formIsSuccess = false;
      state.formLoading = false;
      state.avatarLoading = false;
      break
  }

  return state
}
