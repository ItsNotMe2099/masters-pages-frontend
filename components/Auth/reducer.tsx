import ActionTypes from "./const";

export interface State {
  isSignInOpen: boolean
  isSignUpOpen: boolean,
  isPhoneConfirmOpen: boolean
}

const initialState: State = {
  isSignInOpen: false,
  isSignUpOpen: false,
  isPhoneConfirmOpen: false
}

export default function authReducer(state = {...initialState}, action) {

  switch(action.type) {

    case ActionTypes.SIGN_IN_OPEN:
      state.isSignInOpen = true
      state.isSignUpOpen = false
      break

    case ActionTypes.SIGN_IN_CLOSE:
      state.isSignInOpen = false
      break

    case ActionTypes.SIGN_UP_OPEN:
      state.isSignUpOpen = true
      state.isSignInOpen = false
      break

    case ActionTypes.SIGN_UP_CLOSE:
      state.isSignUpOpen = false
      break
    case ActionTypes.PHONE_CONFIRM_OPEN:
      state.isPhoneConfirmOpen = true
      state.isSignInOpen = false
      state.isSignUpOpen = false
      break

    case ActionTypes.PHONE_CONFIRM_CLOSE:
      state.isPhoneConfirmOpen = false
      break
  }

  return state
}
