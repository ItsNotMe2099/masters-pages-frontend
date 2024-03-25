import Modal from 'components/ui/Modal'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import * as React from 'react'
import { IEvent } from 'types'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import ProjectNewEventForm
  from "components/for_pages/Project/ProjectModal/Tabs/TabCalendar/ProjectNewEventModal/components/ProjectNewEventForm";
import { useEventCalendarContext } from "context/event_calendar";
import { EventWrapper, useEventContext } from "context/event_state";
import { useAppContext } from "context/state";
import { useProjectContext } from "context/project_state";
import EventRepository from 'data/repositories/EventRepository'
import { useSelector } from 'react-redux'
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

  const [currentEvent, setCurrentEvent] = useState<IEvent>(event ? event : eventContext.event)

  const [events, setEvents] = useState<IEvent[]>([])

  const [activeTab, setActiveTab] = useState('tasks')
  const { t } = useTranslation('common')

  const [total, setTotal] = useState<number | null>(null)


  const handleChangeTab = (item) => {
    setActiveTab(item.key)
  }

  const fetchEvents = async () => {
    await EventRepository.list(projectId).then(i => {
      if (i) {
        setEvents(i.data)
        setTotal(i.total)
      }
    })
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const submitEventRef = React.useRef<string | null>(null)

  const handleSubmitNewEvent = (data) => {
    (!event || !eventContext.event) && eventContext.create({
      ...data, ...data.timeRange,
      timezone: data?.timezone,
      priceType: 'fixed',
      ...(
        appContext.profile.role !== 'corporate' ? { participantId: projectContext.project.corporateProfileId } : {}
      )
    })
    calendarContext.setCurrentEvent(event)
    console.log('data.timezone', data.timezone)

  }

  const handleCancel = () => {
    onClose()
  }

  console.log('TOTAL', total)

  console.log('EVVVVVENT', eventContext.event)

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    if (currentIndex + 1 < total) {
      setCurrentIndex(currentIndex + 1)
      setCurrentEvent(events[currentIndex + 1])
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setCurrentEvent(events[currentIndex - 1])
    }
  }


  return (
    <Modal isOpen={isOpen} className={styles.root} loading={false} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.header}>

        <div className={styles.title}>{event ? 'Event details' : 'Create an event'}</div>
      </div>
      <div className={styles.body}>
        {total !== null &&
          <ProjectNewEventForm index={currentIndex} event={currentEvent} total={total}
            onPrev={handlePrev}
            onNext={handleNext}
            initialValues=
            {{
              description: event ? currentEvent.description : '', timezone: event ? currentEvent.timezone : format(new Date(), 'XXX'),
              title: event ? currentEvent.title : `Event #${total + 1}`, participantId: event ? currentEvent.participantId : null,
              ...(range ? { timeRange: range } : event ? { timeRange: { start: currentEvent.start, end: currentEvent.end } } : {})
            }}
            onSubmit={handleSubmitNewEvent} onCancel={handleCancel} eventNumber={event ? currentEvent.title : total + 1} />}
      </div>

    </Modal>
  )
}

export default function ProjectNewEventModal(props: Props) {
  return <EventWrapper projectId={props.projectId}>
    <ProjectNewEventModalInner {...props} />
  </EventWrapper>
}
