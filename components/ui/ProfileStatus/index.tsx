import styles from './index.module.scss'
import cx from 'classnames';
import {UserActivityStatus} from 'types'
import {useTranslation} from 'i18n'
import {differenceInDays, differenceInHours, differenceInMinutes, differenceInWeeks} from 'date-fns'

interface Props {
  activityStatus: UserActivityStatus
  lastActivityAt?: string
}

export default function ProfileStatus({activityStatus, lastActivityAt}: Props) {
const {t} = useTranslation();
/*
if(activityStatus === UserActivityStatus.Offline && lastActivityAt){
  const getTimeText = () => {
    const diffInDays = differenceInDays(new Date(), new Date(lastActivityAt);
    const diffInWeeks = differenceInWeeks(new Date(), new Date(lastActivityAt);
    const diffInMonths = differenceInWeeks(new Date(), new Date(lastActivityAt);
    const diffInYears = differenceInWeeks(new Date(), new Date(lastActivityAt);
    const diffInMin = differenceInMinutes(new Date(), new Date(lastActivityAt);
    const diffInHours = differenceInHours(new Date(), new Date(lastActivityAt);
    if(diffInYears >= 1){
      return 'Больше года назад';
    }else if(diffInMonths >= 6){
      return 'Больше полгода назад';
    }else if(diffInMonths >= 1){
      return 'Больше месяца назад';
    }else if(diffInWeeks >= 1){
      return 'Больше недели назад';
    }else if(diffInDays >= 3){
      return 'Больше трех дней назад';
    }else if(diffInDays >= 3){
      return 'Болье дня назад';
    }else if(diffInDays === 1){
      return 'День назад';
    }else if(differenceInHours === 1){
      return 'День назад';
    }

  }
  return (<div className={cx(styles.root, {
    [styles.offline]: activityStatus === UserActivityStatus.Offline,
    [styles.online]:  activityStatus === UserActivityStatus.Online
  })}><span className={styles.lastSeen}>Last seen</span>{getTimeText()}</div>)


}*/
  return (<div className={cx(styles.root, {
    [styles.offline]: !activityStatus || activityStatus === UserActivityStatus.Offline,
    [styles.online]:  activityStatus === UserActivityStatus.Online
  })}><div className={styles.circle}/>{activityStatus === UserActivityStatus.Online ? t('online') : t('offline')}</div>)

}
ProfileStatus.defaultProps = {

}
