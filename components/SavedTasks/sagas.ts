import { fetchSavedTasks, fetchSavedTasksRequest } from 'components/SavedTasks/actions'
import { takeLatest, put } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
function* SavedTasksSaga() {
  yield takeLatest(ActionTypes.FETCH_SAVED_TASKS,
    function* (action: ActionType<typeof fetchSavedTasks>) {
      yield put(fetchSavedTasksRequest())

    })
}

export default SavedTasksSaga
