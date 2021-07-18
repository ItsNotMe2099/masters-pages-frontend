import * as React from "react";
import {IEvent, IRootState, ITask, SkillData, SkillListItem} from "types";
import styles from './index.module.scss'

import {useSelector, useDispatch} from 'react-redux'
import EventReviewForm
  from 'components/Calendar/components/EditEventModal/components/ChatTab/components/EventReview/EventReviewForm'
import {createFeedBackEventClient, createFeedBackEventMaster, resetFeedbackEventForm} from 'components/Events/actions'
import Loader from 'components/ui/Loader'
import {useEffect} from 'react'
import EventFeedback
  from 'components/Calendar/components/EditEventModal/components/ChatTab/components/EventReview/EventFeedback'
import {useTranslation} from 'react-i18next'
interface Props {
  event?: IEvent
}

let EventReview = ({event}: Props) => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state: IRootState) => state.profile.currentProfile);

  const formLoading = useSelector((state: IRootState) => state.event.formLoading)
  const myReview = event.feedbacks.find(f => f.fromProfileId === currentProfile.id);
  const otherReview = event.feedbacks.find(f => f.fromProfileId !== currentProfile.id);
  const otherSide = event.isAuthor ? event.participant : event.author;
  const {t} = useTranslation('common');
  useEffect(() => {
    return () => {
      dispatch(resetFeedbackEventForm());
    }
  })
  const handleSubmit = (data) => {
    if (currentProfile.role === 'client') {
      dispatch(createFeedBackEventMaster({...data, eventId: event.id}))
    } else {
      dispatch(createFeedBackEventClient({...data, eventId: event.id}))
    }
  }
  return (
    <div className={styles.root}>
      {formLoading && <Loader/>}
      {!otherReview && <div className={styles.noReview}>
        <a href={`/id${otherSide.id}`}  target={'_blank'}
           className={styles.author}>{otherSide.firstName} {otherSide.lastName}</a> {t('event.reviewNotAvailable')}
      </div>}
      {otherReview && <>
        <div className={styles.reviewTitle}>
          <a href={`/id${otherSide.id}`}  target={'_blank'}
             className={styles.author}>{otherSide.firstName} {otherSide.lastName}</a> {`${t('reviewSmall')}:`}

        </div>
        <EventFeedback feedback={otherReview}/>
      </>}

      {myReview && <>
        <div className={`${styles.reviewTitle} ${styles.yourReview}`}>
          Your review:
        </div>
        <EventFeedback feedback={myReview}/></>}
      {!myReview && <div style={{display: formLoading ? 'none' : 'block'}}>
        <EventReviewForm event={event} onSubmit={handleSubmit}/>
      </div>}
    </div>
  )
}
export default EventReview
