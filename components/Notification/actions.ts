import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchSavedTasks = () => action(ActionTypes.FETCH_SAVED_TASKS)

export const fetchSavedTasksRequest = (page?: number, limit?: number) => action(ActionTypes.FETCH_SAVED_TASKS_REQUEST, {
  api: {
    url: `/api/profile/saved-tasks?page=${page || 1}&limit=${limit || 10}`,
    method: 'GET',
  }
})


export const saveTaskRequest = (taskId: number) => action(ActionTypes.SAVE_TASK_REQUEST, {
  api: {
    url: '/api/profile/saved-tasks',
    method: 'POST',
    data: {
      taskId
    }
  }
})
export const resetSavedTasksList = () => action(ActionTypes.RESET_SAVED_TASKS_LIST)
