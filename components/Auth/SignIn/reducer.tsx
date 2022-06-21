import ActionTypes from './const'

export interface SignInState {
  formIsSuccess: boolean,
  formError: string,
  loading: boolean,
  phone: string,
}

const initialState: SignInState = {
  formIsSuccess: false,
  formError: '',
  loading: false,
  phone: ''
}

export default function loginSubmitReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.SIGN_IN_SUBMIT:
      state.formIsSuccess = false
      state.loading = true
      break
    case ActionTypes.SIGN_IN_SUCCESS:
      state.formIsSuccess = true
      state.loading = false
      break

    case ActionTypes.SIGN_IN_ERROR:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error'
      state.loading = false
      break

    case ActionTypes.SIGN_IN_RESET:
      state.formIsSuccess = false
      state.formError = ''
      state.loading = false
      break
  }

   return {...state}
}
