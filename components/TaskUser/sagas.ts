
import { confirmChangeData, modalClose } from "components/Modal/actions";
import {
  deleteTaskUser,
  deleteTaskUserRequest,
  fetchOneTaskUserRequest,
  fetchTaskUserList,
  fetchTaskUserListRequest, fetchTaskUserStatRequest,
  setPublishedTaskUser,
  setPublishedTaskUserRequest, updateTaskUser, updateTaskUserRequest
} from "components/TaskUser/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
function* TaskUserSaga() {
  yield takeLatest(ActionTypes.FETCH_TASK_USER_LIST,
    function* (action: ActionType<typeof fetchTaskUserList>) {
      const filter = yield select((state: IRootState) => state.taskUser.filter)
      const sort = yield select((state: IRootState) => state.taskUser.sort)
      const page = yield select((state: IRootState) => state.taskUser.page)
      console.log("Request filter", filter)
      yield put(fetchTaskUserListRequest({
          ...filter,
          page,
          limit: 10
        }));

    })

  yield takeLatest(ActionTypes.TASK_USER_DELETE,
    function* (action: ActionType<typeof deleteTaskUser>) {
      yield put(confirmChangeData({loading: true}));
      yield put(deleteTaskUserRequest(action.payload.taskId));
      const result = yield take([ActionTypes.TASK_USER_DELETE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_USER_DELETE_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.TASK_USER_DELETE_REQUEST + ApiActionTypes.SUCCESS){
        yield put(fetchTaskUserStatRequest());
        console.log("DELETE SKILL SUCCESS")
        yield put(modalClose());
      }
    })

  yield takeLatest(ActionTypes.TASK_USER_SET_PUBLISHED,
    function* (action: ActionType<typeof setPublishedTaskUser>) {
    console.log("TASK_USER_SET_PUBLISHED")
      yield put(confirmChangeData({loading: true}));
      yield put(setPublishedTaskUserRequest(action.payload.taskId, action.payload.published));
      const result = yield take([ActionTypes.TASK_USER_SET_PUBLISHED_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_USER_SET_PUBLISHED_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.TASK_USER_SET_PUBLISHED_REQUEST + ApiActionTypes.SUCCESS){
        yield put(fetchOneTaskUserRequest(action.payload.taskId));
        yield put(fetchTaskUserStatRequest());
        yield take([ActionTypes.TASK_USER_FETCH_ONE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_USER_FETCH_ONE_REQUEST + ApiActionTypes.FAIL])

        console.log("set publish SKILL SUCCESS")
        yield put(modalClose());
      }
    })

  yield takeLatest(ActionTypes.TASK_USER_UPDATE,
    function* (action: ActionType<typeof updateTaskUser>) {
    console.log("TASK_USER_UPDATE")
      yield put(updateTaskUserRequest(action.payload.taskId, action.payload.data));
      const result = yield take([ActionTypes.TASK_USER_UPDATE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_USER_UPDATE_REQUEST + ApiActionTypes.FAIL])

      if(result.type === ActionTypes.TASK_USER_UPDATE_REQUEST + ApiActionTypes.SUCCESS){
        yield put(fetchOneTaskUserRequest(action.payload.taskId));
        yield take([ActionTypes.TASK_USER_FETCH_ONE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_USER_FETCH_ONE_REQUEST + ApiActionTypes.FAIL])
        console.log("UPDATE TASK SUCCESS")
        yield put(modalClose());
      }
    })
}

export default TaskUserSaga
