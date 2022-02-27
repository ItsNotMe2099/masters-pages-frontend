import ActionTypes from './const'

export interface PWRecoveryState {
  formIsSuccess: boolean
  phone: string,
  code: string,
  codeSet?: string,
  isOpen: boolean,
  isOpenSuccess: boolean,
  password: string,
  loading: boolean,
  formError?: string | string[]
}

const initialState: PWRecoveryState = {
  formIsSuccess: false,
  phone: '',
  code: '',
  isOpen: false,
  isOpenSuccess: false,
  password: '',
  loading: false,
}

export default function loginSubmitReducer(state = {...initialState}, action) {

  switch(action.type) {

    case ActionTypes.RESET_PW_FIRST_STEP_SUBMIT:
      state.phone = action.payload.phone
      state.loading = true
      state.formError = null
      break
    case ActionTypes.RESET_PW_FIRST_STEP_SUCCESS:
      state.formIsSuccess = true
      state.loading = false
      break
    case ActionTypes.RESET_PW_FIRST_STEP_ERROR:
      state.loading = false
      state.formError = action.payload.error || action.payload.errors || 'Unknow error'
      break
    case ActionTypes.RESET_PW_SET_CODE:
      state.codeSet = action.payload
      break
    case ActionTypes.RESET_PW_SECOND_STEP_SUBMIT:
      state.code = action.payload.code
      state.loading = true
      state.formError = null
      break
    case ActionTypes.RESET_PW_SECOND_STEP_SUCCESS:
      state.formIsSuccess = true
      state.loading = false
      break
    case ActionTypes.RESET_PW_SECOND_STEP_ERROR:
      state.loading = false
      state.formError = action.payload.error || action.payload.errors || 'Unknow error'
      break

    case ActionTypes.RESET_PW_IS_OPEN:
      state.isOpen = true
      break

    case ActionTypes.RESET_PW_IS_OPEN_SUCCESS:
      state.isOpenSuccess = true
      break

    case ActionTypes.RESET_PW_RESET:
      state.formIsSuccess = false,
      state.code = '',
      state.phone = '',
      state.isOpen = false,
      state.isOpenSuccess = false
      state.loading = false
      break

    case ActionTypes.RESET_PW_FINAL_STEP_SUBMIT:
      state.password = action.payload.password
      state.loading = true
      state.formError = null
      break
    case ActionTypes.RESET_PW_FINAL_STEP_SUCCESS:
      state.formIsSuccess = true
      state.loading = false
      break
    case ActionTypes.RESET_PW_FINAL_STEP_ERROR:
      state.loading = false
      state.formError = action.payload.error || action.payload.errors || 'Unknow error'
      break
  }

  return state
}
