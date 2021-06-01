import * as React from "react";
import {IEvent, IRootState, ITask, SkillData, SkillListItem} from "types";
import styles from './index.module.scss'

import {useSelector, useDispatch} from 'react-redux'
import {createFeedBackEventClient, createFeedBackEventMaster, resetFeedbackEventForm} from 'components/Events/actions'
import Loader from 'components/ui/Loader'
import {useEffect} from 'react'
import EventFeedback
  from 'components/Calendar/components/EditEventModal/components/ChatTab/components/EventReview/EventFeedback'
import Avatar from 'components/ui/Avatar'
import Button from 'components/ui/Button'
import {taskNegotiationSetCurrentTask} from 'components/TaskNegotiation/actions'
import {feedbackByMasterOpen} from 'components/Modal/actions'
import TaskFeedback from 'components/ProfileFeedback/TaskFeedback'

interface Props {
  task?: ITask
}

let TaskReview = ({task}: Props) => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state: IRootState) => state.profile.currentProfile);

  const formLoading = useSelector((state: IRootState) => state.event.formLoading)
  const myReview = task.feedbacks.find(f => f.fromProfileId === currentProfile.id);
  const otherReview = task.feedbacks.find(f => f.fromProfileId !== currentProfile.id);
  const otherSide = currentProfile.role === 'client' ? task.master : task.profile;
  useEffect(() => {
    return () => {
      dispatch(resetFeedbackEventForm());
    }
  })
  const handleFeedback = () => {
    if (currentProfile.role !== 'client') {
      dispatch(taskNegotiationSetCurrentTask(task));
      dispatch(feedbackByMasterOpen());
    }
  }
  return (
    <div className={styles.root}>
      {formLoading && <Loader/>}
      {!otherReview && <div className={styles.noReview}>
        <a href={`/PublicProfile/${otherSide.id}`}  target={'_blank'}
           className={styles.author}><Avatar size={'exSmall'} image={otherSide.photo}/>{otherSide.firstName} {otherSide.lastName}</a> review not available yet
      </div>}
      {otherReview && <>
        <div className={styles.feedback}><TaskFeedback feedback={otherReview} profile={otherSide}/></div>
      </>}

      {myReview && <div className={styles.feedback}><TaskFeedback title={'Your review'} feedback={myReview} profile={currentProfile}/></div>}
      {!myReview && <div className={styles.actions}>
        <Button red={true} size={'12px 40px'} onClick={handleFeedback}>Post feedback</Button>
      </div>}
    </div>
  )
}
export default TaskReview
