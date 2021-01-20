import Button from "components/ui/Button";
import Comment from "./components/Comment";
import * as React from "react";
import styles from './index.module.scss'
import { DropDown } from "components/ui/DropDown";
import { DropDownInput } from "components/ui/DropDownInput";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchFeedbacksToProfile } from "components/ProfileFeedback/actions";
import { IFeedbacksToProfile, IRootState } from "types";

interface Props {

}
const TabReviews = (props: Props) => {
  const options = [{label: 'New first', value: 'New first'}, {label: 'Old first', value: 'Old first'}]
  const feedbacks = useSelector((state: IRootState) => state.profileFeedback.list)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchFeedbacksToProfile())
  }, [])
  return (
    <div className={styles.root}>
      <div className={styles.top}>
      <div>
        <div className={styles.percent}>95%</div>
        <div className={styles.greenText}>Positive reviews based on 423</div>
      </div>
      <div className={styles.simpleText}>Lorem ipsum dolor sit amet, consectetur adipiscing<br/> elit. Fermentum mattis sed quam enim.</div>
      <div className={styles.dropdown}>
        <DropDownInput 
        options={options} item={(item) => 
        <div className={styles.value}>{item?.label}</div>}/></div>
      </div>
      {feedbacks.map(item => <Comment item={item}/>)}
      <div className={styles.btnContainer}><Button black size="20px 40px"><span>Load more (434)</span></Button></div>
    </div>
  )
}

export default TabReviews
