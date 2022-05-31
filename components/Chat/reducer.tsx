import ApiActionTypes from 'constants/api'
import {IChat, IChatMessage} from 'types'
import {ActionType} from 'typesafe-actions'
import ActionTypes from './const'
import * as appActions from './actions'

export interface ChatState {
  chatPageLoading: boolean
  chatList: IChat[],
  chatListTotal: number,
  chatListLoading: boolean,
  chatLoading: boolean
  messageIsSending: boolean
  messageSentSuccess: boolean
  messageSentError: any | null
  chat: IChat | null
  messages: IChatMessage[]
  totalMessages: number,
  lastMessageId: number,
}

const initialState: ChatState = {
  chatPageLoading: false,
  messageSentSuccess: false,
  chatList: [],
  chatListTotal: 0,
  chatListLoading: false,
  chatLoading: false,
  messageIsSending: false,
  messageSentError: null,
  chat: null,
  messages: [],
  totalMessages: 0,
  lastMessageId: 0,
}

function ChatReducer(state = {...initialState}, action: ActionType<typeof appActions>) {

  switch (action.type) {
    case ActionTypes.FETCH_CHAT_LIST_FIRST:
      return {
        ...state,
        chatPageLoading: true
      }
    case ActionTypes.FETCH_CHAT_LIST_FIRST_SUCCESS:
      return {
        ...state,
        chatPageLoading: false
      }
    case ActionTypes.FETCH_CHAT_LIST + ApiActionTypes.SUCCESS:
      return {
        ...state,
        chatList: (action.payload as any).data.map(chat => ({
          ...chat,
          totalUnread: chat && chat.id === action.payload.id ? 0 : chat.totalUnread
        })),

        chatListTotal: (action.payload as any).total,
      }
    case ActionTypes.FETCH_CHAT_LIST + ApiActionTypes.FAIL:
      return {
        ...state,
        chatLoading: false,
      }

    case ActionTypes.FETCH_CHAT:
      return {
        ...state,
        chatLoading: true,
        messages: [],
      }
    case ActionTypes.FETCH_CHAT + ApiActionTypes.SUCCESS:
      return {
        ...state,
        chatLoading: false,
        chat: action.payload,
        chatList: state.chatList.map(chat => ({
          ...chat,
          totalUnread: chat.id === action.payload.id ? 0 : chat.totalUnread
        })),
        messages: (action.payload as any).messages.data,
        totalMessages: (action.payload as any).messages.total,
        lastMessageId: (action.payload as any).messages.data.length > 0 ? (action.payload as any).messages.data[(action.payload as any).messages.data.length - 1].id : null,
      }
    case ActionTypes.FETCH_CHAT + ApiActionTypes.FAIL:
      return {
        ...state,
        chatLoading: false,
      }

    case ActionTypes.FETCH_CHAT_DIALOG:
      return {
        ...state,
        chatLoading: true,
        messages: [],
      }
    case ActionTypes.FETCH_CHAT_DIALOG + ApiActionTypes.SUCCESS:
      return {
        ...state,
        chatLoading: false,
        chat: action.payload,
        chatList: state.chatList.map(chat => ({
          ...chat,
          totalUnread: chat.id === action.payload.id ? 0 : chat.totalUnread
        })),
        messages: (action.payload as any).messages.data,
        totalMessages: (action.payload as any).messages.total,
        lastMessageId: (action.payload as any).messages.data.length > 0 ? (action.payload as any).messages.data[(action.payload as any).messages.data.length - 1].id : null,
      }
    case ActionTypes.FETCH_CHAT_DIALOG + ApiActionTypes.FAIL:
      return {
        ...state,
        chatLoading: false,
      }
    case ActionTypes.FETCH_CHAT + ApiActionTypes.FAIL:
      return {
        ...state,
        chatLoading: false,
      }

    case ActionTypes.FETCH_CHAT_TASK_DIALOG:
      return {
        ...state,
        chatLoading: true,
        messages: [],
      }
    case ActionTypes.FETCH_CHAT_TASK_DIALOG + ApiActionTypes.SUCCESS:
      return {
        ...state,
        chatLoading: false,
        chat: action.payload,
        chatList: state.chatList.map(chat => ({
          ...chat,
          totalUnread: chat.id === action.payload.id ? 0 : chat.totalUnread
        })),
        messages: (action.payload as any).messages.data,
        totalMessages: (action.payload as any).messages.total,
        lastMessageId: (action.payload as any).messages.data.length > 0 ? (action.payload as any).messages.data[(action.payload as any).messages.data.length - 1].id : null,
      }
    case ActionTypes.FETCH_CHAT_TASK_DIALOG + ApiActionTypes.FAIL:
      return {
        ...state,
        chatLoading: false,
      }

    case ActionTypes.FETCH_CHAT_EVENT_DIALOG:
    case ActionTypes.FETCH_CHAT_EVENT_LOG_DIALOG:
      return {
        ...state,
        chatLoading: true,
        messages: [],
      }
    case ActionTypes.FETCH_CHAT_EVENT_DIALOG + ApiActionTypes.SUCCESS:
    case ActionTypes.FETCH_CHAT_EVENT_LOG_DIALOG + ApiActionTypes.SUCCESS:
      return {
        ...state,
        chatLoading: false,
        chat: action.payload,
        chatList: state.chatList.map(chat => ({
          ...chat,
          totalUnread: chat.id === action.payload.id ? 0 : chat.totalUnread
        })),
        messages: (action.payload as any).messages.data,
        totalMessages: (action.payload as any).messages.total,
        lastMessageId: (action.payload as any).messages.data.length > 0 ? (action.payload as any).messages.data[(action.payload as any).messages.data.length - 1].id : null,
      }
    case ActionTypes.FETCH_CHAT_EVENT_DIALOG + ApiActionTypes.FAIL:
    case ActionTypes.FETCH_CHAT_EVENT_LOG_DIALOG + ApiActionTypes.FAIL:
      return {
        ...state,
        chatLoading: false,
      }
    case ActionTypes.FETCH_CHAT_MESSAGES:
      return {
        ...state,
        chatLoading: true,
      }
    case ActionTypes.FETCH_CHAT_MESSAGES + ApiActionTypes.SUCCESS:
      return {
        ...state,
        chatLoading: false,
        messages: [...state.messages, ...(action.payload as any).data],
        totalMessages: (action.payload as any).total,
      }
    case ActionTypes.FETCH_CHAT_MESSAGES + ApiActionTypes.FAIL:
      return {
        ...state,
        chatLoading: false,
      }
    case ActionTypes.CHAT_MESSAGE_ADD_TO_LIST:
      return {
        ...state,
        messageIsSending: false,
        messageSentSuccess: true,
        messages: [(action.payload.message as any), ...state.messages],
        lastMessageId: action.payload.message.id,
      }
    case ActionTypes.CHAT_SEND_MESSAGE:
      return {
        ...state,
        messageIsSending: true,
        messageSentSuccess: false,
        messageSentError: null,
      }
    case ActionTypes.CHAT_SEND_MESSAGE + ApiActionTypes.SUCCESS:
      return {
        ...state,
        messageIsSending: false,
        messageSentSuccess: true,
        messages: [(action.payload as any), ...state.messages],
        lastMessageId: action.payload.id,
      }
    case ActionTypes.FETCH_CHAT_MESSAGES + ApiActionTypes.FAIL:
      return {
        ...state,
        messageIsSending: false,
        messageSentSuccess: false,
        messageSentError: action.payload,
      }
    case ActionTypes.UPDATE_CHAT_MESSAGES_STATE + ApiActionTypes.SUCCESS:
      return {
        ...state,
        messages: state.messages.map((message) => {
          return {...message, profileStates: message.profileStates.map(state => ({...state, read: true}))}
        }),
      }
    case ActionTypes.FETCH_CHAT_ONE_MESSAGE + ApiActionTypes.SUCCESS:
      return {
        ...state,
        messages: state.messages.map((message) => {
          if (message.id === action.payload.id) {
            return {...message, ...action.payload}
          }
          return message
        })
      }
    case ActionTypes.CHAT_MESSAGES_RESET:
      return {
        ...state,
        messages: [],
        totalMessages: 0,
      }
    case ActionTypes.CHAT_LIST_RESET:
      return {
        ...state,
        chat: null,
      }
    default:
       return {...state}
  }
}

export default ChatReducer
