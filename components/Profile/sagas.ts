import ApiActionTypes from "constants/api";
import {takeLatest, put, select, take} from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import requestGen from "utils/requestGen";
import ActionTypes from './const'
import {
  changeProfileEmail,
  changeRole,
  changeRoleSuccess,
  createProfile,
  deleteProfile,
  deleteProfileRequest,
  fetchProfileSuccess, updateProfile
} from './actions'
import { IRequestData, IResponse, IRootState } from 'types'
import Router from "next/router";
import cookie from "js-cookie";
import {setPushTokenRequest} from "../Push/actions";
import {confirmChangeData, modalClose} from "../Modal/actions";
import {logout} from "../Auth/actions";
function* ProfileSaga() {
  yield takeLatest(ActionTypes.CHANGE_ROLE,
    function* (action: ActionType<typeof changeRole>) {
      console.log("CHANGREROLECALL");
      const res: IResponse = yield requestGen({
        url: `/api/profile/role/${action.payload.role}`,
        method: 'GET',
      } as IRequestData)

      if(!res.err && res.data && res.data.id){
        cookie.set('mode', action.payload.role);
        yield put(changeRoleSuccess(action.payload.role));
        yield put(fetchProfileSuccess(res.data));
      }else{
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
      console.log("CHANGREROLECALL");
      const res: IResponse = yield requestGen({
        url: `/api/profile/${action.payload.role}`,
        method: 'POST',
        data: action.payload.data
      } as IRequestData)


      console.log("Res_err", res.data);
      if(res.err){

        yield put({type: ActionTypes.CREATE_PROFILE + ApiActionTypes.FAIL, payload: {error: res.err}});
      }else if(res.data && res.data.id){
        cookie.set('mode', action.payload.role);

        yield put({type: ActionTypes.CREATE_PROFILE + ApiActionTypes.SUCCESS});
        yield put(changeRoleSuccess(action.payload.role));
        Router.push('/PersonalArea')
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

}

export default ProfileSaga
