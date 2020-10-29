
import ActionTypes from "./const";
export interface PhoneConfirmState {
  formIsSuccess: boolean
  formError: string
}

const initialState: PhoneConfirmState = {
  formIsSuccess: false,
  formError: ''
}

export default function loginSubmitReducer(state = {...initialState}, action) {

  switch(action.type) {

  }

  return state
}
