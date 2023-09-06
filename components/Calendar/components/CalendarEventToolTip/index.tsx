import styles from './index.module.scss'
import { IEvent, IRootState} from 'types'
import {format} from 'date-fns'
import {getEventColor, getEventPlannedAllowed, getEventStatusName} from 'utils/event'

import {useSelector} from 'react-redux'
import Avatar from 'components/ui/Avatar'
import AvatarSvg from 'components/svg/AvatarSvg'
import { useTranslation } from 'next-i18next'
import {useAppContext} from 'context/state'

interface Props {
  event: IEvent
}

export default function CalendarEventToolTip(props: Props) {
  const {event} = props
  const appContext = useAppContext();
  const currentProfile = appContext.profile
  const { t } = useTranslation('common')
  const getValueClass = (color) => {
    switch (color){
      case 'grey':
        return styles.value__grey
      case 'green':
        return styles.value__green
      case 'red':
        return styles.value__red
      case 'blue':
        return styles.value__blue
      case 'yellow':
        return styles.value__orange
      case 'orange':
        return styles.value__orange
    }
  }
  return (
    <div className={`${styles.root}`}>
      <div className={styles.title}>{event.title}</div>
      <div className={styles.separator}/>
      <div className={styles.row}>
        <div className={styles.label}>{t('event.eventNumber')}</div>
        <div className={styles.value}>#{event.id}</div>
      </div>
      <div className={styles.separator}/>
      <div className={styles.row}>
        <div className={styles.label}>Volunteer</div>
        <div className={styles.value}>
          <div className={styles.avatar}>
          {!['client', 'corporate'].includes(event.participant.role) ? (event.participant.photo ? <Avatar image={event.participant.photo} size={'exExSmall'} /> : <AvatarSvg/>) : (event.author.photo ? <Avatar image={event.author.photo} size={'exExSmall'} /> : <AvatarSvg/>) }
          </div>
          {!['client', 'corporate'].includes(event.participant.role)? `${event.participant.firstName} ${event.participant.lastName}` : `${event.author.firstName} ${event.author.lastName}`}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>{t('status')}</div>
        <div className={`${styles.value} ${getValueClass(getEventColor(event, {isOtherSide: currentProfile.role === 'client'}))}`}><div className={`${styles.circle}`}/>{getEventStatusName(event, {isOtherSide: currentProfile.role === 'client'})}</div>
      </div>
      <div className={styles.separator}/>
      <div className={styles.row}>
        <div className={styles.label}>Organization</div>
        <div className={styles.value}>{['client', 'corporate'].includes(event.participant.role) ? `${event.participant.firstName} ${event.participant.lastName}` : `${event.author.firstName} ${event.author.lastName}`}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>{t('status')}</div>
        <div className={`${styles.value} ${getValueClass(getEventColor(event, {isOtherSide: !['client', 'corporate'].includes(event.participant.role)}))}`}><div className={`${styles.circle}`}/>{getEventStatusName(event, {isOtherSide: currentProfile.role !== 'client'})}</div>
      </div>
      <div className={styles.separator}/>
      <div className={styles.row}>
        <div className={styles.label}>{t('startTime')}</div>
        <div className={styles.value}>{format(getEventPlannedAllowed(event) ? event.start : event.actualStart, 'HH:mm')}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>{t('endTime')}</div>
        <div className={styles.value}>{format(getEventPlannedAllowed(event) ? event.end :  event.actualEnd, 'HH:mm')}</div>
      </div>

    </div>
  )
}
CalendarEventToolTip.defaultProps = {

}
