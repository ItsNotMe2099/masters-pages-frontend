import { ITask } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')
export const taskOfferSetCurrentTask = (task: ITask) => action(ActionTypes.TASK_OFFER_SET_CURRENT_TASK, task)
export const acceptTaskOffer = (taskId: number, data: any) => action(ActionTypes.TASK_OFFER_ACCEPT, {taskId, data})
export const acceptTaskOfferRequest = (taskId: number, data: any) => action(ActionTypes.TASK_OFFER_ACCEPT_REQUEST, {
  api: {
    url: `/api/task-negotiation/task-response`,
    method: 'POST',
    data: {taskId, ...data}
  }
})
