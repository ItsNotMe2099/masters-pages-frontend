import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchSavedTasks = () => action(ActionTypes.FETCH_SAVED_TASKS)

export const fetchSavedTasksRequest = () => action(ActionTypes.FETCH_SAVED_TASKS_REQUEST, {
  api: {
    url: `/api/profile/saved-tasks`,
    method: 'GET',
  }
})
