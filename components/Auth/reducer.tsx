import ActionTypes from "./const";

export interface State {
  modalKey: string,
}

const initialState: State = {
  modalKey: ''
}

export default function authReducer(state = {...initialState}, action) {

  switch(action.type) {

    case ActionTypes.SIGN_IN_OPEN:
      state.modalKey = 'signIn'
      break

    case ActionTypes.MODAL_CLOSE:
      state.modalKey = ''
      break

    case ActionTypes.SIGN_UP_OPEN:
      state.modalKey = 'signUp'
      break

    case ActionTypes.PHONE_CONFIRM_OPEN:
      state.modalKey = 'phoneConfirm'
      break

    case ActionTypes.PASSWORD_RECOVERY_FIRST_STEP_OPEN:
      state.modalKey = 'pwRecFirst'
      break

    case ActionTypes.PASSWORD_RECOVERY_SUCCESS:
      state.modalKey = 'pwRecSuccess'
      break
  }

  return state
}
