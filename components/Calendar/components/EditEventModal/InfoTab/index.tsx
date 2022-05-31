import * as React from 'react'
import {IEvent, IRootState} from 'types'
import styles from './index.module.scss'
import {getCategoryTranslation} from 'utils/translations'
import EventChatMessageList
  from 'components/Calendar/components/EditEventModal/components/ChatTab/components/EventChatMessageList'
import {useEffect, useState} from 'react'
import { fetchChatEventLogDialog} from 'components/Chat/actions'
import {useDispatch, useSelector} from 'react-redux'
import ArrowDownSmall from 'components/svg/ArrowDownSmall'
import { useTranslation } from 'next-i18next'

interface Props {
  event?: IEvent
}

const InfoTab = ({event}: Props) => {

  const chatLoading = useSelector((state: IRootState) => state.chat.chatLoading)
  const chat = useSelector((state: IRootState) => state.chat.chat)
  const dispatch = useDispatch()
  const [eventLogIsShow, setEventLogIsShow] = useState(false)
  const {t, i18n} = useTranslation('common')
  useEffect(() => {
    dispatch(fetchChatEventLogDialog(event.id, event.participantId))
  }, [])
  const handleEventLogToolbarClick = () => {
    setEventLogIsShow(!eventLogIsShow)
  }
  return (
    <div className={styles.root} >
      <div className={styles.infoItem}>
        <div className={styles.label}>{t('orderNumber')}</div>
        <div className={styles.value}>#{event.task.id}</div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.label}>{t('event.eventNumber')}:</div>
        <div className={styles.value}>#{event.id}</div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.label}>{t('orderTitle')}:</div>
        <div className={styles.value}>{event.task.title}</div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.label}>{t('event.eventTitle')}:</div>
        <div className={styles.value}>{event.title}</div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.label}>{t('client')}:</div>
        <div className={styles.value}>{event.task.profile.firstName} {event.task.profile.lastName}</div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.label}>{t('master')}:</div>
        <div className={styles.value}>{event.task.master.firstName} {event.task.master.lastName}</div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.label}>{t('createTask.fieldCategory')}:</div>
        <div className={styles.value}>{getCategoryTranslation(event.task.category, i18n.language)?.name}</div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.label}>{t('createTask.fieldSubCategory')}:</div>
        <div className={styles.value}>{getCategoryTranslation(event.task.subCategory, i18n.language)?.name}</div>
      </div>
      <div className={styles.eventLog}>
        <div className={styles.eventLogToolbar} onClick={handleEventLogToolbarClick}>
          <div className={styles.eventLogTitle}>{t('log')}</div>
          <ArrowDownSmall/>

        </div>
        {eventLogIsShow && <div className={styles.eventLogList}>
        {chat && <EventChatMessageList hasNewMessage={false} chat={chat}/>}
        </div>}
      </div>
    </div>
  )
}

export default InfoTab
