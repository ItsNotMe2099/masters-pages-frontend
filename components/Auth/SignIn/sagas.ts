import {modalClose} from 'components/Modal/actions'
import { signInError, signInSubmit } from 'components/Auth/SignIn/actions'
import { takeLatest, put } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import requestGen from 'utils/requestGen'
import ActionTypes from './const'
import { IRequestData, IResponse } from 'types'
import cookie from 'js-cookie'
import {afterAuthRedirect} from 'utils/authRedirect'
import {reachGoal} from 'utils/ymetrika'
function* signInSaga() {


  yield takeLatest(ActionTypes.SIGN_IN_SUBMIT,
    function* (action: ActionType<typeof signInSubmit>) {
      const res: IResponse = yield requestGen({
        url: '/api/auth/login',
        method: 'POST',
        data: action.payload,
      } as IRequestData)
      if(!res.err){
        cookie.set('token', res.data.accessToken, { expires: 365 * 3 })
        reachGoal('auth:login:login')
        yield put(modalClose())
        afterAuthRedirect()
      }else{
        yield put(signInError(res.err))
      }

    })

}

export default signInSaga
