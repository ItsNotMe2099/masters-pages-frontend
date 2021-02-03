import ApiActionTypes from "constants/api";
import { ITask } from "types";
import ActionTypes from "./const";

export interface TaskPageState {
  task: any
  loading: boolean
}

const initialState: TaskPageState = {
  loading: false,
  task: {}
}

export default function ProfileReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_TASK_BY_ID:
      state.loading = true;
      console.log("FETCH TASK!!!!!")
      break
    case ActionTypes.FETCH_TASK_BY_ID + ApiActionTypes.SUCCESS:
      state.task = action.payload
      state.loading = false;
      break
    case ActionTypes.FETCH_TASK_BY_ID + ApiActionTypes.FAIL:
      state.loading = false;
      break
}
return state
}
