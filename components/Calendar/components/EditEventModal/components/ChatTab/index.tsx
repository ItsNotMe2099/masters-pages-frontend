import * as React from "react";
import {useEffect, useState} from "react";
import {EventStatus, IEvent, IRootState} from "types";
import styles from './index.module.scss'
import EventChatMessageList
  from 'components/Calendar/components/EditEventModal/components/ChatTab/components/EventChatMessageList'
import {useDispatch, useSelector} from 'react-redux'
import {fetchChatEventDialog} from 'components/Chat/actions'
import Loader from 'components/ui/Loader'
import EventReview from 'components/Calendar/components/EditEventModal/components/ChatTab/components/EventReview'
import {useTranslation} from 'i18n'

interface Props {
  event?: IEvent,
}
const Tab = ({name, isActive, key, disabled, onClick}) => {
  return <div className={`${styles.tab} ${disabled && styles.tab__disabled} ${isActive && styles.tab__active}`} onClick={!disabled ? onClick : null}>
    {name}
  </div>
}
const ChatTab = ({event}: Props) => {

  const chatLoading = useSelector((state: IRootState) => state.chat.chatLoading)
  const chat = useSelector((state: IRootState) => state.chat.chat)
  const dispatch = useDispatch();
  const {t} = useTranslation('common');
  const tabs = [
    { name: t('event.preEvent'), key: 'preEvent', disabled: [EventStatus.Completed, EventStatus.Approved, EventStatus.Rejected].includes(event.status)},
    { name: t('event.postEvent'), key: 'postEvent', disabled: ![EventStatus.Completed, EventStatus.Approved, EventStatus.Rejected].includes(event.status) },
    { name: t('review'), key: 'review', disabled: ![EventStatus.Approved].includes(event.status) },
  ];

  const [activeTab, setActiveTab] = useState([EventStatus.Approved].includes(event.status) ? tabs[tabs.length - 1].key : tabs.find(item => !item.disabled)?.key)

  useEffect(() => {
    dispatch(fetchChatEventDialog(event.id, event.participantId));
  }, []);
  const handleChangeTab = (item) => {
    console.log("SetActiveTab", item.key)
    setActiveTab(item.key);
  }
  return (
    <div className={styles.root} >
      <div className={styles.tabs}>
        {tabs.map(tab => <Tab  isActive={activeTab === tab.key} name={tab.name} key={tab.key} disabled={tab.disabled} onClick={() => handleChangeTab(tab)}/>)}
      </div>
      {['preEvent', 'postEvent'].includes(activeTab)  && <div className={styles.chatMessages}>
        {chatLoading && <Loader/>}
        {chat && <EventChatMessageList event={event} chat={chat}/>}
      </div>}
        {activeTab === 'review' && <EventReview event={event}/>}

    </div>
  )
}

export default ChatTab
