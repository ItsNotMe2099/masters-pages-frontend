import { setSortTaskSearch } from "components/TaskSearch/actions";
import ApiActionTypes from "constants/api";
import { ITask, SkillData, SkillListItem } from "types";
import ActionTypes from "./const";

export interface TaskSearchState {
  list: ITask[],
  listLoading: boolean,
  currentTask?: ITask,
  total: number,
  page: number,
  filter: any,
  useLocationFilter: boolean,
  exactLocation: boolean
  sortType: string,
  sort: string,
  sortOrder?: string
}

const initialState: TaskSearchState = {
  list: [],
  listLoading: false,
  total: 0,
  page: 1,
  filter: {},
  sortType: '',
  sort: 'id',
  sortOrder: 'DESC',
  useLocationFilter: false,
  exactLocation: false
}

export default function TaskSearchReducer(state = { ...initialState }, action) {
  switch (action.type) {
    case ActionTypes.TASK_LIST_SET_CURRENT_TASK:
      state.currentTask = action.payload;
      break
    case ActionTypes.FETCH_TASK_LIST:

      break
    case ActionTypes.TASK_LIST_SET_PAGE:
      state.page = action.payload
      break
    case ActionTypes.TASK_LIST_SET_FILTER:
      state.filter = action.payload;
      break
    case ActionTypes.TASK_LIST_SET_SORT:
      state.sortType = action.payload;
      switch (action.payload) {
        case 'newFirst':
          state.sort = 'id'
          state.sortOrder = 'DESC'

          break;
        case 'highPrice':
          state.sort = 'budget'
          state.sortOrder = 'DESC'

          break;
        case 'lowPrice':
          state.sort = 'budget'
          state.sortOrder = 'ASC'
          break;
      }
      break
    case ActionTypes.TASK_LIST_SET_USE_LOCATION_FILTER:
      console.log("TASK_LIST_SET_USE_LOCATION_FILTER", action.payload)
      state.useLocationFilter = action.payload.useFilter;
      state.exactLocation = action.payload.exactLocation;
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
