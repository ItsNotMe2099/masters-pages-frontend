import ActionTypes from './const'

export interface AuthSignUpState {
  formIsSuccess: boolean
  formError: string,
  loading: boolean,
  phone: string,
}

const initialState: AuthSignUpState = {
  formIsSuccess: false,
  formError: '',
  loading: false,
  phone: ''
}

export default function loginSubmitReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.SIGN_UP_SUBMIT:
      state.phone = action.payload.phone
      state.loading = true
      break
    case ActionTypes.SIGN_UP_SUCCESS:
      state.formIsSuccess = true
      state.loading = false
      break

    case ActionTypes.SIGN_UP_ERROR:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error'
      state.loading = false
      break

    case ActionTypes.SIGN_UP_RESET:
      state.formIsSuccess = false
      state.formError = ''
      state.loading = false
      break
  }

  return state
}
