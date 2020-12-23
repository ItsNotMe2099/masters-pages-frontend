
import { confirmChangeData, modalClose } from "components/Modal/actions";
import {
  fetchTaskSearchList,
  fetchTaskSearchListRequest, saveTaskSearchList,
  saveTaskSearchListRequest
} from "components/TaskSearch/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
function* TaskSearchSaga() {
  yield takeLatest(ActionTypes.FETCH_TASK_LIST,
    function* (action: ActionType<typeof fetchTaskSearchList>) {
      const useLocationFilter = yield select((state: IRootState) => state.taskSearch.useLocationFilter)
      const exactLocation = yield select((state: IRootState) => state.taskSearch.exactLocation)

      const filter = yield select((state: IRootState) => state.taskSearch.filter)
      const sort = yield select((state: IRootState) => state.taskSearch.sort)
      const sortOrder = yield select((state: IRootState) => state.taskSearch.sortOrder)
      const page = yield select((state: IRootState) => state.taskSearch.page)
      console.log("FETCH_TASK_LIST", action.payload)
      yield put(fetchTaskSearchListRequest({
          ...filter,
          sort,
        sortOrder,
          page,
        ...(useLocationFilter ? {exactLocation} : {}),
          limit: 10,
        ...action.payload
        }));

    })
  yield takeLatest(ActionTypes.TASK_LIST_SAVE_SEARCH,
    function* (action: ActionType<typeof saveTaskSearchList>) {
      yield put(confirmChangeData({loading: true}));
      yield put(saveTaskSearchListRequest(action.payload));
      yield take([ActionTypes.TASK_LIST_SAVE_SEARCH_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_LIST_SAVE_SEARCH_REQUEST + ApiActionTypes.FAIL])
      yield put(modalClose());

    })
}

export default TaskSearchSaga
