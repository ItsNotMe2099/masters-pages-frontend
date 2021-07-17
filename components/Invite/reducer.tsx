import ApiActionTypes from "constants/api";

import ActionTypes from "./const";
import {format} from 'date-fns'

export interface InviteState {
  formIsSuccess: boolean
  formError: string,
  formLoading: boolean,
}

const initialState: InviteState = {
  formIsSuccess: false,
  formError: '',
  formLoading: false,
}

export default function InviteReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.INVITE_RESET:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = false;

      break
    case ActionTypes.INVITE_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.INVITE_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      break
    case ActionTypes.INVITE_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
  }

  return state
}
