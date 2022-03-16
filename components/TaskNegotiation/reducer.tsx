import ApiActionTypes from 'constants/api'
import { IChatMessage, ITask, ITaskNegotiation } from 'types'
import ActionTypes from './const'
import {IProfile} from 'data/intefaces/IProfile'
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
  currentProfile?: IProfile,
  formLoading: boolean,
  formError?: string
  sendOfferLoading: boolean,

}

const initialState: TaskOfferState = {
  taskResponseLoading: false,
  lastConditionLoading: false,
  lastCondition: null,
  actionLoading: false,
  editConditionsLoading: false,
  formLoading: false,
  sendOfferLoading: false
}

export default function TaskOfferReducer(state = {...initialState}, action) {

  switch(action.type) {
    case ActionTypes.TASK_NEGOTIATION_SET_CURRENT_TASK:
      state.currentTask = action.payload
      break
    case ActionTypes.TASK_NEGOTIATION_SET_CURRENT_PROFILE:
      state.currentProfile = action.payload
      break
    case ActionTypes.TASK_NEGOTIATION_SET_CURRENT_NEGOTIATION:
      state.currentTaskNegotiation = action.payload
      break
    case ActionTypes.TASK_NEGOTIATION_SET_CURRENT_MESSAGE:
      state.currentMessage = action.payload
      break
    case ActionTypes.TASK_NEGOTIATION_SEND_OFFER_LOADING:
      state.sendOfferLoading = action.payload
      break
    case ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE_REQUEST:
      state.taskResponseLoading = true
      break
    case ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE_REQUEST + ApiActionTypes.SUCCESS:
      state.taskResponseLoading = false
      break
    case ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE_REQUEST + ApiActionTypes.FAIL:
      state.taskResponseLoading = false
      break

    case ActionTypes.TASK_NEGOTIATION_EDIT_CONDITIONS_REQUEST + ApiActionTypes.SUCCESS:
      state.lastCondition = action.payload
      break
    case ActionTypes.TASK_NEGOTIATION_FINISH:
      state.formLoading = true
      break
    case ActionTypes.TASK_NEGOTIATION_FINISH + ApiActionTypes.SUCCESS:
      state.formLoading = false
      break
    case ActionTypes.TASK_NEGOTIATION_FINISH + ApiActionTypes.FAIL:
      state.formLoading = false
      state.formError = action.payload.error || action.payload.errors || 'Unknow error'
      break




    case ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_RESPONSE:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE:
    case ActionTypes.TASK_NEGOTIATION_MARK_AS_DONE:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_OFFER:
    case ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_OFFER:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_AS_COMPLETED:
    case ActionTypes.TASK_NEGOTIATION_HIRE_MASTER_REQUEST:
      state.actionLoading = true
      break
    case ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_RESPONSE_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.TASK_NEGOTIATION_MARK_AS_DONE_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_MARK_AS_DONE_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_CONDITIONS_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.TASK_NEGOTIATION_DECLINE_CONDITIONS_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.TASK_NEGOTIATION_HIRE_MASTER_REQUEST + ApiActionTypes.SUCCESS:
      state.actionLoading = false
      break
    case ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_RESPONSE_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.TASK_NEGOTIATION_MARK_AS_DONE_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_MARK_AS_DONE_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.TASK_NEGOTIATION_ACCEPT_CONDITIONS_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.TASK_NEGOTIATION_DECLINE_CONDITIONS_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.TASK_NEGOTIATION_HIRE_MASTER_REQUEST + ApiActionTypes.FAIL:
      state.actionLoading = false
      break

    case ActionTypes.TASK_NEGOTIATION_FETCH_LAST_CONDITIONS:
      state.lastConditionLoading = true
      break
    case ActionTypes.TASK_NEGOTIATION_FETCH_LAST_CONDITIONS + ApiActionTypes.SUCCESS:
      state.lastConditionLoading = false
      state.lastCondition = action.payload
      break
    case ActionTypes.TASK_NEGOTIATION_FETCH_LAST_CONDITIONS + ApiActionTypes.FAIL:
      state.lastConditionLoading = false
      break
    case ActionTypes.TASK_NEGOTIATION_RESET:
      state.actionLoading = false
      break




  }

   return {...state}
}
