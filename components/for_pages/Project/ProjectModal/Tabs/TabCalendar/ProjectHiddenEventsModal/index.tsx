import Modal from 'components/ui/Modal'
import * as React from 'react'
import { IEvent } from 'types'
import styles from './index.module.scss'
import { EventWrapper, useEventContext } from "context/event_state";
import CalendarEvent from 'components/Calendar/components/CalendarEvent';

interface Props {
  isOpen: boolean,
  onClose: () => void
  events: IEvent[]
  onEventClick: (event: IEvent) => void
}

const ProjectHiddenEventsModalInner = ({ isOpen, onClose, events, onEventClick }: Props) => {
  const eventContext = useEventContext()

  return (
    <Modal isOpen={isOpen} className={styles.root} loading={false} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.list}>
        {events.map((i, index) =>
          <CalendarEvent onClick={() => onEventClick(i)} className={styles.event} event={i} key={index} />
        )}
      </div>
    </Modal>
  )
}

export default function ProjectHiddenEventsModal(props: Props) {
  return (
    <ProjectHiddenEventsModalInner {...props} />
  )
}
