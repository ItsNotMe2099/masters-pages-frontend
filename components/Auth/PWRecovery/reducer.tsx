import ActionTypes from "./const";

export interface PWRecoveryState {
  formIsSuccess: boolean
  phone: string,
  code: string,
  isOpen: boolean,
  isOpenSuccess: boolean,
  password: string
}

const initialState: PWRecoveryState = {
  formIsSuccess: false,
  phone: '',
  code: '',
  isOpen: false,
  isOpenSuccess: false,
  password: ''
}

export default function loginSubmitReducer(state = {...initialState}, action) {

  switch(action.type) {

    case ActionTypes.RESET_PW_FIRST_STEP_SUBMIT:
      state.phone = action.payload.phone
      console.log('RESET_PW_FIRST_STEP_SUBMIT')
      break

    case ActionTypes.RESET_PW_FIRST_STEP_SUCCESS:
      state.formIsSuccess = true
      console.log('RESET_PW_FIRST_STEP_SUCCESS')
      break

    case ActionTypes.RESET_PW_SECOND_STEP_SUBMIT:
      state.code = action.payload.code
      console.log('RESET_PW_SECOND_STEP_SUBMIT')
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
      break
  
    case ActionTypes.RESET_PW_FINAL_STEP_SUBMIT:
      state.password = action.payload.password
      break
  }

  return state
}
