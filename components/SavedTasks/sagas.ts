import { fetchSavedTasks, fetchSavedTasksRequest } from "components/SavedTasks/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
function* SavedTasksSaga() {
  yield takeLatest(ActionTypes.FETCH_SAVED_TASKS,
    function* (action: ActionType<typeof fetchSavedTasks>) {
      yield put(fetchSavedTasksRequest());

    })
}

export default SavedTasksSaga
