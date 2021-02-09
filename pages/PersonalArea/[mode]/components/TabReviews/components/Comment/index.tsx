import Avatar from "../../components/Avatar";
import * as React from "react";
import styles from './index.module.scss'
import { IFeedbacksToProfile, IRootState } from "types";
import format from 'date-fns/format'
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux'

interface Props {
  item: IFeedbacksToProfile
}
const Comment = (props: Props) => {
  const { item } = props
  return (
    <div className={styles.root}>
    <div className={styles.commentTop}>
      <div className={styles.top}>
        <Avatar item={item}/>
          <div className={styles.date}>
          {format(new Date(item.task.updatedAt), 'MM/dd/yyy hh:mm')}
          </div>
      </div>
      <div className={styles.taskText}>
        <div className={styles.title}>{item.task.title}</div>
        <div className={styles.text}>{item.task.description}</div>
        <div className={styles.images}>
          <img src="/img/icons/Rectangle 1134431.png" alt=""/>
          <img src="/img/icons/Rectangle 1134432.png" alt=""/>
          <div className={styles.number}><span>+15</span></div>
        </div>
      </div>
    </div>
        <div className={styles.commentBottom}>
          <div className={styles.comment}>
            <Avatar mini item={item}/>
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

export default Comment
