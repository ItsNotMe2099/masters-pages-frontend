import { fetchChatTasksList, fetchChatWithUsersList, resetChatList } from "components/Chat/actions";
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
import {useTranslation, withTranslation} from "i18n";

interface Props {
  isTaskChat?: boolean
}

export default function Chat(props: Props) {
  const dispatch = useDispatch()
  const chat = useSelector((state: IRootState) => state.chat.chat)
  const chatList = useSelector((state: IRootState) => state.chat.chatList)
  const chatListLoading = useSelector((state: IRootState) => state.chat.chatListLoading)
  const {isTaskChat} = props;

  const currentProfile = useSelector((state: IRootState) => state.profile.currentProfile);
  const [activeTab, setActiveTab] = useState(isTaskChat ? 'tasks' : 'people')
  const { t } = useTranslation('common');

  const handleSubmit = () => {

  }
  useEffect(() => {
    if(chat?.id && chat.task?.id){
      dispatch(taskNegotiationFetchLastConditions(chat.task?.id, currentProfile.role === 'client' ? chat.profileId != currentProfile.id ? chat.profileId : chat.participantId : null));
    }
  }, [chat])

  useEffect(() => {
    if(isTaskChat){
      dispatch(fetchChatTasksList());
    }else{
      dispatch(fetchChatWithUsersList());
    }
  }, [isTaskChat])

  const tabs = [
    { name: t('personalArea.tabSaved.menu.people'), key: 'people' },
    { name: t('personalArea.tabSaved.menu.tasks'), key: 'tasks' },
  ];
  const handleChangeTab = (item) => {
    setActiveTab(item.key);
      if(item.key === 'people'){
        dispatch(fetchChatWithUsersList());
      }else if(item.key === 'tasks'){
        dispatch(fetchChatTasksList());
      }
  }

  const handleClose = () => {
    dispatch(resetChatList())
  }

  if(chatListLoading){
    return <div className={styles.rootLoading}><Loader/></div>
  }
  return (
    <div className={styles.root}>
      <div className={styles.chatList}>
        <Tabs tabs={tabs} activeTab={activeTab} tabClassName={styles.tab} onChange={handleChangeTab}/>
        <div>
        {chatList.map(chatItem => <ChatListItem key={chatItem?.id} chat={chatItem} isActive={chatItem.id === chat?.id}/>)}
        </div>
      </div>
      {chat &&
      <div className={styles.chatMessages}>
        <ChatMessageList chat={chat} onClick={handleClose}/>
      </div>}
    </div>
  )
}
