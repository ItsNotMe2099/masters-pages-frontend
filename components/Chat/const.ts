enum ActionTypes {
  FETCH_CHAT_LIST_FIRST = 'ChatPage/FETCH_CHAT_LIST_FIRST',

  FETCH_CHAT_LIST_FIRST_SUCCESS = 'ChatPage/FETCH_CHAT_LIST_FIRST_SUCCESS',

  FETCH_CHAT_LIST = 'ChatPage/FETCH_CHAT_LIST',
  FETCH_CHAT = 'ChatPage/FETCH_CHAT',
  FETCH_CHAT_DIALOG = 'ChatPage/FETCH_CHAT_DIALOG',
  FETCH_CHAT_TASK_DIALOG = 'ChatPage/FETCH_CHAT_TASK_DIALOG',
  FETCH_CHAT_EVENT_DIALOG = 'ChatPage/FETCH_CHAT_EVENT_DIALOG',
  FETCH_CHAT_EVENT_LOG_DIALOG = 'ChatPage/FETCH_CHAT_EVENT_LOG_DIALOG',
  FETCH_CHAT_MESSAGES = 'ChatPage/FETCH_CHAT_MESSAGES',
  FETCH_CHAT_ONE_MESSAGE = 'ChatPage/FETCH_CHAT_ONE_MESSAGE',
  CHAT_MESSAGES_RESET = 'ChatPage/FETCH_CHAT_MESSAGES_RESET',
  CHAT_LIST_RESET = 'ChatPage/FETCH_CHAT_LIST_RESET',
  CHAT_SEND_MESSAGE = 'ChatPage/SEND_MESSAGE',

  UPDATE_CHAT_MESSAGES_STATE = 'ChatPage/UPDATE_CHAT_MESSAGES_STATE',

  CHAT_MESSAGE_NEW = 'ChatPage/CHAT_MESSAGE_NEW',
  CHAT_MESSAGE_ADD_TO_LIST = 'ChatPage/CHAT_MESSAGE_ADD_TO_LIST',
  CHAT_ATTACH_PHOTO = 'ChatPage/ATTACH_PHOTO',
  CHAT_LOGOUT = 'ChatPage/CHAT_LOGOUT',
  CHAT_LOGIN = 'ChatPage/CHAT_LOGIN',
}

export default ActionTypes
