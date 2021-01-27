import { IChatMessage, ITask, ITaskNegotiation } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')
export const taskNegotiationSetCurrentTask = (task: ITask) => action(ActionTypes.TASK_NEGOTIATION_SET_CURRENT_TASK, task)
export const taskNegotiationSetCurrentMessage = (message: IChatMessage) => action(ActionTypes.TASK_NEGOTIATION_SET_CURRENT_MESSAGE, message)
export const taskNegotiationSetCurrentNegotiation = (task: ITaskNegotiation) => action(ActionTypes.TASK_NEGOTIATION_SET_CURRENT_NEGOTIATION, task)
export const taskNegotiationCreateTaskResponse = (taskId: number, data: any) => action(ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE, {taskId, data})
export const taskNegotiationCreateTaskResponseRequest = (taskId: number, data: any) => action(ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE_REQUEST, {
  api: {
    url: `/api/task-negotiation/task-response`,
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

export const taskNegotiationAcceptTaskResponse = (taskId: number, taskNegotiationId: number) => action(ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE, {id: taskNegotiationId, taskId});
export const taskNegotiationAcceptTaskResponseRequest = (taskNegotiationId: number) => action(ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE_REQUEST, {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/accept-task-response`,
    method: 'POST',
  }
})


export const taskNegotiationMarkAsDone = (taskId: number) => action(ActionTypes.TASK_NEGOTIATION_MARK_AS_DONE, {taskId})
export const taskNegotiationMarkAsDoneRequest = (taskNegotiationId: number) => action(ActionTypes.TASK_NEGOTIATION_MARK_AS_DONE_REQUEST, {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/mark-as-done`,
    method: 'GET',
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

export const  taskNegotiationAcceptConditionsRequest = (taskNegotiationId: number) => action(ActionTypes.TASK_NEGOTIATION_ACCEPT_CONDITIONS_REQUEST, {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/accept-conditions`,
    method: 'GET',
  }
})
export const  taskNegotiationDeclineConditions = (taskNegotiationId: number, messageId: number) => action(ActionTypes.TASK_NEGOTIATION_DECLINE_CONDITIONS, {taskNegotiationId, messageId})
export const  taskNegotiationDeclineConditionsRequest = (taskNegotiationId: number) => action(ActionTypes.TASK_NEGOTIATION_DECLINE_CONDITIONS_REQUEST, {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/decline-conditions`,
    method: 'GET',
  }
})
export const taskNegotiationAcceptTaskOffer = (taskNegotiationId: number) => action(ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_OFFER, {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/accept-task-offer`,
    method: 'GET',
  }
})
export const taskNegotiationDeclineTaskOffer = (taskNegotiationId: number, messageId: number) => action(ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_OFFER, {taskNegotiationId, messageId})
export const taskNegotiationDeclineTaskOfferRequest = (taskNegotiationId: number) => action(ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_OFFER_REQUEST,    {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/decline-task-offer`,
    method: 'GET',
  }
})

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
    url: `/api/task-negotiation/hire-master`,
    method: 'POST',
    data:{
      taskId,
      profileId
    }
  }
})


export const taskNegotiationFetchLastConditions = (taskId: number) => action(ActionTypes.TASK_NEGOTIATION_FETCH_LAST_CONDITIONS, {
  api: {
    url: `/api/task-negotiation/${taskId}/last-conditions`,
    method: 'GET',
  }
})
