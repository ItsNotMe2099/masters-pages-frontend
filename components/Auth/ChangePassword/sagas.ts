import { modalClose } from 'components/Modal/actions'
import { changePassword, changePasswordError, changePasswordSuccess } from 'components/Auth/ChangePassword/actions'
import { takeLatest, put } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import requestGen from 'utils/requestGen'
import ActionTypes from './const'
import { IRequestData, IResponse } from 'types'
function* signInSaga() {


  yield takeLatest(ActionTypes.CHANGE_PASSWORD,
    function* (action: ActionType<typeof changePassword>) {

      const res: IResponse = yield requestGen({
        url: '/api/auth/resetPassByCurrentUser',
        method: 'POST',
        data: action.payload,
      } as IRequestData)
      if(!res.err){
        yield put(changePasswordSuccess())
        yield put(modalClose())
      }else{
        yield put(changePasswordError(res.err))
      }

    })

}

export default signInSaga
