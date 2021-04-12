import {confirmChangeData, modalClose} from "components/Modal/actions";

import ApiActionTypes from "constants/api";
import {takeLatest, put, take, select} from 'redux-saga/effects'
import {IRootState} from "types";
import {ActionType} from 'typesafe-actions'
import ActionTypes from './const'
import {hideProfileForm} from 'components/Profile/actions'
import {
  createProfileGallery, createProfileGalleryCommentFailed, createProfileGalleryCommentSuccess,
  createProfileGalleryRequest,
  deleteProfileGallery,
  deleteProfileGalleryRequest,
  fetchProfileGallery, fetchProfileGalleryItemCommentList,
  fetchProfileGalleryList, setProfileGalleryCurrentItem,
  setProfileGalleryCurrentItemIndex,
  updateProfileGallery,
  updateProfileGalleryRequest
} from 'components/ProfileGallery/actions'
import requestGen from 'utils/requestGen'
import {sendMessageFailed, sendMessageSuccess} from 'components/Chat/actions'

function* ProfileGallerySaga() {
  console.log("ProfileGallerySaga")
  yield takeLatest(ActionTypes.CREATE_PROFILE_GALLERY,
    function* (action: ActionType<typeof createProfileGallery>) {
      console.log("Create");
      yield put(createProfileGalleryRequest(action.payload.data));
      const result = yield take([ActionTypes.CREATE_PROFILE_GALLERY_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_PROFILE_GALLERY_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.CREATE_PROFILE_GALLERY_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("CREATE SKILL SUCCESS")
        if (action.payload.formKey) {
          yield put(hideProfileForm(action.payload.formKey));
        }


      }
    })
  yield takeLatest(ActionTypes.SET_PROFILE_GALLERY_CURRENT_INDEX,
    function* (action: ActionType<typeof setProfileGalleryCurrentItemIndex>) {
      const index = action.payload;
      console.log("SET_PROFILE_GALLERY_CURRENT_INDEX", index)
      const list = yield select((state: IRootState) => state.profileGallery.list)
      const currentSkill = yield select((state: IRootState) => state.profile.currentSkill)

      if (index >= list.length) {
        const page = yield select((state: IRootState) => state.profileGallery.page);
        const currentProfileTab = yield select((state: IRootState) => state.profileGallery.currentProfileTab)
        yield put(fetchProfileGalleryList({
          ...(currentProfileTab ? {profileTabId: currentProfileTab.id} : {}),
          profileId: currentSkill.profileId,
          categoryId: currentSkill.categoryId,
          subCategoryId: currentSkill.subCategoryId,
          page,
          limit: 10
        }));
        const result = yield take([ActionTypes.FETCH_PROFILE_GALLERY_LIST + ApiActionTypes.SUCCESS, ActionTypes.FETCH_PROFILE_GALLERY_LIST + ApiActionTypes.FAIL])
        if (result.type === ActionTypes.FETCH_PROFILE_GALLERY_LIST + ApiActionTypes.SUCCESS) {
          const item = list[index];
          yield put(fetchProfileGalleryItemCommentList({
            type: 'gallery',
            profileGalleryId: item.id,
            page: 1,
            limit: 10
          }));
          yield put(setProfileGalleryCurrentItem(item));
        }

      } else {
        yield put(setProfileGalleryCurrentItem(list[index]));
        yield put(fetchProfileGalleryItemCommentList({
          type: 'gallery',
          profileGalleryId: list[index].id,
          page: 1,
          limit: 10
        }));
      }

    })
  yield takeLatest(ActionTypes.UPDATE_PROFILE_GALLERY,
    function* (action: ActionType<typeof updateProfileGallery>) {
      yield put(updateProfileGalleryRequest(action.payload.id, action.payload.data));
      const result = yield take([ActionTypes.UPDATE_PROFILE_GALLERY_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_PROFILE_GALLERY_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.UPDATE_PROFILE_GALLERY_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("UPDATE_PROFILE_GALLERY SUCCESS")
        if (action.payload.formKey) {
          yield put(hideProfileForm(action.payload.formKey));
        }

      }
    })

  yield takeLatest(ActionTypes.DELETE_PROFILE_GALLERY,
    function* (action: ActionType<typeof deleteProfileGallery>) {
      yield put(confirmChangeData({loading: true}));
      yield put(deleteProfileGalleryRequest(action.payload.id));
      const result = yield take([ActionTypes.DELETE_PROFILE_GALLERY_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_PROFILE_GALLERY_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.DELETE_PROFILE_GALLERY_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("DELETE SKILL SUCCESS")
        yield put(modalClose());

      }
    })

  yield takeLatest(ActionTypes.CREATE_PROFILE_GALLERY_COMMENT, function* (action: ActionType<any>) {
    const res = yield requestGen({
      url: `/api/comment`,
      method: 'POST',
      data: action.payload.data,
    })


    if (res.err) {
      yield put(createProfileGalleryCommentFailed(res.err))
    } else {
      console.log("CommentSuccess");

      yield put(createProfileGalleryCommentSuccess(res.data))
      if(action.payload.onSuccess){
        action.payload.onSuccess();
      }
    }
  })
}

export default ProfileGallerySaga
