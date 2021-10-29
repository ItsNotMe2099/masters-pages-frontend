import {
  fetchProfileSearchList,
  fetchProfileSearchListRequest
} from "components/ProfileSearch/actions";

import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
import {removeObjectEmpty} from 'utils/array'


function* ProfileSearchSaga() {
  yield takeLatest(ActionTypes.FETCH_PROFILE_SEARCH,
    function* (action: ActionType<typeof fetchProfileSearchList>) {
      const useLocationFilter = yield select((state: IRootState) => state.profileSearch.useLocationFilter)
      const exactLocation = yield select((state: IRootState) => state.profileSearch.exactLocation)
      const masterRole = yield select((state: IRootState) => state.profileSearch.role)
      const filter = yield select((state: IRootState) => state.profileSearch.filter)
      const sort = yield select((state: IRootState) => state.profileSearch.sort)
      const sortOrder = yield select((state: IRootState) => state.profileSearch.sortOrder)
      const page = yield select((state: IRootState) => state.profileSearch.page)
      console.log("FilterDataFetch", filter);
      yield put(fetchProfileSearchListRequest({
          ...removeObjectEmpty(filter),
          sort,
        sortOrder,
          page,
        ...(useLocationFilter ? {exactLocation} : {}),
          limit: 10,
        ...action.payload,
        masterRole
        }));

    })


}

export default ProfileSearchSaga
