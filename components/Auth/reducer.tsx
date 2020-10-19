import ActionTypes from "./const";

export interface State {
  isSignInOpen: boolean
}

const initialState: State = {
  isSignInOpen: false
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
      state.isSignInOpen = true
      break
    
    case ActionTypes.SIGN_UP_CLOSE:
      state.isSignInOpen = false
      break
  }

  return state
}
