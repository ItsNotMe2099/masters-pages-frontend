import * as React from 'react'
import { IFeedbacksToProfile} from 'types'
import styles from './index.module.scss'
import StarRatings from 'react-star-ratings'
import Avatar from 'components/ui/Avatar'
import {format} from 'date-fns'
import {IProfile} from 'data/intefaces/IProfile'
interface Props {
  feedback: IFeedbacksToProfile,
  title?: string
  profile?: IProfile
}

const TaskFeedback = (props: Props) => {
  const {feedback, title} = props
  const profile = feedback.fromProfile || props.profile
  return (
   <div className={styles.root}>
     <div className={styles.header}>
     <div className={styles.profile}><Avatar size={'exSmall'} image={profile.photo}/> {title ? title : `${profile.firstName} ${profile.lastName}`} </div>
     <div className={styles.rating}>
       <StarRatings
       rating={feedback.eventId ? feedback.mark : feedback.totalMark || 0}
       starRatedColor="#F2B705"
       starEmptyColor={'#D7D7D7'}
       numberOfStars={5}
       name='rating'
       svgIconPath={'M4.08729 13.7644C3.74325 13.9408 3.35287 13.6316 3.42239 13.2367L4.16216 9.0209L1.02213 6.02971C0.728899 5.74985 0.88131 5.23824 1.27437 5.18298L5.63993 4.56264L7.58651 0.706016C7.7621 0.358411 8.23716 0.358411 8.41274 0.706016L10.3593 4.56264L14.7249 5.18298C15.1179 5.23824 15.2704 5.74985 14.9771 6.02971L11.8371 9.0209L12.5769 13.2367C12.6464 13.6316 12.256 13.9408 11.912 13.7644L7.99829 11.7536L4.0864 13.7644H4.08729Z'}
       svgIconViewBox={'0 0 16 14'}
       starDimension={'16px'}
       starSpacing={'1px'}
     />
     </div>
       <div className={styles.time}>{format(new Date(feedback.createdAt), 'dd/MM/yyyy HH:mm')}</div>
     </div>
     {feedback.description && <div className={styles.message}>{feedback.description}</div>}
   </div>
  )
}

export default TaskFeedback
