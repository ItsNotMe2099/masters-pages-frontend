import { confirmChangeData, modalClose } from 'components/Modal/actions'

import ApiActionTypes from 'constants/api'
import { takeLatest, put, take } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
import {hideProfileForm} from 'components/Profile/actions'
import {
  createProfileWorkExperience, createProfileWorkExperienceRequest,
  deleteProfileWorkExperience, deleteProfileWorkExperienceRequest,
  updateProfileWorkExperience, updateProfileWorkExperienceRequest
} from 'components/ProfileWorkExpirience/actions'
function* ProfileWorkExperienceSaga() {
  yield takeLatest('ProfileWorkExperience/CREATE_WORK_EXPERIENCE',
    function* (action: ActionType<typeof createProfileWorkExperience>) {
      yield put(createProfileWorkExperienceRequest(action.payload.data))
      const result = yield take([ActionTypes.CREATE_WORK_EXPERIENCE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_WORK_EXPERIENCE_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.CREATE_WORK_EXPERIENCE_REQUEST + ApiActionTypes.SUCCESS){
        if(action.payload.formKey) {
          yield put(hideProfileForm(action.payload.formKey))
        }

      }
    })
  yield takeLatest(ActionTypes.UPDATE_WORK_EXPERIENCE,
    function* (action: ActionType<typeof updateProfileWorkExperience>) {
      yield put(updateProfileWorkExperienceRequest(action.payload.id, action.payload.data))
      const result = yield take([ActionTypes.UPDATE_WORK_EXPERIENCE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_WORK_EXPERIENCE_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.UPDATE_WORK_EXPERIENCE_REQUEST + ApiActionTypes.SUCCESS){
        if(action.payload.formKey) {
          yield put(hideProfileForm(action.payload.formKey))
        }
      }
    })

  yield takeLatest(ActionTypes.DELETE_WORK_EXPERIENCE,
    function* (action: ActionType<typeof deleteProfileWorkExperience>) {
      yield put(confirmChangeData({loading: true}))
      yield put(deleteProfileWorkExperienceRequest(action.payload.id))
      const result = yield take([ActionTypes.DELETE_WORK_EXPERIENCE_REQUEST+ ApiActionTypes.SUCCESS, ActionTypes.DELETE_WORK_EXPERIENCE_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.DELETE_WORK_EXPERIENCE_REQUEST + ApiActionTypes.SUCCESS){
        yield put(modalClose())
      }
    })
}

export default ProfileWorkExperienceSaga
