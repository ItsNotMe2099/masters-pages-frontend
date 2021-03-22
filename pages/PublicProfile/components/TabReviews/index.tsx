import Button from "components/ui/Button";
import Comment from "./components/Comment";
import * as React from "react";
import styles from './index.module.scss'
import { DropDown } from "components/ui/DropDown";
import { DropDownInput } from "components/ui/DropDownInput";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchFeedbacksToProfile, setPageFeedback } from "components/ProfileFeedback/actions";
import { IFeedbacksToProfile, IRootState } from "types";
import Loader from "components/ui/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {

}
const TabReviews = (props: Props) => {
  const options = [{label: 'New first', value: 'New first'}, {label: 'Old first', value: 'Old first'}]
  const feedbacks = useSelector((state: IRootState) => state.profileFeedback.list)
  const loading = useSelector((state: IRootState) => state.profileFeedback.isLoading)
  const total = useSelector((state: IRootState) => state.profileFeedback.total)
  const page = useSelector((state: IRootState) => state.profileFeedback.page)
  const [load, setLoadMore] = useState(false)
  const dispatch = useDispatch()
  const handleScrollNext = () => {
    console.log("HandleNext", page)
    dispatch(setPageFeedback(page + 1))
    dispatch(fetchFeedbacksToProfile())
  }
  useEffect(() => {
    dispatch(fetchFeedbacksToProfile())
  }, [])
  return (
    <div className={styles.root}>
      <div className={styles.top}>
      <div>
        <div className={styles.percent}>95%</div>
        <div className={styles.greenText}>Positive reviews based on {total}</div>
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
          {(load ? feedbacks : feedbacks.slice(0, 1)).map(item => <Comment item={item}/>)}
        </InfiniteScroll>}
    </div>
  )
}

export default TabReviews
