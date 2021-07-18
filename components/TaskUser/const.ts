enum ActionTypes {
  FETCH_TASK_USER_STAT = 'UserTask/FETCH_TASK_USER_STAT',
  FETCH_TASK_USER_LIST = 'UserTask/FETCH_TASK_USER_LIST',
  FETCH_TASK_USER_LIST_REQUEST = 'UserTask/FETCH_TASK_USER_LIST_REQUEST',
  RESET_TASK_USER_LIST = 'UserTask/RESET_TASK_USER_LIST',
  TASK_USER_LIST_SET_SORT = 'UserTask/TASK_USER_LIST_SET_SORT',
  TASK_USER_LIST_SET_SORT_ORDER = 'UserTask/TASK_USER_LIST_SET_SORT_ORDER',
  TASK_USER_LIST_SET_FILTER = 'UserTask/TASK_USER_LIST_SET_FILTER',
  TASK_USER_LIST_SET_PAGE = 'UserTask/SET_PAGE',
  TASK_USER_REMOVE_FROM_LIST = 'UserTask/TASK_USER_REMOVE_FROM_LIST',
  TASK_USER_DELETE = 'UserTask/TASK_USER_DELETE',
  TASK_USER_DELETE_REQUEST = 'UserTask/TASK_USER_DELETE_REQUEST',
  TASK_USER_SET_PUBLISHED = 'UserTask/TASK_USER_SET_PUBLISHED',
  TASK_USER_SET_PUBLISHED_REQUEST = 'UserTask/TASK_USER_SET_PUBLISHED_REQUEST',

  TASK_USER_RESET_UPDATE_FORM = 'UserTask/TASK_USER_RESET_UPDATE_FORM',
  TASK_USER_UPDATE = 'UserTask/TASK_USER_UPDATE',
  TASK_USER_UPDATE_REQUEST = 'UserTask/TASK_USER_UPDATE_REQUEST',

  TASK_USER_FETCH_ONE_REQUEST = 'UserTask/TASK_USER_FETCH_ONE_REQUEST',

  TASK_USER_ACCEPT = 'UserTask/TASK_USER_SET_PUBLISHED',
  TASK_USER_ACCEPT_REQUEST = 'UserTask/TASK_USER_UPDATE_REQUEST',

  TASK_USER_SET_COMPLETED = 'UserTask/TASK_USER_SET_COMPLETED',
  TASK_USER_SET_COMPLETED_REQUEST = 'UserTask/TASK_USER_SET_COMPLETED_REQUEST',

  FETCH_TASK_USER_RESPONSES_LIST_REQUEST = 'UserTask/FETCH_TASK_USER_RESPONSES_LIST',

  TASK_RESPONSE_FETCH_REQUEST = 'TaskOffer/TASK_RESPONSE_FETCH_REQUEST',
  TASK_CANCEL = 'TaskOffer/TASK_CANCEL',
  TASK_CANCEL_REQUEST = 'TaskOffer/TASK_CANCEL_REQUEST',

  FETCH_TASK_STATS_BY_ID = 'TaskPage/FETCH_TASK_STATS_BY_ID',
}

export default ActionTypes