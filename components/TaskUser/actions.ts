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

export const fetchTaskUserResponseRequest = (taskId: number, data: any) => action(ActionTypes.FETCH_TASK_USER_RESPONSES_LIST_REQUEST, {
  api: {
    url: `/api/tasks/${taskId}/responses?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const fetchTaskResponseRequest = (taskId: number, taskNegotiationId: number) => action(ActionTypes.TASK_RESPONSE_FETCH_REQUEST, {
  api: {
    url: `/api/tasks/${taskId}/responses/${taskNegotiationId}`,
    method: 'GET',
  }
})


export const resetTaskUserList = () => action(ActionTypes.RESET_TASK_USER_LIST)
export const setPageTaskUser = (page: number) => action(ActionTypes.TASK_USER_LIST_SET_PAGE, page)
export const setFilterTaskUser = (data: any) => action(ActionTypes.TASK_USER_LIST_SET_FILTER, data)
export const setSortTaskUser = (data: any) => action(ActionTypes.TASK_USER_LIST_SET_SORT, data)
export const setSortOrderTaskUser = (data: any) => action(ActionTypes.TASK_USER_LIST_SET_SORT_ORDER, data)

export const deleteTaskUser = (taskId: number) => action(ActionTypes.TASK_USER_DELETE, {taskId})
export const deleteTaskUserRequest = (taskId: number) => action(ActionTypes.TASK_USER_DELETE_REQUEST, {
  api: {
    url: `/api/tasks/${taskId}`,
    method: 'DELETE'
  }
})


export const setPublishedTaskUser = (taskId: number, published: boolean) => action(ActionTypes.TASK_USER_SET_PUBLISHED, {taskId, published})
export const setPublishedTaskUserRequest = (taskId: number, published: boolean) => action(ActionTypes.TASK_USER_SET_PUBLISHED_REQUEST, {
  api: {
    url: `/api/tasks/${taskId}`,
    method: 'PUT',
    data: {
      status: published ? 'published' : 'draft'
    }
  }
})

export const updateTaskUser = (taskId: number, data: any) => action(ActionTypes.TASK_USER_UPDATE, {taskId, data})
export const updateTaskUserRequest = (taskId: number, data: any) => action(ActionTypes.TASK_USER_UPDATE_REQUEST, {
  api: {
    url: `/api/tasks/${taskId}`,
    method: 'PUT',
    data
  }
})

export const fetchOneTaskUserRequest = (taskId: number) => action(ActionTypes.TASK_USER_FETCH_ONE_REQUEST, {
  api: {
    url: `/api/tasks/${taskId}`,
    method: 'GET'
  }
})
export const fetchTaskStatsById = (id) => action(ActionTypes.FETCH_TASK_STATS_BY_ID, {
  api: {
    url: `/api/tasks/${id}/stats`,
    method: 'GET',
  }
})


export const setCompletedTaskUser = (taskId: number) => action(ActionTypes.TASK_USER_SET_COMPLETED, {taskId})
export const setCompletedTaskUserRequest = (taskNegotiationId: number) => action(ActionTypes.TASK_USER_SET_COMPLETED_REQUEST, {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/mark-as-done`,
    method: 'GET',
  }
})


export const setAcceptTaskUser = (taskId: number) => action(ActionTypes.TASK_USER_SET_COMPLETED, {taskId})
export const setAcceptTaskUserRequest = (taskNegotiationId: number) => action(ActionTypes.TASK_USER_SET_COMPLETED_REQUEST, {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/mark-as-done`,
    method: 'GET',
  }
})

export const resetTaskUserUpdateForm = () => action(ActionTypes.TASK_USER_RESET_UPDATE_FORM)


export const taskUserRemoveFromList = (taskId: number) => action(ActionTypes.TASK_USER_REMOVE_FROM_LIST, {taskId})

export const taskCancel = (taskId: number) => action(ActionTypes.TASK_CANCEL, {taskId})
export const taskCancelRequest = (taskNegotiationId: number) => action(ActionTypes.TASK_CANCEL_REQUEST, {
  api: {
    url: `/api/task-negotiation/${taskNegotiationId}/cancel-task`,
    method: 'POST',
  }
})
