import ActionTypes from "./const";

export interface State {
  isSignInOpen: boolean
  isSignUpOpen: boolean
}

const initialState: State = {
  isSignInOpen: false,
  isSignUpOpen: false
}

export default function authReducer(state = {...initialState}, action) {

  switch(action.type) {

    case ActionTypes.SIGN_IN_OPEN:
      state.isSignInOpen = true
      break

    case ActionTypes.SIGN_IN_CLOSE:
      state.isSignInOpen = false
      break
    
    case ActionTypes.SIGN_UP_OPEN:
      state.isSignUpOpen = true
      break
    
    case ActionTypes.SIGN_UP_CLOSE:
      state.isSignUpOpen = false
      break
  }

  return state
}
