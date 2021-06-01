import {feedbackSuccessOpen, modalClose} from "components/Modal/actions";
import {
  createFeedBackSite,
  createFeedBackSiteRequest,
  fetchFeedbacksToProfile,
  fetchFeedbacksToProfileRequest,
  fetchFeedbacksMainPageRequest,
  createFeedBackEventClientRequest,
  createFeedBackEventMasterRequest,
  createFeedBackMasterRequest, createFeedBackClient, createFeedBackClientRequest
} from "components/ProfileFeedback/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
import {fetchEvent} from 'components/Events/actions'
import {fetchOneTaskUserRequest} from 'components/TaskUser/actions'
function* ProfileFeedbackSaga() {
  yield takeLatest(ActionTypes.FETCH_FEEDBACKS_TO_PROFILE,
    function* (action: ActionType<typeof fetchFeedbacksToProfile>) {
      yield put(fetchFeedbacksToProfileRequest(action.payload.data));

    })

  yield takeLatest(ActionTypes.CREATE_FEEDBACK_SITE,
    function* (action: ActionType<typeof createFeedBackSite>) {
      console.log("CREATE_FEEDBACK_SITE", action.payload.data);
      yield put(createFeedBackSiteRequest(action.payload.data));
      yield put(feedbackSuccessOpen());
    })

  yield takeLatest(ActionTypes.CREATE_FEEDBACK_CLIENT,
    function* (action: ActionType<typeof createFeedBackClient>) {
      console.log("CREATE_FEEDBACK_CLIENT_REQUEST", action.payload.data);
      yield put(createFeedBackClientRequest(action.payload.data));
      const result = yield take([ActionTypes.CREATE_FEEDBACK_CLIENT_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_FEEDBACK_CLIENT_REQUEST + ApiActionTypes.FAIL])

      if (result.type === ActionTypes.CREATE_FEEDBACK_CLIENT_REQUEST + ApiActionTypes.SUCCESS) {
        yield put(fetchOneTaskUserRequest(action.payload.data.taskId));

        yield put(modalClose());
      }

    })


  yield takeLatest(ActionTypes.CREATE_FEEDBACK_EVENT_CLIENT_REQUEST + ApiActionTypes.SUCCESS,
    function* (action: ActionType<typeof createFeedBackEventClientRequest>) {
      yield put(fetchEvent((action.payload as any).eventId));
    })
  yield takeLatest(ActionTypes.CREATE_FEEDBACK_EVENT_MASTER_REQUEST + ApiActionTypes.SUCCESS,
    function* (action: ActionType<typeof createFeedBackEventMasterRequest>) {
      yield put(fetchEvent((action.payload as any).eventId));
    })
}

export default ProfileFeedbackSaga
