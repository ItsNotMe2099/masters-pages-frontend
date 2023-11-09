import { fetchTaskUserListRequest, resetTaskUserList } from 'components/TaskUser/actions'

import Modal from 'components/ui/Modal'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import * as React from 'react'
import { IEvent, IRootState } from 'types'
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import NewEventForm from 'components/Calendar/components/NewEventModal/components/NewEventForm'
import { createEvent } from 'components/Events/actions'
import { useTranslation } from 'next-i18next'
import ProjectNewEventForm
  from "components/for_pages/Project/ProjectModal/Tabs/TabCalendar/ProjectNewEventModal/components/ProjectNewEventForm";
import { useEventCalendarContext } from "context/event_calendar";
import { EventWrapper, useEventContext } from "context/event_state";
import { useAppContext } from "context/state";
import { useProjectContext } from "context/project_state";
import EventRepository from 'data/repositories/EventRepository'
interface Props {
  isOpen: boolean,
  range?: any,
  onClose: () => void
  projectId: number
  event?: IEvent
}
const ProjectNewEventModalInner = ({ isOpen, onClose, range, projectId, event }: Props) => {
  const appContext = useAppContext()
  const calendarContext = useEventCalendarContext()
  const eventContext = useEventContext();
  const projectContext = useProjectContext()

  const [activeTab, setActiveTab] = useState('tasks')
  const { t } = useTranslation('common')

  const [total, setTotal] = useState<number | null>(null)


  const handleChangeTab = (item) => {
    setActiveTab(item.key)
  }

  const fetchEvents = async () => {
    await EventRepository.list(projectId).then(i => {
      if (i) {
        setTotal(i.total)
      }
    })
  }

  useEffect(() => {
    fetchEvents()
  }, [])


  const handleSubmitNewEvent = (data) => {
    eventContext.create({
      ...data, ...data.timeRange, timezone: format(new Date(), 'XXX'),
      priceType: 'fixed',
      ...(
        appContext.profile.role !== 'corporate' ? { participantId: projectContext.project.corporateProfileId } : {}
      )
    })
    //calendarContext.hideModal()

  }
  const handleCancel = () => {
    onClose()
  }

  console.log('TOTAL', total)

  const submitEventRef = React.useRef<string | null>(null)
  const handleSetSubmitEvent = (event: string | null) => {
    submitEventRef.current = event;

  }


  return (
    <Modal isOpen={isOpen} className={styles.root} loading={false} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.header}>

        <div className={styles.title}>{t('event.newEvent')}</div>
      </div>
      <div className={styles.body}>
        {total !== null &&
          <ProjectNewEventForm event={event} onSetSubmitEvent={handleSetSubmitEvent} total={total}
            initialValues=
            {{
              title: `Event #${total + 1}`, participantId: event ? event.participantId : null,
              ...(range ? { timeRange: range } : {})
            }}
            onSubmit={handleSubmitNewEvent} onCancel={handleCancel} eventNumber={total + 1} />}
      </div>

    </Modal>
  )
}

export default function ProjectNewEventModal(props: Props) {
  return <EventWrapper projectId={props.projectId}>
    <ProjectNewEventModalInner {...props} />
  </EventWrapper>
}
