import styles from './index.module.scss'
import {format} from 'date-fns'
import cookie from 'js-cookie'
import { ru } from 'date-fns/locale'

interface Props {
  label: string,
  date: Date,
  onDrillDown: () => void
}

export default function CalendarMonthHeaderCell(props: Props) {
  const {label, date, onDrillDown} = props
  const lang = cookie.get('next-i18next')

  return (
    <div className={`${styles.root}`}>
      <div className={styles.week}>{format(date, 'eee', {locale: lang === 'ru' && ru})}</div>
      <div className={styles.day} onClick={onDrillDown}>{label}</div>
    </div>
  )
}
CalendarMonthHeaderCell.defaultProps = {

}
