import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const fetchTaskById = (id) => action(ActionTypes.FETCH_TASK_BY_ID, {
  api: {
    url: `/api/tasks/${id}`,
    method: 'GET',
  }
})