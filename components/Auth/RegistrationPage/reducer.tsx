import ActionTypes from "./const";

export interface RegistrationCompleteState {
  formIsSuccess: boolean
  formError: string,
  loading: boolean,
  phone: string,
  modalKey: string
}

const initialState: RegistrationCompleteState = {
  formIsSuccess: false,
  formError: '',
  loading: false,
  phone: '',
  modalKey: ''
}

export default function loginSubmitReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.REGISTRATION_COMPLETE_SUBMIT:
      state.formIsSuccess = false
      state.loading = true;
      break
    case ActionTypes.REGISTRATION_COMPLETE_SUCCESS:
      state.formIsSuccess = true
      state.loading = false;
      break

    case ActionTypes.REGISTRATION_COMPLETE_ERROR:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.loading = false;
      break

    case ActionTypes.REGISTRATION_COMPLETE_RESET:
      state.formIsSuccess = false
      state.formError = ''
      state.loading = false;
      break
  }

  return state
}
