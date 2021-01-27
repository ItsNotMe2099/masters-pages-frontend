import ApiActionTypes from "constants/api";
import { ITask, SkillData, SkillListItem } from "types";
import ActionTypes from "./const";
export interface TaskUserState {
  list: ITask[],
  listLoading: boolean,
  formUpdateLoading: boolean
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
  formUpdateLoading: false,
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
      state.formUpdateLoading = false;

      console.log("state filter", state.filter)
      state.list = state.list.map(item => {
        if(item.id === action.payload.id){
          console.log("replace task item")
          return action.payload;
        }
        return item;
      }).filter(item => !state.filter?.status || item.status === state.filter.status)
      break
    case ActionTypes.TASK_USER_FETCH_ONE_REQUEST + ApiActionTypes.FAIL:
      state.formUpdateLoading = false;

      break

    case ActionTypes.FETCH_TASK_USER_RESPONSES_LIST_REQUEST + ApiActionTypes.SUCCESS:
      const taskId = action.payload?.data?.length > 0 ? action.payload?.data[0].taskId : null;
      console.log("fetch Reponsed", taskId, )
      state.list = state.list.map((item) => {
        if(taskId && item.id === taskId){
          console.log("AddResponses to Task", taskId, action.payload)
          return {...item, responses: action.payload};
        }
        return {...item};
      })
      break;

    case ActionTypes.TASK_RESPONSE_FETCH_REQUEST + ApiActionTypes.SUCCESS:

      console.log("state filter", state.filter)
      console.log("sent_to_client", action.payload)
      state.list = state.list.map((item) => {
        if( item.id === action.payload.taskId){
          console.log("sent_to_client", action.payload)
          return {...item, responses: {...item.responses, data: (item.responses?.data || []).map((response) => response.id == action.payload.id ? {...response, ...action.payload} : response)}};
        }
        return item;
      })

      state.list = state.list.map(item => {
        if(item.id === action.payload.id){
          console.log("replace task item")
          return action.payload;
        }
        return item;
      }).filter(item => !state.filter?.status || item.status === state.filter.status)
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
