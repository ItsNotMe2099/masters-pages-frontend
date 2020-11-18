import { createSkill, createSkillRequest, updateSkill, updateSkillRequest } from "components/Skill/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
function* SkillSaga() {
  yield takeLatest(ActionTypes.CREATE_SKILL,
    function* (action: ActionType<typeof createSkill>) {
      yield put(createSkillRequest(action.payload.profileId, action.payload.data));
      const result = yield take([ActionTypes.CREATE_SKILL_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_SKILL_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.CREATE_SKILL_REQUEST + ApiActionTypes.SUCCESS){
        console.log("CREATE SKILL SUCESS")
      }
    })
  yield takeLatest(ActionTypes.UPDATE_SKILL,
    function* (action: ActionType<typeof updateSkill>) {
      yield put(updateSkillRequest(action.payload.profileId, action.payload.skillId, action.payload.data));
      const result = yield take([ActionTypes.UPDATE_SKILL_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_SKILL_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.UPDATE_SKILL_REQUEST + ApiActionTypes.SUCCESS){
        console.log("UPDATE SKILL SUCESS")
      }
    })
  yield takeLatest(ActionTypes.DELETE_SKILL,
    function* (action: ActionType<typeof updateSkill>) {
      yield put(updateSkillRequest(action.payload.profileId, action.payload.skillId, action.payload.data));
      const result = yield take([ActionTypes.DELETE_SKILL_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_SKILL_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.DELETE_SKILL_REQUEST + ApiActionTypes.SUCCESS){
        console.log("DELETE SKILL SUCESS")
      }
    })
}

export default SkillSaga
