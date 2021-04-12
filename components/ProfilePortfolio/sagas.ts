import { confirmChangeData, modalClose } from "components/Modal/actions";

import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
import {hideProfileForm} from 'components/Profile/actions'
import {
  createProfilePortfolio, createProfilePortfolioRequest,
  deleteProfilePortfolio, deleteProfilePortfolioRequest, fetchProfilePortfolioList,
  updateProfilePortfolio, updateProfilePortfolioRequest
} from 'components/ProfilePortfolio/actions'
function* ProfilePortfolioSaga() {
  console.log("ProfilePortfolioSaga")
  yield takeLatest(ActionTypes.CREATE_PROFILE_PORTFOLIO,
    function* (action: ActionType<typeof createProfilePortfolio>) {
    console.log("Create");
      yield put(createProfilePortfolioRequest(action.payload.data));
      const result = yield take([ActionTypes.CREATE_PROFILE_PORTFOLIO_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_PROFILE_PORTFOLIO_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.CREATE_PROFILE_PORTFOLIO_REQUEST + ApiActionTypes.SUCCESS){
        console.log("CREATE SKILL SUCCESS")
        if(action.payload.formKey) {
          yield put(hideProfileForm(action.payload.formKey));
        }
        const currentSkill = yield select((state: IRootState) => state.profile.currentSkill)
        const currentProfileTab = yield select((state: IRootState) => state.profilePortfolio.currentProfileTab)

      }
    })
  yield takeLatest(ActionTypes.UPDATE_PROFILE_PORTFOLIO,
    function* (action: ActionType<typeof updateProfilePortfolio>) {
      yield put(updateProfilePortfolioRequest(action.payload.id, action.payload.data));
      const result = yield take([ActionTypes.UPDATE_PROFILE_PORTFOLIO_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.UPDATE_PROFILE_PORTFOLIO_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.UPDATE_PROFILE_PORTFOLIO_REQUEST + ApiActionTypes.SUCCESS){
        console.log("UPDATE_PROFILE_PORTFOLIO SUCCESS")
        if(action.payload.formKey) {
          yield put(hideProfileForm(action.payload.formKey));
        }

      }
    })

  yield takeLatest(ActionTypes.DELETE_PROFILE_PORTFOLIO,
    function* (action: ActionType<typeof deleteProfilePortfolio>) {
      yield put(confirmChangeData({loading: true}));
      yield put(deleteProfilePortfolioRequest(action.payload.id));
      const result = yield take([ActionTypes.DELETE_PROFILE_PORTFOLIO_REQUEST+ ApiActionTypes.SUCCESS, ActionTypes.DELETE_PROFILE_PORTFOLIO_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.DELETE_PROFILE_PORTFOLIO_REQUEST + ApiActionTypes.SUCCESS){
        console.log("DELETE SKILL SUCCESS")
        yield put(modalClose());

      }
    })
}

export default ProfilePortfolioSaga
