import {confirmChangeData, modalClose} from "components/Modal/actions";

import ApiActionTypes from "constants/api";
import {takeLatest, put, take, select} from 'redux-saga/effects'
import {IRootState} from "types";
import {ActionType} from 'typesafe-actions'
import ActionTypes from './const'
import {hideProfileForm} from 'components/Profile/actions'
import {
  createNewsCommentFailed, createNewsCommentSuccess,
  fetchNewsItemCommentList,
  fetchNewsList, setNewsCurrentItem, setNewsCurrentItemIndex,

} from 'components/News/actions'
import requestGen from 'utils/requestGen'


function* NewsSaga() {

  yield takeLatest(ActionTypes.SET_NEWS_CURRENT_INDEX,
    function* (action: ActionType<typeof setNewsCurrentItemIndex>) {
      const index = action.payload;
      const list = yield select((state: IRootState) => state.news.list)
      const currentSkill = yield select((state: IRootState) => state.profile.currentSkill)

      if (index >= list.length) {
        const page = yield select((state: IRootState) => state.news.page);
        const currentProfileTab = yield select((state: IRootState) => state.news.currentProfileTab)
        yield put(fetchNewsList({
          //...(currentProfileTab ? {profileTabId: currentProfileTab.id} : {}),
      //    categoryId: currentSkill.categoryId,
        //  subCategoryId: currentSkill.subCategoryId,
          page,
          limit: 10
        }));
        const result = yield take([ActionTypes.FETCH_NEWS_LIST + ApiActionTypes.SUCCESS, ActionTypes.FETCH_NEWS_LIST + ApiActionTypes.FAIL])
        if (result.type === ActionTypes.FETCH_NEWS_LIST + ApiActionTypes.SUCCESS) {
          const item = list[index];
          yield put(fetchNewsItemCommentList({
            type: 'gallery',
            profileGalleryId: item.id,
            page: 1,
            limit: 10
          }));
          yield put(setNewsCurrentItem(item));
        }

      } else {
        yield put(setNewsCurrentItem(list[index]));
        yield put(fetchNewsItemCommentList({
          type: 'gallery',
          profileGalleryId: list[index].id,
          page: 1,
          limit: 10
        }));
      }

    })


  yield takeLatest(ActionTypes.CREATE_NEWS_COMMENT, function* (action: ActionType<any>) {
    const res = yield requestGen({
      url: `/api/comment`,
      method: 'POST',
      data: action.payload.data,
    })


    if (res.err) {
      yield put(createNewsCommentFailed(res.err))
    } else {

      yield put(createNewsCommentSuccess(res.data))
      if(action.payload.onSuccess){
        action.payload.onSuccess();
      }
    }
  })
}

export default NewsSaga
