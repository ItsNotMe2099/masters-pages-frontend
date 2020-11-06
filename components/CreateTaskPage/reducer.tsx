import ActionTypes from "./const";

export interface CreateTaskCompleteState {
  formIsSuccess: boolean
  formError: string
}

const initialState: CreateTaskCompleteState = {
  formIsSuccess: false,
  formError: ''
}

export default function CreateTaskReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.CREATE_TASK_SUCCESS:
      state.formIsSuccess = true
      break

    case ActionTypes.CREATE_TASK_ERROR:
      state.formError = action.payload
      break

    case ActionTypes.CREATE_TASK_RESET:
      state.formIsSuccess = false
      state.formError = ''
      break
  }

  return state
}
