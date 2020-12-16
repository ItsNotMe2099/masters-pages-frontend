
import { fetchTaskSearchList, fetchTaskSearchListRequest } from "components/TaskSearch/actions";
import { fetchTaskUserList, fetchTaskUserListRequest } from "components/TaskUser/actions";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
function* TaskUserSaga() {
  yield takeLatest(ActionTypes.FETCH_TASK_USER_LIST,
    function* (action: ActionType<typeof fetchTaskUserList>) {
      const filter = yield select((state: IRootState) => state.taskSearch.filter)
      const sort = yield select((state: IRootState) => state.taskSearch.sort)
      const page = yield select((state: IRootState) => state.taskSearch.page)
      yield put(fetchTaskUserListRequest({
          ...filter,
          ...sort,
          page,
          limit: 10
        }));

    })
}

export default TaskUserSaga
