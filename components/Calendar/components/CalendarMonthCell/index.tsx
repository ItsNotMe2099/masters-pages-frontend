import styles from './index.module.scss'
import {IEvent, IRootState} from 'types'
import {format} from 'date-fns'
interface Props {
  label: string,
  date: Date,
  onDrillDown: () => void
}

export default function CalendarMonthCell(props: Props) {
  const {label, date, onDrillDown} = props;

  return (
    <div className={`${styles.root}`}>
      <div className={styles.week}>{format(date, 'eee')}</div>
      <div className={styles.day} onClick={onDrillDown}>{label}</div>
    </div>
  )
}
CalendarMonthCell.defaultProps = {

}
