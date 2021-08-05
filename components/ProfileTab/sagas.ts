import { confirmChangeData, modalClose } from "components/Modal/actions";

import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
import {hideProfileForm} from 'components/Profile/actions'
import {
  createProfileTab, createProfileTabRequest,
  deleteProfileTab, deleteProfileTabRequest, fetchProfileTabList,
  updateProfileTab, updateProfileTabRequest
} from 'components/ProfileTab/actions'
function* ProfileTabSaga() {
  yield takeLatest('ProfileTab/CREATE_PROFILE_TAB',
    function* (action: ActionType<typeof createProfileTab>) {
      yield put(createProfileTabRequest(action.payload.data));
      const result = yield take([ActionTypes.CREATE_PROFILE_TAB_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_PROFILE_TAB_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.CREATE_PROFILE_TAB_REQUEST + ApiActionTypes.SUCCESS){
        if(action.payload.formKey) {
          yield put(hideProfileForm(action.payload.formKey));
        }
        const currentSkill = yield select((state: IRootState) => state.profile.currentSkill)
        yield put(fetchProfileTabList({profileId:currentSkill.profileId, categoryId: currentSkill.categoryId, subCategoryId: currentSkill.subCategoryId }));

      }
    })
  yield takeLatest(ActionTypes.UPDATE_PROFILE_TAB,
    function* (action: ActionType<typeof updateProfileTab>) {
      yield put(updateProfileTabRequest(action.payload.id, action.payload.data));
      const result = yield take([ActionTypes.UPDATE_PROFILE_TAB_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_PROFILE_TAB_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.UPDATE_PROFILE_TAB_REQUEST + ApiActionTypes.SUCCESS){
        if(action.payload.formKey) {
          yield put(hideProfileForm(action.payload.formKey));
        }
      }
    })

  yield takeLatest(ActionTypes.DELETE_PROFILE_TAB,
    function* (action: ActionType<typeof deleteProfileTab>) {
      yield put(confirmChangeData({loading: true}));
      yield put(deleteProfileTabRequest(action.payload.id));
      const result = yield take([ActionTypes.DELETE_PROFILE_TAB_REQUEST+ ApiActionTypes.SUCCESS, ActionTypes.DELETE_PROFILE_TAB_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.DELETE_PROFILE_TAB_REQUEST + ApiActionTypes.SUCCESS){
        if(action.payload.onDelete) {
          action.payload.onDelete();
        }
        yield put(modalClose());
        yield put(hideProfileForm(action.payload.formKey));
      //  yield put(fetchSkillList());
      }
    })
}

export default ProfileTabSaga
