import { feedbackSuccessOpen } from "components/Modal/actions";
import {
  createFeedBackSite, createFeedBackSiteRequest,
  fetchFeedbacksToProfile,
  fetchFeedbacksToProfileRequest,
   fetchFeedbacksMainPageRequest
} from "components/ProfileFeedback/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
function* ProfileFeedbackSaga() {
  yield takeLatest(ActionTypes.FETCH_FEEDBACKS_TO_PROFILE,
    function* (action: ActionType<typeof fetchFeedbacksToProfile>) {
      yield put(fetchFeedbacksToProfileRequest());

    })

  yield takeLatest(ActionTypes.CREATE_FEEDBACK_SITE,
    function* (action: ActionType<typeof createFeedBackSite>) {
    console.log("CREATE_FEEDBACK_SITE", action.payload.data);
      yield put(createFeedBackSiteRequest(action.payload.data));
      yield put(feedbackSuccessOpen());
    })
}

export default ProfileFeedbackSaga
