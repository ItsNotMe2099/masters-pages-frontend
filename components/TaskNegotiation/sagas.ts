import { fetchChat, fetchOneChatMessage } from "components/Chat/actions";
import { confirmChangeData, feedbackSiteOpen, modalClose, taskSuccessOpen } from "components/Modal/actions";
import { createFeedBackMasterRequest } from "components/ProfileFeedback/actions";
import { action } from 'typesafe-actions'
import {
  taskNegotiationAcceptAsCompleted,
  taskNegotiationAcceptConditionsRequest,
  taskNegotiationAcceptTaskResponse,
  taskNegotiationAcceptTaskResponseRequest,
  taskNegotiationCreateTaskResponse,
  taskNegotiationCreateTaskResponseRequest,
  taskNegotiationDeclineConditions,
  taskNegotiationDeclineConditionsRequest,
  taskNegotiationDeclineTaskResponse,
  taskNegotiationDeclineTaskResponseRequest,
  taskNegotiationEditConditions,
  taskNegotiationEditConditionsRequest,
  taskNegotiationFinish,
  taskNegotiationFinishFailed,
  taskNegotiationFinishSuccess,
  taskNegotiationHireMaster,
  taskNegotiationHireMasterRequest, taskNegotiationMarkAsDone, taskNegotiationMarkAsDoneRequest
} from "components/TaskNegotiation/actions";

import { fetchTaskResponseRequest } from "components/TaskUser/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'

