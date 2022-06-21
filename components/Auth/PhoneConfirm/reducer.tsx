
import ActionTypes from './const'
export interface PhoneConfirmState {
  formIsSuccess: boolean
  formError: string,
  loading: boolean,
  code?: string
}

const initialState: PhoneConfirmState = {
  formIsSuccess: false,
  formError: '',
  loading: false,
}

export default function loginSubmitReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.PHONE_CONFIRM_SET_CODE:
      state.code = action.payload
      break
    case ActionTypes.PHONE_CONFIRM_SUBMIT:
      state.formIsSuccess = false
      state.loading = true
      break
    case ActionTypes.PHONE_CONFIRM_SUCCESS:
      state.formIsSuccess = true
      state.loading = false
      break

    case ActionTypes.PHONE_CONFIRM_ERROR:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error'
      state.loading = false
      break

    case ActionTypes.PHONE_CONFIRM_RESET:
      state.formIsSuccess = false
      state.formError = ''
      state.loading = false
      break
  }

   return {...state}
}
