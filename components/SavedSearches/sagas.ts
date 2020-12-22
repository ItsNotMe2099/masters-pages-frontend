import { fetchSavedSearches, fetchSavedSearchesRequest } from "components/SavedSearches/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
function* SavedSearchesSaga() {
  yield takeLatest(ActionTypes.FETCH_SAVED_SEARCHES,
    function* (action: ActionType<typeof fetchSavedSearches>) {
      yield put(fetchSavedSearchesRequest());

    })
}

export default SavedSearchesSaga