function* TaskOfferSaga() {

  yield takeLatest(ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE,
    function* (action: ActionType<typeof taskNegotiationCreateTaskResponse>) {
      console.log("TASK_OFFER_CREATE")
      yield put(taskNegotiationCreateTaskResponseRequest(action.payload.taskId, action.payload.data));
      const result = yield take([ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE_REQUEST + ApiActionTypes.FAIL])

      if (result.type === ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("ACCEPT TASK OFFER SUCCESS")
        yield put(modalClose());
      }
    })

  yield takeLatest(ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE,
    function* (action: ActionType<typeof taskNegotiationAcceptTaskResponse>) {
      console.log("TASK_OFFER_CREATE", action.payload)
      yield put(confirmChangeData({ loading: true }));
      yield put(taskNegotiationAcceptTaskResponseRequest(action.payload.id));
      const result = yield take([ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE_REQUEST + ApiActionTypes.FAIL])

      if (result.type === ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("ACCEPT TASK OFFER SUCCESS")
        yield put(fetchTaskResponseRequest(action.payload.taskId, action.payload.id));
        yield put(modalClose());
      }
    })
  yield takeLatest(ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_RESPONSE,
    function* (action: ActionType<typeof taskNegotiationDeclineTaskResponse>) {
      yield put(confirmChangeData({ loading: true }));
      yield put(taskNegotiationDeclineTaskResponseRequest(action.payload.id));
      const result = yield take([ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_RESPONSE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_RESPONSE_REQUEST + ApiActionTypes.FAIL])

      if (result.type === ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_RESPONSE_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("DECLINE TASK OFFER SUCCESS")
        yield put(fetchTaskResponseRequest(action.payload.taskId, action.payload.id));
        yield put(modalClose());
      }
    })

  yield takeLatest(ActionTypes.TASK_NEGOTIATION_DECLINE_CONDITIONS,
    function* (action: ActionType<typeof taskNegotiationDeclineConditions>) {
      console.log("TASK_NEGOTIATION_DECLINE_CONDITIONS");
      yield put(confirmChangeData({ loading: true }));
      yield put(taskNegotiationDeclineConditionsRequest(action.payload.taskNegotiationId));
      const result = yield take([ActionTypes.TASK_NEGOTIATION_DECLINE_CONDITIONS_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_NEGOTIATION_DECLINE_CONDITIONS_REQUEST + ApiActionTypes.FAIL])

      if (result.type === ActionTypes.TASK_NEGOTIATION_DECLINE_CONDITIONS_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("TASK_NEGOTIATION_DECLINE_CONDITIONS SUCCESS")
        yield put(fetchOneChatMessage(action.payload.messageId));
        yield put(modalClose());
      }
    })

  yield takeLatest(ActionTypes.TASK_NEGOTIATION_EDIT_CONDITIONS,
    function* (action: ActionType<typeof taskNegotiationEditConditions>) {
      console.log("TASK_NEGOTIATION_EDIT_CONDITIONS");
      yield put(taskNegotiationEditConditionsRequest(action.payload.taskNegotiationId, action.payload.data));
      const result = yield take([ActionTypes.TASK_NEGOTIATION_EDIT_CONDITIONS_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_NEGOTIATION_EDIT_CONDITIONS_REQUEST + ApiActionTypes.FAIL])

      if (result.type === ActionTypes.TASK_NEGOTIATION_EDIT_CONDITIONS_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("TASK_NEGOTIATION_EDIT_CONDITIONS SUCCESS")
        const currentMessage = yield select((state: IRootState) => state.taskOffer.currentMessage)
        console.log("currentMessage", currentMessage);
        if (currentMessage) {
          yield put(fetchOneChatMessage(currentMessage.id));
        }
        yield put(modalClose());
      }
    })
  yield takeLatest(ActionTypes.TASK_NEGOTIATION_HIRE_MASTER,
    function* (action: ActionType<typeof taskNegotiationHireMaster>) {
      console.log("TASK_NEGOTIATION_HIRE_MASTER");
      yield put(taskNegotiationAcceptConditionsRequest(action.payload.taskNegotiationId));

      const resultAccept = yield take([ActionTypes.TASK_NEGOTIATION_ACCEPT_CONDITIONS_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_NEGOTIATION_ACCEPT_CONDITIONS_REQUEST + ApiActionTypes.FAIL])

      if (resultAccept.type === ActionTypes.TASK_NEGOTIATION_HIRE_MASTER_REQUEST + ApiActionTypes.FAIL) {
        console.log("TaskErrorAccept");
        return;
      }
      yield put(taskNegotiationHireMasterRequest(action.payload.taskId, action.payload.profileId));
      const result = yield take([ActionTypes.TASK_NEGOTIATION_HIRE_MASTER_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_NEGOTIATION_HIRE_MASTER_REQUEST + ApiActionTypes.FAIL])

      if (result.type === ActionTypes.TASK_NEGOTIATION_HIRE_MASTER_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("TASK_NEGOTIATION_HIRE_MASTER SUCCESS")
        const currentMessage = yield select((state: IRootState) => state.taskOffer.currentMessage)
        console.log("currentMessage", currentMessage);
        if (currentMessage) {
          yield put(fetchOneChatMessage(currentMessage.id));
        }
        const chat = yield select((state: IRootState) => state.chat.chat);

        if (chat) {
          fetchChat(chat.id);
        }
        yield put(modalClose());
      }
    })

  yield takeLatest(ActionTypes.TASK_NEGOTIATION_MARK_AS_DONE,
    function* (action: ActionType<typeof taskNegotiationMarkAsDone>) {
      console.log("TASK_NEGOTIATION_MARK_AS_DONE");
      yield put(taskNegotiationMarkAsDoneRequest(action.payload.taskId));
      const result = yield take([ActionTypes.TASK_NEGOTIATION_MARK_AS_DONE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_NEGOTIATION_MARK_AS_DONE_REQUEST + ApiActionTypes.FAIL])

      if (result.type === ActionTypes.TASK_NEGOTIATION_MARK_AS_DONE_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("TASK_NEGOTIATION_EDIT_CONDITIONS SUCCESS")
        const currentMessage = yield select((state: IRootState) => state.taskOffer.currentMessage)
        console.log("currentMessage", currentMessage);
        if (currentMessage) {
          yield put(fetchOneChatMessage(currentMessage.id));
        }
        yield put(modalClose());
      }
    })

  yield takeLatest(ActionTypes.TASK_NEGOTIATION_FINISH,
    function* (action: ActionType<typeof taskNegotiationFinish>) {
      console.log("TASK_NEGOTIATION_FINISH111", action.payload)

      yield put(taskNegotiationAcceptAsCompleted(action.payload.taskId));
      const result = yield take([ActionTypes.TASK_NEGOTIATION_ACCEPT_AS_COMPLETED + ApiActionTypes.SUCCESS, ActionTypes.TASK_NEGOTIATION_ACCEPT_AS_COMPLETED + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.TASK_NEGOTIATION_ACCEPT_AS_COMPLETED + ApiActionTypes.FAIL) {
        yield put(taskNegotiationFinishFailed(result.payload.error));
      } else if (result.type === ActionTypes.TASK_NEGOTIATION_ACCEPT_AS_COMPLETED + ApiActionTypes.SUCCESS) {
        yield put(createFeedBackMasterRequest(action.payload.feedback));
        yield put(taskSuccessOpen());
      }
      const chat = yield select((state: IRootState) => state.chat.chat);

      if (chat) {
        yield put(fetchChat(chat.id));
      }
      yield put(taskNegotiationFinishSuccess());
    })
}

export default TaskOfferSaga
