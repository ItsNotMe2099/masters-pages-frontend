import ActionTypes from "./const";

export interface SignInState {
  formIsSuccess: boolean
  formError: string,
  phone: string,
}

const initialState: SignInState = {
  formIsSuccess: false,
  formError: '',
  phone: ''
}

export default function loginSubmitReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.SIGN_IN_SUCCESS:
      state.formIsSuccess = true
      break

    case ActionTypes.SIGN_IN_ERROR:
      state.formError = action.payload
      break

    case ActionTypes.SIGN_IN_RESET:
      state.formIsSuccess = false
      state.formError = ''
      break
  }

  return state
}
