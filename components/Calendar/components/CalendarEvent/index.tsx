import styles from './index.module.scss'
import {IEvent} from 'types'
import {format} from 'date-fns'

interface Props {
  event: IEvent
}

export default function CalendarEvent(props: Props) {
  const {event} = props;
  const getRootClass = () => {
    return styles.root__green;
  }
  const getBorderClass = () => {
    return styles.border__green;
  }
  return (
    <div className={`${styles.root} ${getRootClass()}`}>
      <div className={`${styles.leftBorder} ${getBorderClass()}`}></div>
      <div className={styles.wrapper}>
        <div className={styles.time}>{format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}</div>
        <div className={`${styles.author} ${getBorderClass()}`}>Jane cooper</div>
        <div className={styles.task}>French lesson</div>
        <div className={styles.title}>{event.title}</div>
      </div>
    </div>
  )
}
CalendarEvent.defaultProps = {

}
