import ApiActionTypes from "constants/api";
import ActionTypes from "./const";
import cookie from "js-cookie";
import {parse, format} from 'date-fns'
export interface ProfileState {
  currentProfile: any
  formIsSuccess: boolean
  formError: string,
  loading: boolean,
  formLoading: boolean,
  isCompleted: boolean,
  role: string,
}

const initialState: ProfileState = {
  formIsSuccess: false,
  formError: '',
  formLoading: false,
  loading: false,
  isCompleted: false,
  role: null,
  currentProfile: {
    photo: null,
  }
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
      console.log("ProfileFetched", action.payload);
      state.currentProfile = {...action.payload, birthday: action.payload.birthday ? format(parse(action.payload.birthday, 'yyyy-MM-dd', new Date()), 'MM/dd/yyyy') : null }
      break
    case ActionTypes.FETCH_PROFILE + ApiActionTypes.FAIL:
      state.formError = action.payload.error || 'Unknown error'
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
      state.formError = action.payload.error || 'Unknown error'
      state.formLoading = false;
      break
    case ActionTypes.UPDATE_PROFILE:
      state.formError = ''
      state.isCompleted = false;
      state.formLoading = true;
      break
    case ActionTypes.UPDATE_PROFILE + ApiActionTypes.SUCCESS:
      state.formLoading = false;
      state.formError = ''
      state.formIsSuccess = true
      break
    case ActionTypes.UPDATE_PROFILE + ApiActionTypes.FAIL:
      state.formError = action.payload.error || 'Unknown error'
      state.formLoading = false;
      break
    case ActionTypes.CHANGE_ROLE_SUCCESS:
      state.role = action.payload.role;
      break
  }

  return state
}
