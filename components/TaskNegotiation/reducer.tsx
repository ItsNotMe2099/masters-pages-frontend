import ApiActionTypes from "constants/api";
import { IChatMessage, ITask, ITaskNegotiation, SkillData, SkillListItem } from "types";
import ActionTypes from "./const";
export interface TaskOfferState {
  taskResponseLoading: boolean
  lastConditionLoading: boolean,
  lastCondition: ITaskNegotiation,
  currentTaskNegotiation?: ITaskNegotiation,
  currentMessage?: IChatMessage,
  actionLoading: boolean,
  editConditionsLoading: boolean,
  editConditionsError?: string,
  currentTask?: ITask,
  formLoading: boolean,
  formError?: string

}

const initialState: TaskOfferState = {
  taskResponseLoading: false,
  lastConditionLoading: false,
  lastCondition: null,
  actionLoading: false,
  editConditionsLoading: false,
  formLoading: false
}

export default function TaskOfferReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.TASK_NEGOTIATION_SET_CURRENT_TASK:
      console.log("TASK_OFFER_SET_CURRENT_TASK", action.payload)
      state.currentTask = action.payload;
      break
    case ActionTypes.TASK_NEGOTIATION_SET_CURRENT_NEGOTIATION:
      console.log("TASK_OFFER_SET_CURRENT_TASK", action.payload)
      state.currentTaskNegotiation = action.payload;
      break
    case ActionTypes.TASK_NEGOTIATION_SET_CURRENT_MESSAGE:
      console.log("TASK_NEGOTIATION_SET_CURRENT_MESSAGE", action.payload)
      state.currentMessage = action.payload;
      break;
    case ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE_REQUEST:
      state.taskResponseLoading = true;
      break
    case ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE_REQUEST + ApiActionTypes.SUCCESS:
      state.taskResponseLoading = false;
      break
    case ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE_REQUEST + ApiActionTypes.FAIL:
      state.taskResponseLoading = false;
      break

    case ActionTypes.TASK_NEGOTIATION_EDIT_CONDITIONS_REQUEST + ApiActionTypes.SUCCESS:
      state.lastCondition = action.payload;
      break
    case ActionTypes.TASK_NEGOTIATION_FINISH:
      console.log("TASK_NEGOTIATION_FINISH LOADING");
      state.formLoading = true;
      break
    case ActionTypes.TASK_NEGOTIATION_FINISH + ApiActionTypes.SUCCESS:
      state.formLoading = false;
      break
    case ActionTypes.TASK_NEGOTIATION_FINISH + ApiActionTypes.FAIL:
      state.formLoading = false;
      state.formError = action.payload.error;
      break




    case ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_RESPONSE:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE:
    case ActionTypes.TASK_NEGOTIATION_MARK_AS_DONE:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_OFFER:
    case ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_OFFER:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_AS_COMPLETED:
    case ActionTypes.TASK_NEGOTIATION_HIRE_MASTER_REQUEST:
      state.actionLoading = true;
      break
    case ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_RESPONSE_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.TASK_NEGOTIATION_MARK_AS_DONE_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_MARK_AS_DONE_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_CONDITIONS_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.TASK_NEGOTIATION_DECLINE_CONDITIONS_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.TASK_NEGOTIATION_HIRE_MASTER_REQUEST + ApiActionTypes.SUCCESS:
      state.actionLoading = false;
      break
    case ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_RESPONSE_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.TASK_NEGOTIATION_MARK_AS_DONE_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_MARK_AS_DONE_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_CONDITIONS_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.TASK_NEGOTIATION_DECLINE_CONDITIONS_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.TASK_NEGOTIATION_HIRE_MASTER_REQUEST + ApiActionTypes.FAIL:
      state.actionLoading = false;
      break

    case ActionTypes.TASK_NEGOTIATION_FETCH_LAST_CONDITIONS:
      state.lastConditionLoading = true;
      break
    case ActionTypes.TASK_NEGOTIATION_FETCH_LAST_CONDITIONS + ApiActionTypes.SUCCESS:
      state.lastConditionLoading = false;
      state.lastCondition = action.payload;
      break
    case ActionTypes.TASK_NEGOTIATION_FETCH_LAST_CONDITIONS + ApiActionTypes.FAIL:
      state.lastConditionLoading = false;
      break




  }

  return state
}
