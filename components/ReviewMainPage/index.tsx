import Link from 'next/link'
import styles from './index.module.scss'
import {IFeedbacksToProfile} from '../../types'
import {getMediaPath} from '../../utils/media'
import {getCategoryTranslation} from '../../utils/translations'
import {default as React} from 'react'
import AvatarRound from '../ui/AvatarRound'

interface Props {
 feedback: IFeedbacksToProfile
}

export default function ReviewMainPage({feedback}: Props) {
  return (
    <>
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.border}>
          <AvatarRound size={'large'} image={feedback.fromProfile.photo} name={feedback.fromProfile.firstName}/>
        </div>
        <div className={styles.comment}>
          <div className={styles.inner}>
            <img src="/img/icons/comment.svg" alt=''/>
            <div className={styles.positive}>{feedback.fromProfile.feedbacksCount}</div>
            {/*<div className={styles.negative}>{props.negative}</div>*/}
          </div>
        </div>
      </div>
      <div>
        <div className={styles.name}>{feedback.fromProfile.firstName} {feedback.fromProfile.lastName}</div>
        {feedback.task && <Link href="/"><a><div className={styles.service}>{getCategoryTranslation(feedback.task.category)?.name}     <img src={'/img/icons/arrow2.svg'}/> {getCategoryTranslation(feedback.task.subCategory)?.name} </div></a></Link>}
        <div className={styles.text}>
          {feedback.description}
        </div>
      </div>
    </div>

    <div className={styles.root__mobile}>
      <div className={styles.top}>
      <div className={styles.left}>
        <div className={styles.border}>
          <img src={getMediaPath(feedback.fromProfile.photo)}/>
        </div>
      </div>
      <div>
        <div className={styles.name}>{feedback.fromProfile.firstName} {feedback.fromProfile.lastName}</div>
        <Link href="/"><a><div className={styles.service}></div></a></Link>
        <div className={styles.comment}>
          <div className={styles.inner}>
            <img src="/img/icons/comment.svg" alt=''/>
            <div className={styles.positive}>{feedback.fromProfile.feedbacksCount}</div>
            {/*<div className={styles.negative}>{props.negative}</div>*/}
          </div>
        </div>
      </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.text}>
          {feedback.description}
        </div>
      </div>
      </div>
  </>
  )
}
