import { confirmChangeData, modalClose } from "components/Modal/actions";
import {
  createSkill, createSkillCategory, createSkillCategoryRequest,
  createSkillRequest, deleteSkill, deleteSkillCategory, deleteSkillCategoryRequest, deleteSkillRequest,
  fetchSkillList,
  updateSkill,
  updateSkillRequest
} from "components/Skill/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
function* SkillSaga() {
  yield takeLatest(ActionTypes.CREATE_SKILL_CATEGORY,
    function* (action: ActionType<typeof createSkillCategory>) {
      yield put(createSkillCategoryRequest(action.payload.profileId, action.payload.data));
      const result = yield take([ActionTypes.CREATE_SKILL_CATEGORY_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_SKILL_CATEGORY_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.CREATE_SKILL_CATEGORY_REQUEST + ApiActionTypes.SUCCESS){
        console.log("CREATE SKILL SUCCESS")
        yield put(modalClose());
        const profile = yield select((state: IRootState) => state.profile.currentProfile)
        yield put(fetchSkillList(profile.id));
      }
    })
  yield takeLatest(ActionTypes.CREATE_SKILL,
    function* (action: ActionType<typeof createSkill>) {
      yield put(createSkillRequest(action.payload.profileId, action.payload.data));
      const result = yield take([ActionTypes.CREATE_SKILL_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_SKILL_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.CREATE_SKILL_REQUEST + ApiActionTypes.SUCCESS){
        console.log("CREATE SKILL SUCCESS")
        yield put(modalClose());
        const profile = yield select((state: IRootState) => state.profile.currentProfile)
        yield put(fetchSkillList(profile.id));
      }
    })
  yield takeLatest(ActionTypes.UPDATE_SKILL,
    function* (action: ActionType<typeof updateSkill>) {
      yield put(updateSkillRequest(action.payload.profileId, action.payload.skillId, action.payload.data));
      const result = yield take([ActionTypes.UPDATE_SKILL_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_SKILL_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.UPDATE_SKILL_REQUEST + ApiActionTypes.SUCCESS){
        console.log("UPDATE SKILL SUCCESS")
        yield put(modalClose());
        const profile = yield select((state: IRootState) => state.profile.currentProfile)
        yield put(fetchSkillList(profile.id));
      }
    })
  yield takeLatest(ActionTypes.DELETE_SKILL,
    function* (action: ActionType<typeof deleteSkill>) {
      yield put(confirmChangeData({loading: true}));
      yield put(deleteSkillRequest(action.payload.profileId, action.payload.skillId));
      const result = yield take([ActionTypes.DELETE_SKILL_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_SKILL_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.DELETE_SKILL_REQUEST + ApiActionTypes.SUCCESS){
        console.log("DELETE SKILL SUCCESS")
        yield put(modalClose());
        const profile = yield select((state: IRootState) => state.profile.currentProfile)
        yield put(fetchSkillList(profile.id));
      }
    })
  yield takeLatest(ActionTypes.DELETE_SKILL_CATEGORY,
    function* (action: ActionType<typeof deleteSkillCategory>) {
      yield put(confirmChangeData({loading: true}));
      yield put(deleteSkillCategoryRequest(action.payload.profileId, action.payload.categoryId));
      const result = yield take([ActionTypes.DELETE_SKILL_CATEGORY_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_SKILL_CATEGORY_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.DELETE_SKILL_CATEGORY_REQUEST + ApiActionTypes.SUCCESS){
        console.log("DELETE SKILL category SUCCESS")
        yield put(modalClose());
        const profile = yield select((state: IRootState) => state.profile.currentProfile)
        yield put(fetchSkillList(profile.id));
      }
    })
}

export default SkillSaga
