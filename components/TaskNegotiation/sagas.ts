import { fetchChat, fetchOneChatMessage } from "components/Chat/actions";
import { createTaskComplete } from "components/CreateTaskPage/actions";
import { confirmChangeData, feedbackSiteOpen, modalClose, taskSuccessOpen } from "components/Modal/actions";
import { createFeedBackMasterRequest } from "components/ProfileFeedback/actions";
import { fetchTaskSearchOneRequest } from "components/TaskSearch/actions";
import Router from "next/router";
import { action } from 'typesafe-actions'
import {
  taskNegotiationAcceptAsCompleted,
  taskNegotiationAcceptConditions,
  taskNegotiationAcceptConditionsRequest,
  taskNegotiationAcceptTaskOffer,
  taskNegotiationAcceptTaskOfferRequest,
  taskNegotiationAcceptTaskResponse,
  taskNegotiationAcceptTaskResponseRequest,
  taskNegotiationCreateTaskResponse,
  taskNegotiationCreateTaskResponseRequest,
  taskNegotiationDeclineConditions,
  taskNegotiationDeclineConditionsRequest,
  taskNegotiationDeclineTaskOffer,
  taskNegotiationDeclineTaskOfferRequest,
  taskNegotiationDeclineTaskResponse,
  taskNegotiationDeclineTaskResponseRequest,
  taskNegotiationEditConditions,
  taskNegotiationEditConditionsRequest,
  taskNegotiationFinish,
  taskNegotiationFinishFailed,
  taskNegotiationFinishSuccess,
  taskNegotiationHireMaster,
  taskNegotiationHireMasterRequest,
  taskNegotiationMarkAsDone,
  taskNegotiationMarkAsDoneRequest,
  taskNegotiationSendOffer,
  taskNegotiationSendOfferCreateTask,
  taskNegotiationSendOfferRequest,
  taskNegotiationSendOfferSetLoading
} from "components/TaskNegotiation/actions";

import { fetchOneTaskUserRequest, fetchTaskResponseRequest, taskUserRemoveFromList } from "components/TaskUser/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState, ITaskStatus } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
import CreateTaskActionTypes from 'components/CreateTaskPage/const'

