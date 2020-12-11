import ApiActionTypes from "constants/api";
import { ITask, SkillData, SkillListItem } from "types";
import ActionTypes from "./const";
export interface TaskSearchState {
  list: ITask[],
  listLoading: boolean,
  total: number,
  page: number,
  filter: any,
  sort?: string,
  sortOrder?: string
}

const initialState: TaskSearchState = {
  list: [],
  listLoading: false,
  total: 0,
  page: 1,
  filter: {},
}

export default function TaskSearchReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_TASK_LIST:

      break
    case ActionTypes.TASK_LIST_SET_PAGE:
      state.page = action.payload
      break
    case ActionTypes.TASK_LIST_SET_FILTER:
      state.filter = action.payload;
      break
    case ActionTypes.TASK_LIST_SET_SORT:
        state.sort = action.payload;
      break
    case ActionTypes.FETCH_TASK_LIST_REQUEST:
      state.listLoading = true;
      break
    case ActionTypes.FETCH_TASK_LIST_REQUEST + ApiActionTypes.SUCCESS:
      state.listLoading = false;
      state.list = [...state.list, ...action.payload.data]
      state.total = action.payload.total
      break
    case ActionTypes.FETCH_TASK_LIST_REQUEST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break
    case ActionTypes.RESET_TASK_LIST:
      state.listLoading = false;
      state.list = []
      state.total = 0
      state.page = 1
      break
  }

  return state
}
