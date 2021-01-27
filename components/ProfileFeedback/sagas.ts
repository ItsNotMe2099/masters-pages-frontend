import { fetchFeedbacksToProfile, fetchFeedbacksToProfileRequest, fetchLatestFeedbacksToProfile, fetchLatestFeedbacksToProfileRequest } from "components/ProfileFeedback/actions";
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
  yield takeLatest(ActionTypes.FETCH_LATEST_FEEDBACKS_TO_PROFILE,
    function* (action: ActionType<typeof fetchLatestFeedbacksToProfile>) {
      yield put(fetchLatestFeedbacksToProfileRequest());
  
    })
}

export default ProfileFeedbackSaga
