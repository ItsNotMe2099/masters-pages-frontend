import ActionTypes from "./const";

export interface AuthSignUpState {
  formIsSuccess: boolean
  formError: string,
  phone: string,
}

const initialState: AuthSignUpState = {
  formIsSuccess: false,
  formError: '',
  phone: ''
}

export default function loginSubmitReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.SIGN_UP_SUBMIT:
      state.phone = action.payload.phone
      break
    case ActionTypes.SIGN_UP_SUCCESS:
      state.formIsSuccess = true
      break

    case ActionTypes.SIGN_UP_ERROR:
      state.formError = action.payload
      break

    case ActionTypes.SIGN_UP_RESET:
      state.formIsSuccess = false
      state.formError = ''
      break
  }

  return state
}
