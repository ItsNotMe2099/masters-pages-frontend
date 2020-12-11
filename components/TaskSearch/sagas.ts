
import { fetchTaskSearchList, fetchTaskSearchListRequest } from "components/TaskSearch/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
function* TaskSearchSaga() {
  yield takeLatest(ActionTypes.FETCH_TASK_LIST,
    function* (action: ActionType<typeof fetchTaskSearchList>) {
      const filter = yield select((state: IRootState) => state.taskSearch.filter)
      const sort = yield select((state: IRootState) => state.taskSearch.sort)
      const page = yield select((state: IRootState) => state.taskSearch.page)
      yield put(fetchTaskSearchListRequest({
          ...filter,
          ...sort,
          page,
          limit: 10
        }));

    })
}

export default TaskSearchSaga
