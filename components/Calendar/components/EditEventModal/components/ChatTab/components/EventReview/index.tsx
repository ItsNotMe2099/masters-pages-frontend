import * as React from "react";
import {IEvent, IRootState, ITask, SkillData, SkillListItem} from "types";
import styles from './index.module.scss'

import {useSelector, useDispatch} from 'react-redux'
import EventReviewForm
  from 'components/Calendar/components/EditEventModal/components/ChatTab/components/EventReview/EventReviewForm'
import {createFeedBackEventClientRequest, createFeedBackEventMasterRequest} from 'components/ProfileFeedback/actions'
interface Props {
  event?: IEvent
}

let EventReview = ({event}: Props) => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state: IRootState) => state.profile.currentProfile);

  const formLoading = useSelector((state: IRootState) => state.event.formLoading)
  const handleSubmit = (data) => {
    if(currentProfile.role === 'client'){
      dispatch(createFeedBackEventMasterRequest({...data, eventId: event.id}))
    }else{
      dispatch(createFeedBackEventClientRequest({...data, eventId: event.id}))
    }
  }
  return (
    <div className={styles.root}>
      <EventReviewForm event={event} onSubmit={handleSubmit}/>
    </div>
  )
}
export default EventReview
