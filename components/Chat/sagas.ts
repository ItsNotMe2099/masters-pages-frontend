import {
  fetchChat,
  fetchChatListFirstSuccess, fetchChatTasksList,
  newChatMessageAddToList,
  sendMessageFailed, sendMessageSuccess
} from "components/Chat/actions";
import { taskNegotiationFetchLastConditions } from "components/TaskNegotiation/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, select, take } from 'redux-saga/effects'
import { IChatMessageType, IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import requestGen from "utils/requestGen";
import ActionTypes from './const'

function* ChatSaga() {
  yield takeLatest(ActionTypes.FETCH_CHAT_LIST_FIRST, function* (action: ActionType<any>) {
    yield put(fetchChatTasksList());
    const result = yield take([ActionTypes.FETCH_CHAT_LIST + ApiActionTypes.SUCCESS, ActionTypes.FETCH_CHAT_LIST + ApiActionTypes.FAIL])
    if (result.type === ActionTypes.FETCH_CHAT_LIST + ApiActionTypes.SUCCESS) {

      const chatList = yield select((state: IRootState) => state.chat.chatList);
      if (chatList.length > 0) {
        yield put(fetchChat(chatList[0].id));
      }
    }
    yield put(fetchChatListFirstSuccess());
  })
  yield takeLatest(ActionTypes.CHAT_MESSAGE_NEW, function* (action: ActionType<any>) {
    const profile = yield select((state: IRootState) => state.profile.currentProfile)
    const { message } = action.payload
    if(message.profileId !== profile.id &&  message.type === IChatMessageType.TaskNegotiation){
      const chat = yield select((state: IRootState) => state.chat.chat);

      if(chat.taskId) {
        yield put(taskNegotiationFetchLastConditions(chat.taskId));
      }
      if(['master_assigned', 'task_completed'].includes(message.taskNegotiation.type)){
        console.log("Chat update");
        yield put(fetchChat(chat.id));
      }
    }
    if (message.profileId !== profile.id || message.type === IChatMessageType.TaskNegotiation) {
      yield put(newChatMessageAddToList(action.payload))
    }

    console.log("aboutMe", profile)
  })
  yield takeLatest(ActionTypes.CHAT_SEND_MESSAGE, function* (action: ActionType<any>) {
    const res = yield requestGen({
      url: `/api/chat/messages`,
      method: 'POST',
      data: action.payload,
    })


    if (res.err) {
      yield put(sendMessageFailed(res.err))
    } else {
      yield put(sendMessageSuccess(res.data))
    }
  })

  yield takeLatest(ActionTypes.CHAT_ATTACH_PHOTO, function* (action: ActionType<any>) {


  })
}

export default ChatSaga
