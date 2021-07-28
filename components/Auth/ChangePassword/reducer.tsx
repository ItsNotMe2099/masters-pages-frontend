import ApiActionTypes from "constants/api";
import ActionTypes from "./const";

export interface ChangePasswordState {
  formIsSuccess: boolean,
  formError: string,
  loading: boolean,
}

const initialState: ChangePasswordState = {
  formIsSuccess: false,
  formError: '',
  loading: false,
}

export default function changePasswordSubmitReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.CHANGE_PASSWORD:
      state.formIsSuccess = false
      state.loading = true;
      state.formError = null;
      break
    case ActionTypes.CHANGE_PASSWORD_SUCCESS:
      state.formIsSuccess = true
      state.loading = false;
      state.formError = null;
      break
    case ActionTypes.CHANGE_PASSWORD_ERROR:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error'
      state.loading = false;
      break
    case ActionTypes.CHANGE_PASSWORD_RESET:
      state.formIsSuccess = false
      state.loading = false;
      state.formError = null;
      break;
  }

  return state
}