function* TaskOfferSaga() {

  yield takeLatest(ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE,
    function* (action: ActionType<typeof taskNegotiationCreateTaskResponse>) {
      console.log("TASK_OFFER_CREATE")
      yield put(taskNegotiationCreateTaskResponseRequest(action.payload.taskId, action.payload.data));
      const result = yield take([ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE_REQUEST + ApiActionTypes.FAIL])

      if (result.type === ActionTypes.TASK_NEGOTIATION_CREATE_TASK_RESPONSE_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("ACCEPT TASK OFFER SUCCESS")
        yield put(fetchTaskSearchOneRequest(action.payload.taskId));
        yield put(modalClose());
      }
    })

  yield takeLatest(ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE,
    function* (action: ActionType<typeof taskNegotiationAcceptTaskResponse>) {
      console.log("TASK_OFFER_CREATE", action.payload)
      yield put(confirmChangeData({ loading: true }));
      yield put(taskNegotiationAcceptTaskResponseRequest(action.payload.response.id));
      const result = yield take([ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE_REQUEST + ApiActionTypes.FAIL])

      if (result.type === ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_RESPONSE_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("ACCEPT TASK OFFER SUCCESS")
        yield put(fetchTaskResponseRequest(action.payload.response.taskId, action.payload.response.id));
        Router.push(`/Chat/task-dialog/${action.payload.response.taskId}/${action.payload.response.profileId}`)
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





  yield takeLatest(ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_OFFER,
    function* (action: ActionType<typeof taskNegotiationAcceptTaskOffer>) {
      console.log("TASK_NEGOTIATION_ACCEPT_TASK_OFFER");
      yield put(confirmChangeData({ loading: true }));
      yield put(taskNegotiationAcceptTaskOfferRequest(action.payload.taskNegotiation.id));
      const result = yield take([ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_OFFER_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_OFFER_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.TASK_NEGOTIATION_ACCEPT_TASK_OFFER_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("TASK_NEGOTIATION_ACCEPT_TASK_OFFER SUCCESS")
        Router.push(`/Chat/task-dialog/${action.payload.taskNegotiation.taskId}/${action.payload.taskNegotiation.profileId}`)
        yield put(modalClose());
      }
    })

  yield takeLatest(ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_OFFER,
    function* (action: ActionType<typeof taskNegotiationDeclineTaskOffer>) {
      console.log("TASK_NEGOTIATION_DECLINE_TASK_OFFER");
      yield put(confirmChangeData({ loading: true }));
      yield put(taskNegotiationDeclineTaskOfferRequest(action.payload.taskNegotiation.id));
      const result = yield take([ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_OFFER_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_OFFER_REQUEST + ApiActionTypes.FAIL])

      if (result.type === ActionTypes.TASK_NEGOTIATION_DECLINE_TASK_OFFER_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("TASK_NEGOTIATION_DECLINE_TASK_OFFER SUCCESS")
        yield put(modalClose());
        yield put(taskUserRemoveFromList(action.payload.taskNegotiation.taskId));
      }
    })





  yield takeLatest(ActionTypes.TASK_NEGOTIATION_ACCEPT_CONDITIONS,
    function* (action: ActionType<typeof taskNegotiationAcceptConditions>) {
      console.log("TASK_NEGOTIATION_ACCEPT_CONDITIONS");
      yield put(confirmChangeData({ loading: true }));
      yield put(taskNegotiationAcceptConditionsRequest(action.payload.taskNegotiationId));
      const result = yield take([ActionTypes.TASK_NEGOTIATION_ACCEPT_CONDITIONS_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_NEGOTIATION_ACCEPT_CONDITIONS_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.TASK_NEGOTIATION_ACCEPT_CONDITIONS_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("TASK_NEGOTIATION_ACCEPT_CONDITIONS SUCCESS")
        yield put(fetchOneChatMessage(action.payload.messageId));
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
          yield put(fetchChat(chat.id));
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

  yield takeLatest(ActionTypes.TASK_NEGOTIATION_SEND_OFFER,
    function* (action: ActionType<typeof taskNegotiationSendOffer>) {
      console.log("TASK_NEGOTIATION_SEND_OFFER");
      yield put(taskNegotiationSendOfferSetLoading(true));
      yield put(taskNegotiationSendOfferRequest(action.payload.taskId, action.payload.profileId));
      const result = yield take([ActionTypes.TASK_NEGOTIATION_SEND_OFFER_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_NEGOTIATION_SEND_OFFER_REQUEST + ApiActionTypes.FAIL])

      if (result.type === ActionTypes.TASK_NEGOTIATION_SEND_OFFER_REQUEST + ApiActionTypes.SUCCESS) {
        yield put(modalClose());
      }
      yield put(taskNegotiationSendOfferSetLoading(false));
    })

  yield takeLatest(ActionTypes.TASK_NEGOTIATION_SEND_OFFER_CREATE_TASK,
    function* (action: ActionType<typeof taskNegotiationSendOfferCreateTask>) {
      console.log("TASK_NEGOTIATION_SEND_OFFER");
      yield put(taskNegotiationSendOfferSetLoading(true));
      yield put(createTaskComplete({...action.payload.task, status: ITaskStatus.PrivatelyPublished}));

      let result = yield take([CreateTaskActionTypes.CREATE_TASK_SUCCESS, CreateTaskActionTypes.CREATE_TASK_ERROR]);
      if (result.type === CreateTaskActionTypes.CREATE_TASK_SUCCESS) {
        yield put(taskNegotiationSendOfferRequest(result.payload.id, action.payload.profileId));
        result = yield take([ActionTypes.TASK_NEGOTIATION_SEND_OFFER_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_NEGOTIATION_SEND_OFFER_REQUEST + ApiActionTypes.FAIL])

        if (result.type === ActionTypes.TASK_NEGOTIATION_SEND_OFFER_REQUEST + ApiActionTypes.SUCCESS) {
          yield put(modalClose());
        }
      }



      yield put(taskNegotiationSendOfferSetLoading(false));
    })

}

export default TaskOfferSaga
