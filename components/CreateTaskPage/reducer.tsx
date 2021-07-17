import ActionTypes from "./const";

export interface CreateTaskCompleteState {
  formIsSuccess: boolean
  formError: string,
  loading: boolean,
  isCompleted: boolean
}

const initialState: CreateTaskCompleteState = {
  formIsSuccess: false,
  formError: '',
  loading: false,
  isCompleted: false
}

export default function CreateTaskReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.CREATE_TASK:
      state.formError = ''
      state.formIsSuccess = false
      state.isCompleted = false;
      state.loading = true;
      break

    case ActionTypes.CREATE_TASK_ERROR:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error'
      state.loading = false;
      break
    case ActionTypes.CREATE_TASK_SUCCESS:
      state.formIsSuccess = true
      state.isCompleted = true;
      state.loading = false;
      break

    case ActionTypes.CREATE_TASK_RESET:
      state.formIsSuccess = false
      state.formError = ''
      state.loading = false;
      break
  }

  return state
}
