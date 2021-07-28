import {confirmChangeData, modalClose} from "components/Modal/actions";

import ApiActionTypes from "constants/api";
import {takeLatest, put, take, select} from 'redux-saga/effects'
import {IRootState} from "types";
import {ActionType} from 'typesafe-actions'
import ActionTypes from './const'
import {hideProfileForm} from 'components/Profile/actions'
import {
  createPost, createPostCommentFailed, createPostCommentSuccess,
  createPostRequest,
  deletePost,
  deletePostRequest,
  fetchPost, fetchPostItemCommentList,
  fetchPostList, setPostCurrentItem,
  setPostCurrentItemIndex,
  updatePost,
  updatePostRequest
} from 'components/Post/actions'
import requestGen from 'utils/requestGen'
import {sendMessageFailed, sendMessageSuccess} from 'components/Chat/actions'

function* PostSaga() {
  yield takeLatest(ActionTypes.CREATE_POST,
    function* (action: ActionType<typeof createPost>) {
      yield put(createPostRequest(action.payload.data));
      const result = yield take([ActionTypes.CREATE_POST_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_POST_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.CREATE_POST_REQUEST + ApiActionTypes.SUCCESS) {
        if (action.payload.formKey) {
          yield put(hideProfileForm(action.payload.formKey));
        }


      }
    })
  yield takeLatest(ActionTypes.SET_POST_CURRENT_INDEX,
    function* (action: ActionType<typeof setPostCurrentItemIndex>) {
      const index = action.payload;
      const list = yield select((state: IRootState) => state.profileGallery.list)
      const currentSkill = yield select((state: IRootState) => state.profile.currentSkill)

      if (index >= list.length) {
        const page = yield select((state: IRootState) => state.profileGallery.page);
        const currentProfileTab = yield select((state: IRootState) => state.profileGallery.currentProfileTab)
        yield put(fetchPostList({
          ...(currentProfileTab ? {profileTabId: currentProfileTab.id} : {}),
          profileId: currentSkill.profileId,
          page,
          limit: 10
        }));
        const result = yield take([ActionTypes.FETCH_POST_LIST + ApiActionTypes.SUCCESS, ActionTypes.FETCH_POST_LIST + ApiActionTypes.FAIL])
        if (result.type === ActionTypes.FETCH_POST_LIST + ApiActionTypes.SUCCESS) {
          const item = list[index];
          yield put(fetchPostItemCommentList({
            type: 'gallery',
            profileGalleryId: item.id,
            page: 1,
            limit: 10
          }));
          yield put(setPostCurrentItem(item));
        }

      } else {
        yield put(setPostCurrentItem(list[index]));
        yield put(fetchPostItemCommentList({
          type: 'gallery',
          profileGalleryId: list[index].id,
          page: 1,
          limit: 10
        }));
      }

    })
  yield takeLatest(ActionTypes.UPDATE_POST,
    function* (action: ActionType<typeof updatePost>) {
      yield put(updatePostRequest(action.payload.id, action.payload.data));
      const result = yield take([ActionTypes.UPDATE_POST_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_POST_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.UPDATE_POST_REQUEST + ApiActionTypes.SUCCESS) {
        if (action.payload.formKey) {
          yield put(hideProfileForm(action.payload.formKey));
        }

      }
    })

  yield takeLatest(ActionTypes.DELETE_POST,
    function* (action: ActionType<typeof deletePost>) {
      yield put(confirmChangeData({loading: true}));
      yield put(deletePostRequest(action.payload.id));
      const result = yield take([ActionTypes.DELETE_POST_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_POST_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.DELETE_POST_REQUEST + ApiActionTypes.SUCCESS) {
        yield put(modalClose());

      }
    })

  yield takeLatest(ActionTypes.CREATE_POST_COMMENT, function* (action: ActionType<any>) {
    const res = yield requestGen({
      url: `/api/comment`,
      method: 'POST',
      data: action.payload.data,
    })


    if (res.err) {
      yield put(createPostCommentFailed(res.err))
    } else {

      yield put(createPostCommentSuccess(res.data))
      if(action.payload.onSuccess){
        action.payload.onSuccess();
      }
    }
  })
}

export default PostSaga
