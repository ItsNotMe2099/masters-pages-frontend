import ApiActionTypes from "../../constants/api";
import ActionTypes from "./const";
import {IProfileSettings} from "../../types";

export interface ProfileSettingsState {
  loading: boolean
  formLoading: boolean,
  settings?: IProfileSettings,
  formError?: any
}

const initialState: ProfileSettingsState = {
  loading: false,
  formLoading: false
}

export default function ProfileSettingsReducer(state = {...initialState}, action) {
  switch (action.type) {

    case ActionTypes.FETCH_PROFILE_SETTINGS:
      state.loading = true;
      break
    case ActionTypes.FETCH_PROFILE_SETTINGS + ApiActionTypes.SUCCESS:
      state.loading = false;
      state.settings = action.payload
      break
    case ActionTypes.FETCH_PROFILE_SETTINGS + ApiActionTypes.FAIL:
      state.loading = false;
      break

    case ActionTypes.UPDATE_PROFILE_SETTINGS_REQUEST:
      state.formLoading = true;
      break
    case ActionTypes.UPDATE_PROFILE_SETTINGS_REQUEST + ApiActionTypes.SUCCESS:
      state.formLoading = false;
      break
    case ActionTypes.UPDATE_PROFILE_SETTINGS_REQUEST + ApiActionTypes.FAIL:
      state.formLoading = false;
      state.formError = action.payload.error
      break


  }

  return state
}
