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

interface Props {
  event?: IEvent
}
const Tab = ({name, key, disabled, onClick}) => {
  return <div className={`${styles.tab} ${disabled && styles.tab__disabled}`} onClick={!disabled ? onClick : null}>
    {name}
  </div>
}
const ChatTab = ({event}: Props) => {

  const chatLoading = useSelector((state: IRootState) => state.chat.chatLoading)
  const chat = useSelector((state: IRootState) => state.chat.chat)
  const dispatch = useDispatch();
  const tabs = [
    { name: 'Pre-event', key: 'preEvent', disabled: [EventStatus.Completed, EventStatus.Approved, EventStatus.Rejected].includes(event.status)},
    { name: 'Post-event', key: 'postEvent', disabled: ![EventStatus.Completed, EventStatus.Approved, EventStatus.Rejected].includes(event.status) },
    { name: 'Review', key: 'review', disabled: ![EventStatus.Completed, EventStatus.Approved].includes(event.status) },
  ];

  const [activeTab, setActiveTab] = useState(tabs.find(item => !item.disabled)?.key)

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
        {tabs.map(tab => <Tab name={tab.name} key={tab.key} disabled={tab.disabled} onClick={() => handleChangeTab(tab)}/>)}
      </div>
      {['preEvent', 'postEvent'].includes(activeTab)  && <div className={styles.chatMessages}>
        {chatLoading && <Loader/>}
        {chat && <EventChatMessageList chat={chat}/>}
      </div>}
        {activeTab === 'review' && <EventReview event={event}/>}

    </div>
  )
}

export default ChatTab
