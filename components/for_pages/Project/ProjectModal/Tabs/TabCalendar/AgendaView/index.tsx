import { IEvent } from 'types'
import styles from './index.module.scss'
import { format } from 'date-fns'
import classNames from 'classnames'
import CalendarEvent from 'components/Calendar/components/CalendarEvent'


interface Props {
  events: IEvent[]
  className?: string
}

export default function AgendaView({ events, className }: Props) {

  return (
    <div className={classNames(styles.root, className)}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.date}>Date</th>
            <th className={styles.time}>Time</th>
            <th>Event</th>
          </tr>
        </thead>
      </table>
      <div className={styles.content}>
        <table className={styles.table}>
          <tbody>
            {events.map((i, index) =>
              <tr key={index}>
                <td className={styles.dateCell}>
                  {format(new Date(i.createdAt), 'EEE MMM dd')}
                </td>
                <td className={styles.timeCell}>
                  {`${format(new Date(i.start), "h:mmaaaaa'm'")} - ${format(new Date(i.end), "h:mmaaaaa'm'")}`}
                </td>
                <td>
                  <CalendarEvent event={i} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
