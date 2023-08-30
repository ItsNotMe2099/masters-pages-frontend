import { fetchTaskUserListRequest, resetTaskUserList } from 'components/TaskUser/actions'

import Modal from 'components/ui/Modal'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import * as React from 'react'
import { IRootState} from 'types'
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import NewEventForm from 'components/Calendar/components/NewEventModal/components/NewEventForm'
import {createEvent} from 'components/Events/actions'
import { useTranslation } from 'next-i18next'
import ProjectNewEventForm
  from "components/for_pages/Project/ProjectModal/Tabs/TabCalendar/ProjectNewEventModal/components/ProjectNewEventForm";
import {useEventCalendarContext} from "context/event_calendar";
import {EventWrapper, useEventContext} from "context/event_state";
interface Props {
  isOpen: boolean,
  range?: any,
  onClose: () => void
  projectId: number
}
const ProjectNewEventModalInner = ({isOpen, onClose, range}: Props) => {
  const calendarContext = useEventCalendarContext()
  const eventContext = useEventContext();
  const [activeTab, setActiveTab] = useState('tasks')
  const { t } = useTranslation('common')


  const handleChangeTab = (item) => {
    setActiveTab(item.key)
  }

  const handleSubmitNewEvent = (data) => {
    eventContext.create({...data, ...data.timeRange, timezone: format(new Date(), 'XXX')})
    calendarContext.hideModal()

  }
  const handleCancel = () => {
    onClose()
  }


  return (
    <Modal isOpen={isOpen} className={styles.root} loading={false} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.header}>

        <div className={styles.title}>{t('event.newEvent')}</div>
      </div>
      <div className={styles.body}>
        <ProjectNewEventForm initialValues={{...(range ? {timeRange: range} : {})}} onCancel={handleCancel} onSubmit={handleSubmitNewEvent}/>
      </div>

    </Modal>
  )
}

export default function ProjectNewEventModal(props: Props){
  return <EventWrapper projectId={props.projectId}>
    <ProjectNewEventModalInner {...props}/>
  </EventWrapper>
}
