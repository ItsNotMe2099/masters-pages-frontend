
import ActionTypes from "./const";
export interface State {
  formIsSuccess: boolean
  formError: string
}

const initialState: State = {
  formIsSuccess: false,
  formError: ''
}

export default function loginSubmitReducer(state = {...initialState}, action) {

  switch(action.type) {

  }

  return state
}
