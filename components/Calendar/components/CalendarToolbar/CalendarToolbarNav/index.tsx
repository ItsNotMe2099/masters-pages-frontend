import styles from './index.module.scss'
import {IEvent} from 'types'
import {format} from 'date-fns'
import {Calendar, Navigate, momentLocalizer} from "react-big-calendar";
import CalendarToolbarViewButton from 'components/Calendar/components/CalendarToolbar/CalendarToolbarViewButton'
import CalendarArrowLeft from 'components/svg/CalendarArrowLeft'
import CalendarArrowRight from 'components/svg/CalendarArrowRight'
import {useTranslation} from 'i18n'


interface Props {
  onNavigate: (action) => void
}

export default function CalendarToolbarNav(props: Props) {
  const { onNavigate} = props;
  const {t} = useTranslation('common');

  return (
    <div className={`${styles.root}`}>
      <div className={`${styles.arrow} ${styles.arrow__left}`} onClick={() => onNavigate(Navigate.PREVIOUS)}><CalendarArrowLeft/></div>
      <div className={`${styles.today}`} onClick={() => onNavigate(Navigate.TODAY)}>{t('today')}</div>
      <div className={`${styles.arrow} ${styles.arrow__right}`} onClick={() => onNavigate(Navigate.NEXT)}><CalendarArrowRight/></div>
    </div>
  )
}
CalendarToolbarNav.defaultProps = {

}
