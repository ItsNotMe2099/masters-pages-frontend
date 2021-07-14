import Button from "components/ui/Button";

import * as React from "react";
import styles from './index.module.scss'
import { DropDownInput } from "components/ui/DropDownInput";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchFeedbacksToProfile, setPageFeedback } from "components/ProfileFeedback/actions";
import { IFeedbacksToProfile, IRootState } from "types";
import Loader from "components/ui/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";
import Review from "components/Review";
import {getAuthServerSide} from 'utils/auth'
import Layout from 'components/layout/Layout'
import {useTranslation} from 'react-i18next'

interface Props {
  t?: (string) => string,
}
const TabReviews = (props: Props) => {
  const options = [{label: 'New first', value: 'New first'}, {label: 'Old first', value: 'Old first'}]
  const feedbacks = useSelector((state: IRootState) => state.profileFeedback.list)
  const loading = useSelector((state: IRootState) => state.profileFeedback.isLoading)
  const total = useSelector((state: IRootState) => state.profileFeedback.total)
  const page = useSelector((state: IRootState) => state.profileFeedback.page)
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const [load, setLoadMore] = useState(false)
  const dispatch = useDispatch()
  const { t } = useTranslation('common');
  const limit = 10;
  const handleScrollNext = () => {
    console.log("HandleNext", page)

    dispatch(fetchFeedbacksToProfile({
      profileId: profile.id,
      page: page + 1,
      limit,
    }))
    dispatch(setPageFeedback(page + 1))
  }
  useEffect(() => {
    dispatch(fetchFeedbacksToProfile({
      profileId: profile.id,
      page: page + 1,
      limit,
      }
    ))
  }, [])
  return (
    <Layout>
    <div className={styles.root}>
      <div className={styles.top}>
      <div>
        <div className={styles.percent}>95%</div>
        <div className={styles.greenText}>{t('positiveReviews')} {total}</div>
      </div>
      <div className={styles.simpleText}>Lorem ipsum dolor sit amet, consectetur adipiscing<br/> elit. Fermentum mattis sed quam enim.</div>
      <div className={styles.dropdown}>
        <DropDownInput
        options={options} item={(item) =>
        <div className={styles.value}>{item?.label}</div>}/></div>
      </div>
      {(loading && total > 0) && <Loader/>}
        {total > 0 && <InfiniteScroll
          dataLength={feedbacks.length} //This is important field to render the next data
          next={handleScrollNext}
          hasMore={total > feedbacks.length}
          loader={<Loader/>}>
          {(load ? feedbacks : feedbacks.slice(0, 1)).map(item => <Review item={item}/>)}
        </InfiniteScroll>}

    </div>
    </Layout>
  )
}

export default TabReviews
export const getServerSideProps = getAuthServerSide({redirect: true});
