import TaskActionButton from 'components/Task/components/ActionButton'
import { format } from 'date-fns'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ITask } from 'types'
import * as React from "react";


interface Props {
  task: ITask
}

const Description = (props: Props) => {

  const dispatch = useDispatch();
  const handleReadMore = () => {

  }
  const handleShare = () => {

  }
  const handleFavorite = () => {

  }

  return (
    <div className={styles.main}>
    <div className={styles.mainInfo}>
      <div className={styles.top}>
        <div className={styles.name}>
          <div className={styles.nameText}>{props.task.profile.firstName} {props.task.profile.lastName}</div>
          <img src="/img/SearchTaskPage/icons/verification.svg" alt=''/>
        </div>
        <div className={styles.time}>
          <img src="/img/SearchTaskPage/icons/clock.svg" alt=''/>
          <div className={styles.desc}>{format(new Date(props.task.createdAt), 'MM.dd.yyy hh:mm')}</div>
        </div>
      </div>
      <div>
      <div className={styles.taskTitle}>
          <div className={styles.title}>{props.task.title}</div>
        </div>
        <div className={styles.category}>Courier &rarr; Small delivery</div>
        <div className={styles.desc}>
          {props.task.description}
        </div>
      </div>
    </div>
    <div className={styles.bottom}>
      <TaskActionButton title={'Read more'} icon={'down'} onClick={handleReadMore}/>
      <div className={styles.separatorLine}/>
      <TaskActionButton title={'Share'} icon={'share'} onClick={handleShare}/>
      <div className={styles.separatorLine}/>
      <TaskActionButton title={'Save'} icon={'favorite'} onClick={handleFavorite}/>
    </div>
  </div>
  )
}

export default Description
