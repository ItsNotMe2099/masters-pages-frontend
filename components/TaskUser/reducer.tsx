import ApiActionTypes from "constants/api";
import { ITask, SkillData, SkillListItem } from "types";
import ActionTypes from "./const";
export interface TaskUserState {
  list: ITask[],
  listLoading: boolean,
  total: number,
  page: number,
  filter: any,
  sort?: string,
  sortOrder?: string,
  stat: any[]
}

const initialState: TaskUserState = {
  list: [],
  listLoading: false,
  total: 0,
  page: 1,
  filter: {},
  stat: []
}

export default function TaskUserReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_TASK_USER_STAT + ApiActionTypes.SUCCESS:
      state.stat = action.payload
      break
    case ActionTypes.FETCH_TASK_USER_LIST:

      break
    case ActionTypes.TASK_USER_LIST_SET_PAGE:
      state.page = action.payload
      break
    case ActionTypes.TASK_USER_LIST_SET_FILTER:
      state.filter = action.payload;
      break
    case ActionTypes.TASK_USER_LIST_SET_SORT:
        state.sort = action.payload;
      break
    case ActionTypes.FETCH_TASK_USER_LIST_REQUEST:
      state.listLoading = true;
      break
    case ActionTypes.FETCH_TASK_USER_LIST_REQUEST + ApiActionTypes.SUCCESS:
      state.listLoading = false;
      state.list = [...state.list, ...action.payload.data]
      state.total = action.payload.total
      break
    case ActionTypes.FETCH_TASK_USER_LIST_REQUEST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break
    case ActionTypes.RESET_TASK_USER_LIST:
      state.listLoading = false;
      state.list = []
      state.total = 0
      state.page = 1
      break
  }

  return state
}
