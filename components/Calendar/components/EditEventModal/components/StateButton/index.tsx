import {useRouter} from 'next/router'
import * as React from 'react'
import styles from './index.module.scss'
import {EventStatus, IEvent, IRootState} from 'types'
import MarkIcon from 'components/svg/MarkIcon'

import {useSelector} from 'react-redux'
import {getEventColor} from 'utils/event'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import { ProfileRole } from 'data/intefaces/IProfile'

interface Props {
  event: IEvent,
  type: ProfileRole.Client | ProfileRole.Master | ProfileRole.Volunteer | ProfileRole.Corporate
  className?: string
}

const StateButton = ({event, type, className}: Props) => {
  const appContext = useAppContext();
  const currentProfile = appContext.profile
  const showAuthor = type === currentProfile.role && event.isAuthor || type !== currentProfile.role && !event.isAuthor
  const isOverdue = event.isOverdue && ['client', 'corporate'].includes(currentProfile.role) && (['master', 'volunteer'].includes(type))
  const router = useRouter()
  const {t} = useTranslation('common')
  const handleClick = (e) => {

  }

  console.log('ISAUTHOR', showAuthor)


  const isMarkVisible = () => {
    const color = getEventColor(event, {
      isOtherSide: type !== currentProfile.role,
      isOverdue
    })
    return ['green', 'blue'].includes(color)
  }
  const getClass = () => {
    const color = getEventColor(event, {
      isOtherSide: type !== currentProfile.role,
      isOverdue
    })
    switch (color) {
      case 'grey':
        return styles.root__grey
      case 'green':
        return styles.root__green
      case 'red':
        return styles.root__red
      case 'blue':
        return styles.root__blue
      case 'yellow':
        return styles.root__orange
      case 'orange':
        return styles.root__orange
    }


  }
  console.log("GetEvent", event)
  const getTypeName = () => {
    switch (type) {
      case 'client':
        return t('client')
      case 'master':
          return t('master')
    case 'volunteer':
          return t('volunteer')
    case ProfileRole.Corporate:
      return 'Organization'
    }
  }
  const getStatusName = () => {
    if (!showAuthor) {
      if (event.status === EventStatus.Draft) {
        return t('draft')
      }
      if ([EventStatus.Planned].includes(event.status)) {
        return t('pending')
      }
      if ([EventStatus.Declined].includes(event.status)) {
        return t('declined')
      }
      if ([EventStatus.Confirmed].includes(event.status)) {
        return t('task.page.planned')
      }
      if (isOverdue) {
        return t('overdue')
      }

      if ([EventStatus.Completed].includes(event.status)) {
        return t('pending')
      }

      if ([EventStatus.Approved].includes(event.status)) {
        return t('finished')
      }
      if ([EventStatus.Rejected].includes(event.status)) {
        return t('rejected')
      }
      if ([EventStatus.Deleted].includes(event.status)) {
        return t('deleted')
      }
    } else {

      if (event.status === EventStatus.Draft) {
        return t('draft')
      }
      if ([EventStatus.Planned].includes(event.status)) {
        return t('task.page.planned')
      }
      if ([EventStatus.Declined].includes(event.status)) {
        return t('task.page.planned')
      }
      if ([EventStatus.Confirmed].includes(event.status)) {
        return t('task.page.planned')
      }
      if (isOverdue) {
        return t('overdue')
      }
      if ([EventStatus.Completed].includes(event.status)) {
        return t('task.page.completed')
      }
      if ([EventStatus.Approved].includes(event.status)) {
        return t('finished')
      }
      if ([EventStatus.Rejected].includes(event.status)) {
        return t('rejected')
      }
      if ([EventStatus.Deleted].includes(event.status)) {
        return t('pending')
      }
    }
  }
  return (
    <div className={`${styles.root} ${getClass()} ${className}`}>
      <div className={styles.wrapper}>
        <div className={styles.type}>{getTypeName()}</div>
        {isMarkVisible() && <MarkIcon className={styles.icon} color={'#ffffff'}/>}
      </div>
      <div className={styles.status}>{getStatusName()}</div>
    </div>
  )
}


export default StateButton
