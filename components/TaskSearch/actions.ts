import { ITask } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchTaskSearchList = (data:any = {} ) => action(ActionTypes.FETCH_TASK_LIST, data)

export const fetchTaskSearchListRequest = (data: any) => action(ActionTypes.FETCH_TASK_LIST_REQUEST, {
  api: {
    url: `/api/tasks/search?${queryString.stringify({...data, budgetMin: data.price?.min, budgetMax: data.price?.max, price: undefined})}`,
    method: 'GET',
  }
})

export const resetTaskSearchList = () => action(ActionTypes.RESET_TASK_LIST)
export const setPageTaskSearch = (page: number) => action(ActionTypes.TASK_LIST_SET_PAGE, page)
export const taskSearchSetCurrentTask = (task: ITask) => action(ActionTypes.TASK_LIST_SET_CURRENT_TASK, task)
export const setFilterTaskSearch = (data: any) => action(ActionTypes.TASK_LIST_SET_FILTER, data)
export const setSortTaskSearch = (data: string) => action(ActionTypes.TASK_LIST_SET_SORT, data)
export const setUseLocationFilter = (useFilter: boolean, exactLocation: boolean) => action(ActionTypes.TASK_LIST_SET_USE_LOCATION_FILTER, {useFilter, exactLocation})
export const saveTaskSearchListRequest = (data: any) => action(ActionTypes.TASK_LIST_SAVE_SEARCH, {
  api: {
    url: `/api/task-searches`,
    method: 'POST',
    data,
  }
})
