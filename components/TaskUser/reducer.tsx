import ApiActionTypes from "constants/api";
import {ITask, ITaskStats, SkillData, SkillListItem} from "types";
import ActionTypes from "./const";

export interface TaskUserState {
  list: ITask[],
  listLoading: boolean,
  current: ITask,
  currentLoading: boolean,
  formUpdateLoading: boolean
  statLoading: boolean
  stats: ITaskStats
  total: number,
  page: number,
  filter: any,
  sort?: 'createdAt',
  sortOrder?: 'DESC',
  stat: any[]
}

const initialState: TaskUserState = {
  list: [],
  listLoading: false,
  current: null,
  currentLoading: false,
  formUpdateLoading: false,
  statLoading: false,
  stats: null,
  total: 0,
  page: 1,
  filter: {},
  stat: []
}

export default function TaskUserReducer(state = { ...initialState }, action) {
  switch (action.type) {
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
    case ActionTypes.TASK_USER_LIST_SET_SORT_ORDER:
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

    case ActionTypes.TASK_USER_DELETE_REQUEST + ApiActionTypes.SUCCESS:
      console.log("Delete success", action.payload);
      state.list = state.list.filter(item => item.id !== action.payload.id)
      break

    case ActionTypes.TASK_USER_UPDATE_REQUEST:
      state.formUpdateLoading = true;
      break
    case ActionTypes.TASK_USER_UPDATE_REQUEST + ApiActionTypes.SUCCESS:

      break
    case ActionTypes.TASK_USER_UPDATE_REQUEST + ApiActionTypes.FAIL:
      state.formUpdateLoading = false;
      break

    case ActionTypes.TASK_USER_FETCH_ONE_REQUEST + ApiActionTypes.SUCCESS:
      state.current = action.payload;
      state.formUpdateLoading = false;
      let removeItem = false;
      state.list = state.list.map(item => {
        if (item.id === action.payload.id) {
          console.log("replace task item")
          return action.payload;
        }
        return item;
      }).filter(item => {
        console.log("state.filter.status", state.filter.status, item.status)
        if (state.filter.status === 'in_progress' && item.id === action.payload.id && item.status !== 'in_progress') {
          removeItem = true;
          return false
        }
        return true;
      });
      if (removeItem) {
        state.total -= 1;
        state.stat = state.stat.map((i) => {
          if (i.task_status === 'in_progress') {
            i.count -= 1;
          }
          if (i.task_status === 'closed') {
            i.count += 1;
          }
          return i;
        })
      }
      break
    case ActionTypes.TASK_USER_FETCH_ONE_REQUEST + ApiActionTypes.FAIL:
      state.formUpdateLoading = false;

      break

    case ActionTypes.FETCH_TASK_USER_RESPONSES_LIST_REQUEST + ApiActionTypes.SUCCESS:
      const taskId = action.payload?.data?.length > 0 ? action.payload?.data[0].taskId : null;
      console.log("fetch Reponsed", taskId,)
      state.list = state.list.map((item) => {
        if (taskId && item.id === taskId) {
          console.log("AddResponses to Task", taskId, action.payload)
          return { ...item, responses: action.payload };
        }
        return { ...item };
      })
      break;

    case ActionTypes.TASK_RESPONSE_FETCH_REQUEST + ApiActionTypes.SUCCESS:
      state.list = state.list.map((item) => {
        if (item.id === action.payload.taskId) {
          console.log("sent_to_client", action.payload)
          return { ...item,
            responses: {
              ...item.responses,
              data: (item.responses?.data || []).map((response) => response.id == action.payload.id ? { ...response, ...action.payload } : response)
            }
          };
        }
        return item;
      })

      if (action.payload.state === 'accepted') {
        let removeItem = false;
        state.list = state.list.filter(item => {
          if (state.filter.status === 'published' && item.id === action.payload.taskId) {
            removeItem = true;
            return false
          }
          return true;
        })
        if (removeItem) {
          state.total -= 1;
          state.stat = state.stat.map((i) => {
            if (i.task_status === 'published') {
              i.count -= 1;
            }
            if (i.task_status === 'negotiation') {
              i.count += 1;
            }
            return i;
          })
        }
      }
      break

    case ActionTypes.TASK_USER_REMOVE_FROM_LIST:
      const isFind = state.list.find(item => item.id === action.payload.taskId)
      if(isFind) {
        state.list = state.list.filter(item => item.id !== action.payload.taskId);
        state.total -= 1;
        state.stat = state.stat.map((i) => {
          if (i.task_status === state.filter.status) {
            i.count -= 1;
          }
          return i;
        })
      }
      break;
    case ActionTypes.FETCH_TASK_STATS_BY_ID:
      state.statLoading = true;
      break
    case ActionTypes.FETCH_TASK_STATS_BY_ID + ApiActionTypes.SUCCESS:
      state.stats = action.payload
      state.statLoading = false;
      break
    case ActionTypes.FETCH_TASK_STATS_BY_ID + ApiActionTypes.FAIL:
      state.statLoading = false;
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
