import {confirmChangeData, modalClose} from "components/Modal/actions";

import ApiActionTypes from "constants/api";
import {takeLatest, put, take, select} from 'redux-saga/effects'
import {IRootState} from "types";
import {ActionType} from 'typesafe-actions'
import ActionTypes from './const'
import {
  completeEventRequest,
  createEvent,
  createEventRequest,
  createFeedBackEventClient,
  createFeedBackEventClientRequest,
  createFeedBackEventMaster,
  createFeedBackEventMasterRequest,
  deleteEvent,
  deleteEventRequest,
  editEventRequest,
  fetchEvent,
  sendEventRequest,
  setCurrentEventNext,
  setCurrentEventPrevious,
  submitEvent,
  updateEvent,
  updateEventCancel,
  updateEventRequest
} from 'components/Events/actions'
import {
  fetchProfileGalleryItemCommentList,
  fetchProfileGalleryList, setProfileGalleryCurrentItem,
  setProfileGalleryCurrentItemIndex
} from 'components/ProfileGallery/actions'

function* EventSaga() {
  console.log("EventSaga")
  yield takeLatest(ActionTypes.CREATE_EVENT,
    function* (action: ActionType<typeof createEvent>) {
      console.log("Create");
      yield put(createEventRequest(action.payload.data));
      const result = yield take([ActionTypes.CREATE_EVENT_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_EVENT_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.CREATE_EVENT_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("CREATE SKILL SUCCESS")
        yield put(modalClose());

      }
    })
  yield takeLatest(ActionTypes.SUBMIT_EVENT,
    function* (action: ActionType<typeof submitEvent>) {
      const submitEvent = yield select((state: IRootState) => state.event.submitEvent)
      let result;
      console.log("submitEvent", submitEvent);
      switch (submitEvent) {
        case 'draftWithEdit':
          yield put(editEventRequest(action.payload.event.id));
          result = yield take([ActionTypes.EDIT_EVENT_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.EDIT_EVENT_REQUEST + ApiActionTypes.FAIL])
          if (result.type !== ActionTypes.EDIT_EVENT_REQUEST + ApiActionTypes.SUCCESS) {
            return;
          }
          yield put(updateEvent(action.payload.event, action.payload.data));

          result = yield take([ActionTypes.UPDATE_EVENT_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_EVENT_REQUEST + ApiActionTypes.FAIL])
          break;
        case 'sendWithEdit':
          yield put(editEventRequest(action.payload.event.id));
          result = yield take([ActionTypes.EDIT_EVENT_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.EDIT_EVENT_REQUEST + ApiActionTypes.FAIL])
          if (result.type !== ActionTypes.EDIT_EVENT_REQUEST + ApiActionTypes.SUCCESS) {
            return;
          }
          yield put(updateEvent(action.payload.event, action.payload.data));

          result = yield take([ActionTypes.UPDATE_EVENT_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_EVENT_REQUEST + ApiActionTypes.FAIL])
          if (result.type !== ActionTypes.UPDATE_EVENT_REQUEST + ApiActionTypes.SUCCESS) {
            return;
          }
          yield put(sendEventRequest(action.payload.event.id));
          break;
        case 'send':
          yield put(updateEvent(action.payload.event, action.payload.data));
          result = yield take([ActionTypes.UPDATE_EVENT_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_EVENT_REQUEST + ApiActionTypes.FAIL])
          if (result.type !== ActionTypes.UPDATE_EVENT_REQUEST + ApiActionTypes.SUCCESS) {
            return;
          }
          yield put(sendEventRequest(action.payload.event.id));
          break;
        case 'complete':
          yield put(editEventRequest(action.payload.event.id));
          result = yield take([ActionTypes.EDIT_EVENT_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.EDIT_EVENT_REQUEST + ApiActionTypes.FAIL])
          if (result.type !== ActionTypes.EDIT_EVENT_REQUEST + ApiActionTypes.SUCCESS) {
            return;
          }
          yield put(updateEvent(action.payload.event, action.payload.data));
          result = yield take([ActionTypes.UPDATE_EVENT_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_EVENT_REQUEST + ApiActionTypes.FAIL])
          if (result.type !== ActionTypes.UPDATE_EVENT_REQUEST + ApiActionTypes.SUCCESS) {
            return;
          }
          yield put(completeEventRequest(action.payload.event.id));
          break;
        default:
          yield put(updateEvent(action.payload.event, action.payload.data));
          break;
      }
    })

  yield takeLatest(ActionTypes.UPDATE_EVENT,
    function* (action: ActionType<typeof updateEvent>) {
      console.log("Update Event", action.payload.event);
      yield put(updateEventRequest(action.payload.event.id, action.payload.data));
      const result = yield take([ActionTypes.UPDATE_EVENT_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_EVENT_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.UPDATE_EVENT_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("UPDATE_EVENT SUCCESS")
        const submitEvent = yield select((state: IRootState) => state.event.submitEvent)

        if (!submitEvent || ['draftWithEdit'].includes(submitEvent)) {
          yield put(modalClose());
        }
      } else {
        console.log("UPDATE_EVENT CANCEL")
        yield put(updateEventCancel(action.payload.event));
      }
    })

  yield takeLatest(ActionTypes.DELETE_EVENT,
    function* (action: ActionType<typeof deleteEvent>) {
      yield put(confirmChangeData({loading: true}));
      yield put(deleteEventRequest(action.payload.id));
      const result = yield take([ActionTypes.DELETE_EVENT_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_EVENT_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.DELETE_EVENT_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("DELETE SKILL SUCCESS")
        yield put(modalClose());

      }
    })
  yield takeLatest(ActionTypes.DELETE_EVENT_REQUEST + ApiActionTypes.SUCCESS,
    function* (action: ActionType<typeof deleteEvent>) {
      yield put(modalClose());
    });

  yield takeLatest(ActionTypes.SEND_EVENT_REQUEST + ApiActionTypes.SUCCESS,
    function* (action: ActionType<typeof deleteEvent>) {
      yield put(modalClose());
    });
  yield takeLatest(ActionTypes.DRAFT_EVENT_REQUEST + ApiActionTypes.SUCCESS,
    function* (action: ActionType<typeof deleteEvent>) {
      yield put(modalClose());
    });
  yield takeLatest(ActionTypes.COMPLETE_EVENT_REQUEST + ApiActionTypes.SUCCESS,
    function* (action: ActionType<typeof deleteEvent>) {
      yield put(modalClose());
    });
  yield takeLatest(ActionTypes.CONFIRM_EVENT_REQUEST + ApiActionTypes.SUCCESS,
    function* (action: ActionType<typeof deleteEvent>) {
      yield put(modalClose());
    });
  yield takeLatest(ActionTypes.DECLINE_EVENT_REQUEST + ApiActionTypes.SUCCESS,
    function* (action: ActionType<typeof deleteEvent>) {
      yield put(modalClose());
    });

  yield takeLatest(ActionTypes.SET_CURRENT_EVENT_NEXT,
    function* (action: ActionType<typeof setCurrentEventNext>) {
      const currentEvent = (yield select((state: IRootState) => state.event.currentEvent))
      const list = (yield select((state: IRootState) => state.event.list)).sort((a, b) => a.actualStart.getTime() - b.actualStart.getTime());
      const currentItemIndex = parseInt(Object.keys(list).find(k=> list[k].id === currentEvent.id), 10);
    console.log("currentItemIndex", currentItemIndex, list)
      let nextEvent = list[currentItemIndex + 1];

      if (nextEvent) {
        yield put(fetchEvent(nextEvent.id));
      }

    })
  yield takeLatest(ActionTypes.SET_CURRENT_EVENT_PREVIOUS,
    function* (action: ActionType<typeof setCurrentEventPrevious>) {
      const currentEvent = (yield select((state: IRootState) => state.event.currentEvent))
      const list = (yield select((state: IRootState) => state.event.list)).sort((a, b) => a.actualStart.getTime() - b.actualStart.getTime());
      const currentItemIndex = parseInt(Object.keys(list).find(k=> list[k].id === currentEvent.id), 10);


      let nextEvent = list[currentItemIndex - 1];

      if (nextEvent) {
        yield put(fetchEvent(nextEvent.id));
      }

    })

  yield takeLatest(ActionTypes.CREATE_FEEDBACK_EVENT_MASTER,
    function* (action: ActionType<typeof createFeedBackEventMaster>) {
      yield put(createFeedBackEventMasterRequest(action.payload.data));
      const result = yield take([ActionTypes.CREATE_FEEDBACK_EVENT_MASTER_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_FEEDBACK_EVENT_MASTER_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.CREATE_FEEDBACK_EVENT_MASTER_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("CREATE Feedback Event master SUCCESS")
        yield put(fetchEvent(action.payload.data.eventId));

      }
    })

  yield takeLatest(ActionTypes.CREATE_FEEDBACK_EVENT_CLIENT,
    function* (action: ActionType<typeof createFeedBackEventClient>) {
      yield put(createFeedBackEventClientRequest(action.payload.data));
      const result = yield take([ActionTypes.CREATE_FEEDBACK_EVENT_CLIENT_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_FEEDBACK_EVENT_CLIENT_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.CREATE_FEEDBACK_EVENT_CLIENT_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("CREATE Feedback Event client SUCCESS")
        yield put(fetchEvent(action.payload.data.eventId));

      }
    })

}

export default EventSaga
