import ApiActionTypes from 'constants/api'
import { IChatMessage, ITask, ITaskNegotiation } from 'types'
import ActionTypes from './const'
import { action } from 'typesafe-actions'
import {IProfile} from 'data/intefaces/IProfile'
const queryString = require('query-string')
export const taskNegotiationSetCurrentTask = (task: ITask) => action(ActionTypes.TASK_NEGOTIATION_SET_CURRENT_TASK, task)
export const taskNegotiationSetCurrentProfile = (profile: IProfile) => action(ActionTypes.TASK_NEGOTIATION_SET_CURRENT_PROFILE, profile)
export const taskNegotiationSetCurrentMessage = (message: IChatMessage) => action(ActionTypes.TASK_NEGOTIATION_SET_CURRENT_MESSAGE, message)
export const taskNegotiationSetCurrentNegotiation = (task: ITaskNegotiation) => action(ActionTypes.TASK_NEGOTIATION_SET_CURRENT_NEGOTIATION, task)
export const taskNegotiationCreateTaskResponse = (taskId: number, data?: any) => action(ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE, {taskId, data})
export const taskNegotiationCreateTaskResponseRequest = (taskId: number, data: any) => action(ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE_REQUEST, {
  api: {
    url: '/api/task-negotiation/task-response',
    method: 'POST',
    data: {taskId, ...data}
  }
})


export const taskNegotiationDeclineTaskResponse = (taskId: number,taskNegotiationId: number) => action(ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_RESPONSE, {id: taskNegotiationId, taskId})
export const taskNegotiationDeclineTaskResponseRequest = (taskNegotiationId: number) => action(ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_RESPONSE_REQUEST, {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/decline-task-response`,
    method: 'POST',
  }
})

export const taskNegotiationAcceptTaskResponse = (response: ITaskNegotiation) => action(ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE, {response})
export const taskNegotiationAcceptTaskResponseRequest = (taskNegotiationId: number) => action(ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE_REQUEST, {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/accept-task-response`,
    method: 'POST',
  }
})


export const taskNegotiationMarkAsDone = (taskId: number) => action(ActionTypes.TASK_NEGOTIATION_MARK_AS_DONE, {taskId})
export const taskNegotiationMarkAsDoneRequest = (taskId: number) => action(ActionTypes.TASK_NEGOTIATION_MARK_AS_DONE_REQUEST, {
  api: {
    url: `/api/task-negotiation/${taskId}/mark-as-done`,
    method: 'POST',
  }
})

export const taskNegotiationAcceptMarkTaskAsDone = (taskNegotiationId: number) => action(ActionTypes.TASK_NEGOTIATION_ACCEPT_MARK_AS_DONE_REQUEST, {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/accept-mark-as-done`,
    method: 'GET',
  }
})
export const  taskNegotiationEditConditions = (taskNegotiationId: number, data) => action(ActionTypes.TASK_NEGOTIATION_EDIT_CONDITIONS, {taskNegotiationId, data})
export const  taskNegotiationEditConditionsRequest = (taskNegotiationId: number, data) => action(ActionTypes.TASK_NEGOTIATION_EDIT_CONDITIONS_REQUEST, {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/edit-conditions`,
    method: 'POST',
    data,
  }
})
export const  taskNegotiationAcceptConditions = (taskNegotiationId: number, messageId?: number) => action(ActionTypes.TASK_NEGOTIATION_ACCEPT_CONDITIONS, {taskNegotiationId, messageId})
export const  taskNegotiationAcceptConditionsRequest = (taskNegotiationId: number) => action(ActionTypes.TASK_NEGOTIATION_ACCEPT_CONDITIONS_REQUEST, {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/accept-conditions`,
    method: 'GET',
  }
})
export const  taskNegotiationDeclineConditions = (taskNegotiationId: number, messageId?: number) => action(ActionTypes.TASK_NEGOTIATION_DECLINE_CONDITIONS, {taskNegotiationId, messageId})
export const  taskNegotiationDeclineConditionsRequest = (taskNegotiationId: number) => action(ActionTypes.TASK_NEGOTIATION_DECLINE_CONDITIONS_REQUEST, {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/decline-conditions`,
    method: 'GET',
  }
})
export const taskNegotiationAcceptTaskOffer = (taskNegotiation: ITaskNegotiation) => action(ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_OFFER, {taskNegotiation})
export const taskNegotiationAcceptTaskOfferRequest = (taskNegotiationId: number) => action(ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_OFFER_REQUEST, {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/accept-task-offer`,
    method: 'GET',
  }
})
export const taskNegotiationDeclineTaskOffer = (taskNegotiation: ITaskNegotiation) => action(ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_OFFER, {taskNegotiation})
export const taskNegotiationDeclineTaskOfferRequest = (taskNegotiationId: number) => action(ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_OFFER_REQUEST,    {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/decline-task-offer`,
    method: 'GET',
  }
})
export const  taskNegotiationFinish = (taskId: number, feedback: any) => action(ActionTypes.TASK_NEGOTIATION_FINISH,{taskId, feedback})

export const  taskNegotiationFinishFailed = (error: any) => action(ActionTypes.TASK_NEGOTIATION_FINISH + ApiActionTypes.FAIL,{error})
export const  taskNegotiationFinishSuccess = () => action(ActionTypes.TASK_NEGOTIATION_FINISH + ApiActionTypes.SUCCESS,{})
export const  taskNegotiationAcceptAsCompleted = (taskNegotiationId: number) => action(ActionTypes.TASK_NEGOTIATION_ACCEPT_AS_COMPLETED, {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/accept-as-completed`,
    method: 'GET',
  }
})


export const  taskNegotiationHireMaster = (taskId: number, profileId: number, taskNegotiationId: number) => action(ActionTypes.TASK_NEGOTIATION_HIRE_MASTER, {
 taskId, profileId, taskNegotiationId
})
export const  taskNegotiationHireMasterRequest = (taskId: number, profileId: number) => action(ActionTypes.TASK_NEGOTIATION_HIRE_MASTER_REQUEST, {
  api: {
    url: '/api/task-negotiation/hire-master',
    method: 'POST',
    data: {
      taskId,
      profileId
    }
  }
})


export const taskNegotiationFetchLastConditions = (taskId: number, profileId: number = null) => action(ActionTypes.TASK_NEGOTIATION_FETCH_LAST_CONDITIONS, {
  api: {
    url: `/api/task-negotiation/${taskId}/last-conditions?profileId=${profileId}`,
    method: 'GET',
  }
})
export const taskNegotiationSendOffer= (taskId: number, profileId: number) => action(ActionTypes.TASK_NEGOTIATION_SEND_OFFER, {
  taskId,
  profileId,
})
export const taskNegotiationSendOfferCreateTask = (task: any, profileId: number) => action(ActionTypes.TASK_NEGOTIATION_SEND_OFFER_CREATE_TASK, {task, profileId})
export const taskNegotiationSendOfferSetLoading = (isLoading: boolean) => action(ActionTypes.TASK_NEGOTIATION_SEND_OFFER_LOADING, isLoading)
export const taskNegotiationSendOfferRequest = (taskId: number, profileId: number) => action(ActionTypes.TASK_NEGOTIATION_SEND_OFFER_REQUEST, {
  api: {
    url: '/api/task-negotiation/task-offer',
    method: 'POST',
    data: {
      taskId,
      profileId,
    }
  }
})
export const taskNegotiationReset = () => action(ActionTypes.TASK_NEGOTIATION_RESET)

