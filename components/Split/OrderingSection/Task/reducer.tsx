import ApiActionTypes from "constants/api";
import { ITask } from "types";
import ActionTypes from "./const";

export interface TaskSearchWithLimitState {
  task: ITask[]
  loading: boolean
}

const initialState: TaskSearchWithLimitState = {
  loading: false,
  task: null
}

export default function ProfileReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_TASK_LIST_LIMIT_REQUEST:
      state.loading = true;
      break
    case ActionTypes.FETCH_TASK_LIST_LIMIT_REQUEST + ApiActionTypes.SUCCESS:
      state.task = action.payload.data
      state.loading = false;
      break
    case ActionTypes.FETCH_TASK_LIST_LIMIT_REQUEST + ApiActionTypes.FAIL:
      state.loading = false;
      break
}
return state
}
