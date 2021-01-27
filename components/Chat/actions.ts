import ActionTypes from './const'
import { action } from 'typesafe-actions'
import ApiActionTypes from '../../constants/api'


export const fetchChatListFirst = () => action(ActionTypes.FETCH_CHAT_LIST_FIRST)
export const fetchChatListFirstSuccess = () => action(ActionTypes.FETCH_CHAT_LIST_FIRST_SUCCESS)

export const fetchChatTasksList = () => action(ActionTypes.FETCH_CHAT_LIST, {
  api: `/api/chat/task-dialog`,
})
export const fetchChatWithUsersList = () => action(ActionTypes.FETCH_CHAT_LIST, {
  api: `/api/chat/dialog`,
})
export const fetchChat = (id: number) => action(ActionTypes.FETCH_CHAT, {
  api: `/api/chat/${id}`,
})
export const fetchChatDialog = (fromId: number, toId: number) => action(ActionTypes.FETCH_CHAT_DIALOG, {
  api: `/api/chat/dialog/${fromId}/${toId}`,
})

export const fetchChatMessages = ({chatId, lastCreatedAt}) => action(ActionTypes.FETCH_CHAT_MESSAGES, {
  api: `/api/chat/${chatId}/messages?lastCreatedAt=${lastCreatedAt}`,
})
export const fetchOneChatMessage = (messageId) => action(ActionTypes.FETCH_CHAT_ONE_MESSAGE, {
  api: `/api/chat/messages/${messageId}`,
})
export const updateChatMessagesState = ({ids, read}) => action(ActionTypes.UPDATE_CHAT_MESSAGES_STATE, {
  api: {
    url: `/api/chat/messages/state`,
    method: 'POST',
    data: {
      ids,
      read,
    },
  },
})
export const resetChatMessagesList = () => action(ActionTypes.CHAT_MESSAGES_RESET)
export const newChatMessage = (params = {}) => action(ActionTypes.CHAT_MESSAGE_NEW, params)
export const newChatMessageAddToList = (params = {}) => action(ActionTypes.CHAT_MESSAGE_ADD_TO_LIST, params)
export const chatLogout = (params = {}) => action(ActionTypes.CHAT_LOGOUT, params)
export const chatLogin = (params = {}) => action(ActionTypes.CHAT_LOGIN, params)
export const attachPhoto = (params = {}) => action(ActionTypes.CHAT_ATTACH_PHOTO, params)
export const sendMessage = ({message, chatId}) => action(ActionTypes.CHAT_SEND_MESSAGE, {message, chatId})
export const sendMessageSuccess = (payload) => action(ActionTypes.CHAT_SEND_MESSAGE + ApiActionTypes.SUCCESS, payload)
export const sendMessageFailed = (payload) => action(ActionTypes.CHAT_SEND_MESSAGE + ApiActionTypes.FAIL, payload)
