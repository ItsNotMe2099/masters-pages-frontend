import { ITask } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchTaskSearchListWithLimit = (limit: number) => action(ActionTypes.FETCH_TASK_LIST_LIMIT_REQUEST, {
  api: {
    url: `/api/tasks/search?limit=${limit}`,
    method: 'GET'
  }
})
