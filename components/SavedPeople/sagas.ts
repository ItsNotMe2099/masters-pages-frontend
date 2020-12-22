import { fetchSavedPeople, fetchSavedPeopleRequest } from "components/SavedPeople/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
function* SavedPeopleSaga() {
  yield takeLatest(ActionTypes.FETCH_SAVED_PEOPLE,
    function* (action: ActionType<typeof fetchSavedPeople>) {
      yield put(fetchSavedPeopleRequest());

    })
}

export default SavedPeopleSaga
