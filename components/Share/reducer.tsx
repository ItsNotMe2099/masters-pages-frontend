import ApiActionTypes from 'constants/api'

import ActionTypes from './const'

export interface ShareState {
  formIsSuccess: boolean
  formError: string,
  formLoading: boolean,
}

const initialState: ShareState = {
  formIsSuccess: false,
  formError: '',
  formLoading: false,
}

export default function ShareReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.SHARE_BY_EMAIL_RESET:
      state.formError = ''
      state.formIsSuccess = false
      state.formLoading = false

      break
    case ActionTypes.SHARE_BY_EMAIL_REQUEST:
      state.formError = ''
      state.formIsSuccess = false
      state.formLoading = true
      break
    case ActionTypes.SHARE_BY_EMAIL_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true
      state.formLoading = false
      break
    case ActionTypes.SHARE_BY_EMAIL_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false
      state.formLoading = false
      break
  }

   return {...state}
}
