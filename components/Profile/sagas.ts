import ApiActionTypes from "constants/api";
import {takeLatest, put, select, take} from 'redux-saga/effects'
import {ActionType} from 'typesafe-actions'
import requestGen from "utils/requestGen";
import {action as Action} from 'typesafe-actions'
import ActionTypes from './const'
import {
  changeProfileEmail,
  changeRole,
  changeRoleSuccess,
  createProfile,
  deleteProfile,
  deleteProfileRequest, fetchProfile,
  fetchProfileSuccess, hideProfileForm, updateProfile, updateProfileAvatar, updateProfileByForm
} from './actions'
import {IRequestData, IResponse, IRootState} from 'types'
import Router from "next/router";
import cookie from "js-cookie";
import {setPushTokenRequest} from "../Push/actions";
import {confirmChangeData, modalClose} from "../Modal/actions";
import {logout} from "../Auth/actions";
import {meRedirect} from 'utils/auth'
import {reachGoal} from 'utils/ymetrika'

function* ProfileSaga() {
  yield takeLatest(ActionTypes.CHANGE_ROLE,
    function* (action: ActionType<typeof changeRole>) {
      const res: IResponse = yield requestGen({
        url: `/api/profile/role/${action.payload.role}`,
        method: 'GET',
      } as IRequestData)

      if (!res.err && res.data && res.data.id) {
        cookie.set('mode', action.payload.role, {expires: 60 * 60* 24 * 365});
        meRedirect()
      } else {
        switch (action.payload.role) {
          case 'client':
            Router.push("/RegistrationPage");
            break;
          case 'master':
            Router.push("/MasterProfile");
            break;
          case 'volunteer':
            Router.push("/VolunteerProfile");
            break;
        }
      }

    })

  yield takeLatest(ActionTypes.CHANGE_ROLE_NATIVE,
    function* (action: ActionType<typeof changeRole>) {
      yield put(changeRoleSuccess(action.payload.role));
    })

  yield takeLatest(ActionTypes.CREATE_PROFILE,
    function* (action: ActionType<typeof createProfile>) {
      const res: IResponse = yield requestGen({
        url: `/api/profile/${action.payload.role}`,
        method: 'POST',
        data: action.payload.data
      } as IRequestData)


      if (res.err) {

        yield put({type: ActionTypes.CREATE_PROFILE + ApiActionTypes.FAIL, payload: {error: res.err}});
      } else if (res.data && res.data.id) {
        cookie.set('mode', action.payload.role, {expires: 60 * 60* 24 * 365});

        yield put({type: ActionTypes.CREATE_PROFILE + ApiActionTypes.SUCCESS});
        yield put(changeRoleSuccess(action.payload.role));
        reachGoal('profile:create', {role: action.payload.role})
        Router.push('/me')
      }

    })


  yield takeLatest(ActionTypes.DELETE_PROFILE,
    function* (action: ActionType<typeof deleteProfile>) {
      yield put(confirmChangeData({loading: true}));

      yield put(deleteProfileRequest(action.payload.role));
      const result = yield take([ActionTypes.DELETE_PROFILE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_PROFILE_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.DELETE_PROFILE_REQUEST + ApiActionTypes.SUCCESS) {
        yield put(logout());
      }

    })

  yield takeLatest(ActionTypes.CHANGE_EMAIL,
    function* (action: ActionType<typeof changeProfileEmail>) {

      yield put(updateProfile(action.payload.id, {email: action.payload.email}));
      const result = yield take([ActionTypes.UPDATE_PROFILE + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_PROFILE + ApiActionTypes.FAIL])

    })
  yield takeLatest(ActionTypes.UPDATE_PROFILE_AVATAR,
    function* (action: ActionType<typeof updateProfileAvatar>) {

      yield put(updateProfile(action.payload.id, action.payload.data));
      const result = yield take([ActionTypes.UPDATE_PROFILE + ApiActionTypes.FAIL, ActionTypes.UPDATE_PROFILE + ApiActionTypes.SUCCESS])
      if (result.type === ActionTypes.UPDATE_PROFILE + ApiActionTypes.FAIL) {
        yield put(Action(ActionTypes.UPDATE_PROFILE_AVATAR + ApiActionTypes.FAIL, result.payload));
      }
      if (result.type === ActionTypes.UPDATE_PROFILE + ApiActionTypes.SUCCESS) {
        if(action.payload.formKey){
          yield put(hideProfileForm(action.payload.formKey));
        }
      }
    })

  yield takeLatest(ActionTypes.UPDATE_PROFILE_BY_FORM,
    function* (action: ActionType<typeof updateProfileByForm>) {
      yield put(updateProfile(action.payload.id, action.payload.data));
      const result = yield take([ActionTypes.UPDATE_PROFILE + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_PROFILE + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.UPDATE_PROFILE + ApiActionTypes.SUCCESS) {
        yield put(hideProfileForm(action.payload.key));
      }
    })
}

export default ProfileSaga
