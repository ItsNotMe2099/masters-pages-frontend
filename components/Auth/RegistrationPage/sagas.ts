import {registrationSuccessOpen} from 'components/Modal/actions'
import {put, take, takeLatest} from 'redux-saga/effects'
import {ActionType} from 'typesafe-actions'
import requestGen from 'utils/requestGen'
import ActionTypes from './const'
import ProfileActionTypes from 'components/Profile/const'
import {registrationCompleteError, registrationCompleteSubmit, registrationCompleteSuccess} from './actions'
import {IRequestData, IResponse} from 'types'
import cookie from 'js-cookie'
import {fetchProfile} from 'components/Profile/actions'
import ApiActionTypes from 'constants/api'
import {reachGoal} from 'utils/ymetrika'
import {ProfileRole} from 'data/intefaces/IProfile'
import {CookiesType} from 'types/enums'

function* registrationCompleteSaga() {


  yield takeLatest(ActionTypes.REGISTRATION_COMPLETE_SUBMIT,
    function* (action: ActionType<typeof registrationCompleteSubmit>) {
      const res: IResponse = yield requestGen({
        url: '/api/auth/completeRegistration',
        method: 'POST',
        data: action.payload,
      } as IRequestData)
      const isOrganization = !!action.payload.organization
      const role = isOrganization ? ProfileRole.Corporate : ProfileRole.Client


      if(!res.err){
        yield put(registrationCompleteSuccess())
        yield put(registrationSuccessOpen())
          if(action.payload.cb){
            action.payload.cb()
          }
        reachGoal('auth:signup:completed')
      }else{
        yield put(registrationCompleteError(res.err))
      }

    })

}

export default registrationCompleteSaga
