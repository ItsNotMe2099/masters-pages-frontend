import ApiActionTypes from 'constants/api'
import {takeLatest, put, take} from 'redux-saga/effects'
import {ActionType} from 'typesafe-actions'
import {action as Action} from 'typesafe-actions'
import ActionTypes from './const'
import {
  hideOrganizationForm, updateOrganization, updateOrganizationAvatar, updateOrganizationByForm
} from './actions'

function* OrganizationSaga() {


  yield takeLatest(ActionTypes.UPDATE_ORG_AVATAR,
    function* (action: ActionType<typeof updateOrganizationAvatar>) {

      yield put(updateOrganization(action.payload.id, action.payload.data))
      const result = yield take([ActionTypes.UPDATE_ORG + ApiActionTypes.FAIL, ActionTypes.UPDATE_ORG + ApiActionTypes.SUCCESS])
      if (result.type === ActionTypes.UPDATE_ORG + ApiActionTypes.FAIL) {
        yield put(Action(ActionTypes.UPDATE_ORG_AVATAR + ApiActionTypes.FAIL, result.payload))
      }
      if (result.type === ActionTypes.UPDATE_ORG + ApiActionTypes.SUCCESS) {
        if(action.payload.formKey){
          yield put(hideOrganizationForm(action.payload.formKey))
        }
      }
    })

  yield takeLatest(ActionTypes.UPDATE_ORG_BY_FORM,
    function* (action: ActionType<typeof updateOrganizationByForm>) {
      yield put(updateOrganization(action.payload.id, action.payload.data))
      const result = yield take([ActionTypes.UPDATE_ORG + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_ORG + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.UPDATE_ORG + ApiActionTypes.SUCCESS) {
        yield put(hideOrganizationForm(action.payload.key))
      }
    })
}

export default OrganizationSaga
