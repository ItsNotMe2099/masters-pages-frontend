import { fetchChatTasksList, fetchChatWithUsersList } from "components/Chat/actions";
import ChatListItem from "components/Chat/ChatListItem";
import ChatMessageList from "components/Chat/ChatMessageList";
import { taskNegotiationFetchLastConditions } from "components/TaskNegotiation/actions";
import { fetchTaskSearchList, resetTaskSearchList, setUseLocationFilter } from "components/TaskSearch/actions";
import Loader from "components/ui/Loader";
import Modal from "components/ui/Modal";
import Tabs from "components/ui/Tabs";
import { useEffect, useState } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'

interface Props {

}

export default function Chat(props: Props) {
  const dispatch = useDispatch()
  const chat = useSelector((state: IRootState) => state.chat.chat)
  const chatList = useSelector((state: IRootState) => state.chat.chatList)
  const chatListLoading = useSelector((state: IRootState) => state.chat.chatListLoading)
  const [activeTab, setActiveTab] = useState('people')
  const handleSubmit = () => {

  }
  useEffect(() => {
    if(chat?.id && chat.task?.id){
      dispatch(taskNegotiationFetchLastConditions(chat.task?.id));
    }
  }, [chat])

  const tabs = [
    { name: 'People', key: 'people' },
    { name: 'Tasks', key: 'tasks' },
  ];
  const handleChangeTab = (item) => {
    setActiveTab(item.key);
      if(item.key === 'people'){
        dispatch(fetchChatWithUsersList());
      }else if(item.key === 'tasks'){
        dispatch(fetchChatTasksList());
      }
  }

  if(chatListLoading){
    return <div className={styles.rootLoading}><Loader/></div>
  }
  return (
    <div className={styles.root}>
      <div className={styles.chatList}>
        <Tabs tabs={tabs} activeTab={activeTab} tabClassName={styles.tab} onChange={handleChangeTab}/>


        {chatList.map(chatItem => <ChatListItem key={chat?.id} chat={chatItem} isActive={chatItem.id === chat?.id}/>)}
      </div>
      <div className={styles.chatMessages}>
        {chat && <ChatMessageList chat={chat}/>}
      </div>
    </div>
  )
}
