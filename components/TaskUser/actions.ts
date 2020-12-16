import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')


export const fetchTaskUserList = () => action(ActionTypes.FETCH_TASK_USER_LIST)

export const fetchTaskUserStatRequest = () => action(ActionTypes.FETCH_TASK_USER_STAT, {
  api: {
    url: `/api/tasks/count`,
    method: 'GET',
  }
})


export const fetchTaskUserListRequest = (data: any) => action(ActionTypes.FETCH_TASK_USER_LIST_REQUEST, {
  api: {
    url: `/api/tasks?${queryString.stringify(data)}`,
    method: 'GET',
  }
})
export const resetTaskUserList = () => action(ActionTypes.RESET_TASK_USER_LIST)
export const setPageTaskUser = (page: number) => action(ActionTypes.TASK_USER_LIST_SET_PAGE, page)
export const setFilterTaskUser = (data: any) => action(ActionTypes.TASK_USER_LIST_SET_FILTER, data)
export const setSortTaskUser = (data: any) => action(ActionTypes.TASK_USER_LIST_SET_SORT, data)

