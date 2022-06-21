import * as React from 'react'
import styles from './index.module.scss'
import { IFeedbacksToProfile } from 'types'
import format from 'date-fns/format'
import ReviewAvatar from './components/ReviewAvatar'

interface Props {
  item: IFeedbacksToProfile
}
const Review = (props: Props) => {
  const { item } = props
  return (
    <div className={styles.root}>
    <div className={styles.commentTop}>
      <div className={styles.top}>
        <ReviewAvatar item={item}/>
          <div className={styles.date}>
          {format(new Date(item.createdAt), 'MM/dd/yyy hh:mm')}
          </div>
      </div>
      <div className={styles.taskText}>
        <div className={styles.title}>{item.task?.title}</div>
        <div className={styles.text}>{item.task?.description}</div>
        <div className={styles.images}>
          <img src="/img/icons/Rectangle 1134431.png" alt=""/>
          <img src="/img/icons/Rectangle 1134432.png" alt=""/>
          <div className={styles.number}><span>+15</span></div>
        </div>
      </div>
    </div>
        <div className={styles.commentBottom}>
          <div className={styles.comment}>
            <ReviewAvatar mini item={item}/>
            <div className={styles.textSection}>{item.description}</div>
            <div className={styles.images}>
              <img src="/img/icons/Rectangle 1134431.png" alt=""/>
              <img src="/img/icons/Rectangle 1134432.png" alt=""/>
              <div className={styles.number}><span>+3</span></div>
          </div>
          </div>
          <img className={styles.arrow} src="/img/icons/commentArrow.svg" alt=""/>
        </div>
      </div>
  )
}

export default Review
