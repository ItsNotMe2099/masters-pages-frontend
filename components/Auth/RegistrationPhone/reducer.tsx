import ActionTypes from "./const";
import ApiActionTypes from "../../../constants/api";

export interface RegistrationPhoneState {
  formIsSuccess: boolean,
  formError: string,
  formConfirmError?: string,
  confirmLoading: boolean
  code?: string
  loading: boolean,
  phone: string,
  cb?: (phone) => void
}

const initialState: RegistrationPhoneState = {
  formIsSuccess: false,
  formError: '',
  loading: false,
  confirmLoading: false,
  phone: ''
}

export default function registrationPhoneReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.REGISTRATION_PHONE_SUBMIT:
      state.formIsSuccess = false
      state.loading = true;
      state.phone = action.payload.phone
      break

    case ActionTypes.REGISTRATION_PHONE_SUBMIT_REQUEST + ApiActionTypes.SUCCESS:
      state.formIsSuccess = true
      state.loading = false;
      state.code = action.payload.code;
      break

    case ActionTypes.REGISTRATION_PHONE_SUBMIT_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error'
      state.loading = false;
      break

    case ActionTypes.REGISTRATION_PHONE_CHANGE:
      state.formIsSuccess = false
      state.loading = true;
      state.phone = action.payload.phone
      break

    case ActionTypes.REGISTRATION_PHONE_CHANGE_REQUEST + ApiActionTypes.SUCCESS:
      state.formIsSuccess = true
      state.loading = false;
      state.code = action.payload.code;
      break

    case ActionTypes.REGISTRATION_PHONE_CHANGE_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error'
      state.loading = false;
      break

    case ActionTypes.REGISTRATION_PHONE_RESET:
      state.formIsSuccess = false
      state.formError = ''
      state.formConfirmError = ''
      state.confirmLoading = false
      state.loading = false;
      state.phone = null;
      state.code = null;
      break
    case ActionTypes.REGISTRATION_PHONE_SET_CALLBACK:
      state.cb = action.payload;
      break
    case ActionTypes.REGISTRATION_PHONE_CHANGE_CONFIRM_REQUEST:
      state.formConfirmError = null
      state.confirmLoading = true;
      break

    case ActionTypes.REGISTRATION_PHONE_CHANGE_CONFIRM_REQUEST + ApiActionTypes.SUCCESS:
      state.confirmLoading = false;
      break

    case ActionTypes.REGISTRATION_PHONE_CHANGE_CONFIRM_REQUEST + ApiActionTypes.FAIL:
      state.formConfirmError = action.payload.error || action.payload.errors || 'Unknow error'
      state.confirmLoading = false;
      break
  }

  return state
}
