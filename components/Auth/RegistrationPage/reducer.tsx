import ActionTypes from "./const";

export interface RegistrationCompleteState {
  formIsSuccess: boolean
  formError: string,
  phone: string,
}

const initialState: RegistrationCompleteState = {
  formIsSuccess: false,
  formError: '',
  phone: ''
}

export default function loginSubmitReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.REGISTRATION_COMPLETE_SUCCESS:
      state.formIsSuccess = true
      break

    case ActionTypes.REGISTRATION_COMPLETE_ERROR:
      state.formError = action.payload
      break

    case ActionTypes.REGISTRATION_COMPLETE_RESET:
      state.formIsSuccess = false
      state.formError = ''
      break
  }

  return state
}
