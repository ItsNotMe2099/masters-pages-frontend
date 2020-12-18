import Avatar from "./components/Avatar";
import Comment from "./components/Comment";
import * as React from "react";
import styles from './index.module.scss'
interface Props {

}
const TabReviews = (props: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.top}>
      <div>
        <div className={styles.percent}>95%</div>
        <div className={styles.greenText}>Positive reviews based on 423</div>
      </div>
      <div className={styles.simpleText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum mattis sed quam enim.</div>
      </div>
      <Comment/>
    </div>
  )
}

export default TabReviews
