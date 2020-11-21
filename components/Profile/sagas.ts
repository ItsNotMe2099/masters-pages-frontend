import ApiActionTypes from "constants/api";
import { takeLatest, put, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import requestGen from "utils/requestGen";
import ActionTypes from './const'
import { changeRole, changeRoleSuccess, createProfile, fetchProfileSuccess } from './actions'
import { IRequestData, IResponse, IRootState } from 'types'
import Router from "next/router";
import cookie from "js-cookie";
function* ProfileSaga() {
  yield takeLatest(ActionTypes.CHANGE_ROLE,
    function* (action: ActionType<typeof changeRole>) {
      console.log("CHANGREROLECALL");
      const res: IResponse = yield requestGen({
        url: `/api/profile/role/${action.payload.role}`,
        method: 'GET',
      } as IRequestData)


      console.log("Res_err", res.data);
      if(res.err){

      }else if(res.data && res.data.id){
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

  yield takeLatest(ActionTypes.CHANGE_ROLE,
    function* (action: ActionType<typeof changeRole>) {
      console.log("CHANGREROLECALL");
      const res: IResponse = yield requestGen({
        url: `/api/profile/role/${action.payload.role}`,
        method: 'GET',
      } as IRequestData)


      console.log("Res_err", res.data);
      if(res.err){

      }else if(res.data && res.data.id){
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

}

export default ProfileSaga
