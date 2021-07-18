import * as React from "react";
import {IEvent, IFeedbacksToProfile, IRootState, ITask, SkillData, SkillListItem} from "types";
import styles from './index.module.scss'
import StarRatings from 'react-star-ratings';
interface Props {
  feedback: IFeedbacksToProfile
}

let EventFeedback = ({feedback}: Props) => {
  return (
   <div className={styles.root}>
    <div className={styles.header}>
      <div className={styles.title}>{feedback.title}</div>
      <StarRatings
        rating={feedback.eventId ? feedback.mark || 0 : feedback.totalMark || 0}
        starRatedColor="#F2B705"
        starEmptyColor={'#616161'}
        numberOfStars={Math.ceil(feedback.eventId ? feedback.mark || 0 : feedback.totalMark || 0)}
        name='rating'
        svgIconPath={'M4.08729 13.7644C3.74325 13.9408 3.35287 13.6316 3.42239 13.2367L4.16216 9.0209L1.02213 6.02971C0.728899 5.74985 0.88131 5.23824 1.27437 5.18298L5.63993 4.56264L7.58651 0.706016C7.7621 0.358411 8.23716 0.358411 8.41274 0.706016L10.3593 4.56264L14.7249 5.18298C15.1179 5.23824 15.2704 5.74985 14.9771 6.02971L11.8371 9.0209L12.5769 13.2367C12.6464 13.6316 12.256 13.9408 11.912 13.7644L7.99829 11.7536L4.0864 13.7644H4.08729Z'}
        svgIconViewBox={'0 0 16 14'}
        starDimension={'16px'}
        starSpacing={'1px'}
      />
    </div>
     <div className={styles.message}>{feedback.description}</div>
   </div>
  )
}

export default EventFeedback