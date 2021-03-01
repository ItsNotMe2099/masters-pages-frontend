import {useTranslation, withTranslation} from "react-i18next";
import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import Header from '../../components/layout/Header'
import {useEffect} from "react";

import { useDispatch, useSelector } from 'react-redux'
import {
  createFeedBackSiteRequest, fetchFeedbacksSiteRequest,
  fetchFeedbacksToProfile,
  resetFeedbackList,
  setPageFeedback
} from "../../components/ProfileFeedback/actions";
import Loader from "../../components/ui/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

import * as React from "react";
import {IRootState} from "../../types";
import ReviewMainPage from "../../components/ReviewMainPage";
const SiteReviews = (props) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch()
  const loading = useSelector((state: IRootState) => state.profileFeedback.isLoading)
  const list = useSelector((state: IRootState) => state.profileFeedback.list)
  const total = useSelector((state: IRootState) => state.profileFeedback.total)
  const page = useSelector((state: IRootState) => state.profileFeedback.page)

  useEffect(() => {
    dispatch(resetFeedbackList());
    dispatch(setPageFeedback(1));
    dispatch(fetchFeedbacksSiteRequest({page: 1, limit: 30}));
  }, [])
  useEffect(() => {
    return () => {
      dispatch(resetFeedbackList());
    }
  }, []);

  const handleScrollNext = () => {
    dispatch(setPageFeedback(page + 1))
    dispatch(fetchFeedbacksSiteRequest({page: page + 1, limit: 30}))
  }
  return (
    <>
    <Header {...props}/>
    <div className={styles.container}>
      <h1>Reviews</h1>
      {(loading && total === 0) && <Loader/>}
      {total > 0 && <InfiniteScroll
        dataLength={list.length} //This is important field to render the next data
        next={handleScrollNext}
        hasMore={total > list.length}
        loader={loading ? <Loader/> : null}>
        {list.map(item => <ReviewMainPage feedback={item}/>)}
      </InfiniteScroll>}
    </div>
    </>
  )
}

export const getServerSideProps = getAuthServerSide();
export default SiteReviews
