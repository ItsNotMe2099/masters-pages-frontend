import * as React from 'react'
import { IRootState, ITask} from 'types'
import styles from 'components/for_pages/Task/TaskReview/index.module.scss'

import {useSelector, useDispatch} from 'react-redux'
import { resetFeedbackEventForm} from 'components/Events/actions'
import Loader from 'components/ui/Loader'
import {useEffect} from 'react'

import Avatar from 'components/ui/Avatar'
import Button from 'components/ui/Button'
import {taskNegotiationSetCurrentTask} from 'components/TaskNegotiation/actions'
import {feedbackByMasterOpen} from 'components/Modal/actions'
import TaskFeedback from 'components/ProfileFeedback/TaskFeedback'
import { useTranslation } from 'next-i18next'
import {useAppContext} from 'context/state'

interface Props {
  task?: ITask
}

const TaskReview = ({task}: Props) => {
  const dispatch = useDispatch()
  const appContext = useAppContext();
  const currentProfile = appContext.profile
  const formLoading = useSelector((state: IRootState) => state.event.formLoading)
  const myReview = task.feedbacks.find(f => f.fromProfileId === currentProfile.id)
  const otherReview = task.feedbacks.find(f => f.fromProfileId !== currentProfile.id)
  const otherSide = currentProfile.role === 'client' ? task.master : task.profile
  const {t} = useTranslation('common')
  useEffect(() => {
    return () => {
      dispatch(resetFeedbackEventForm())
    }
  })
  const handleFeedback = () => {
    if (currentProfile.role !== 'client') {
      dispatch(taskNegotiationSetCurrentTask(task))
      dispatch(feedbackByMasterOpen())
    }
  }
  if(!otherSide){
    return null
  }
  const isCanPostReviewVisible = () => {
    return [task.profileId, task.masterId].includes(currentProfile.id)
  }
  return (
    <div className={styles.root}>
      {formLoading && <Loader/>}
      {!otherReview && <div className={styles.noReview}>
        <a href={`/id${otherSide.id}`}  target={'_blank'}
           className={styles.author} rel="noreferrer"><Avatar size={'exSmall'} image={otherSide.photo}/>{otherSide.firstName} {otherSide.lastName}</a> {t('reviewNotAvailable')}
      </div>}
      {otherReview && <>
        <div className={styles.feedback}><TaskFeedback feedback={otherReview} profile={otherSide}/></div>
      </>}

      {myReview && <div className={styles.feedback}><TaskFeedback title={t('yourReview')} feedback={myReview} profile={currentProfile}/></div>}
      {(!myReview && isCanPostReviewVisible()) && <div className={styles.actions}>
        <Button red={true} size={'12px 40px'} onClick={handleFeedback}>{t('task.feedbackToClient')}</Button>
      </div>}
    </div>
  )
}
export default TaskReview
