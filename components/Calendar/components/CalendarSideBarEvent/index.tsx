import styles from './index.module.scss'
import {IEvent} from 'types'
import {format} from 'date-fns'

interface Props {
  event: IEvent
}

export default function CalendarSideBarEvent(props: Props) {
  const {event} = props;

  const getCircleClass = () => {
    return styles.circle__green;
  }
  return (
    <div className={`${styles.root}`}>
      <div className={`${styles.circle} ${getCircleClass()}`}></div>
      <div className={styles.wrapper}>
        <div className={styles.time}>{format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}</div>
        <div className={styles.title}>{event.title}</div>
      </div>
    </div>
  )
}
CalendarSideBarEvent.defaultProps = {

}
