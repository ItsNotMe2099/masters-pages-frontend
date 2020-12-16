import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchTaskSearchList = () => action(ActionTypes.FETCH_TASK_LIST)

export const fetchTaskSearchListRequest = (data: any) => action(ActionTypes.FETCH_TASK_LIST_REQUEST, {
  api: {
    url: `/api/tasks/search?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const resetTaskSearchList = () => action(ActionTypes.RESET_TASK_LIST)
export const setPageTaskSearch = (page: number) => action(ActionTypes.TASK_LIST_SET_PAGE, page)
export const setFilterTaskSearch = (data: any) => action(ActionTypes.TASK_LIST_SET_FILTER, data)
export const setSortTaskSearch = (data: any) => action(ActionTypes.TASK_LIST_SET_SORT, data)
export const setUseLocationFilter = (useFilter: boolean, exactLocation: boolean) => action(ActionTypes.TASK_LIST_SET_USE_LOCATION_FILTER, {useFilter, exactLocation})
export const saveTaskSearchListRequest = (data: any) => action(ActionTypes.TASK_LIST_SAVE_SEARCH, {
  api: {
    url: `/api/task-searches`,
    method: 'POST',
    data,
  }
})
