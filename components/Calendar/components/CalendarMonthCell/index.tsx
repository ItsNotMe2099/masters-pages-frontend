import styles from './index.module.scss'
import {IEvent, IRootState} from 'types'
import {format} from 'date-fns'
import cookie from 'js-cookie'
import { ru } from 'date-fns/locale'
import {useTranslation} from 'i18n'
interface Props {
  label: string,
  date: Date,
  onDrillDown: () => void
}

export default function CalendarMonthCell(props: Props) {
  const {label, date, onDrillDown} = props;
  const {t, i18n} = useTranslation('common');

  return (
    <div className={`${styles.root}`}>
      <div className={styles.week}>{format(date, 'eee', {locale: i18n.language === 'ru' && ru})}</div>
      <div className={styles.day} onClick={onDrillDown}>{label}</div>
    </div>
  )
}
CalendarMonthCell.defaultProps = {

}
