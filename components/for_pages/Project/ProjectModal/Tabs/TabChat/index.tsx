import * as React from 'react'
import {useEffect, useState} from 'react'
import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import ProjectDescriptionHeader from 'components/for_pages/Project/ProjectModal/ProjectDescriptionHeader'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import TabApplicationView from 'components/for_pages/Project/ProjectModal/Tabs/TabApplication/TabApplicationView'
import TabApplicationForm from 'components/for_pages/Project/ProjectModal/Tabs/TabApplication/TabApplicationForm'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import Loader from 'components/ui/Loader'
import ChatPageLayout from 'components/layout/ChatLayout'
import Chat from 'components/Chat'
import Tabs from 'components/ui/Tabs'
import ChatListItem from 'components/Chat/ChatListItem'
import ChatMessageList from 'components/Chat/ChatMessageList'
import ChatRepository from 'data/repositories/ChatRepository'
import {IChat} from 'data/intefaces/IChat'
import {useDispatch, useSelector} from 'react-redux'
import {IRootState} from 'types'
import ProjectChatTitle from 'components/for_pages/Project/ProjectModal/Tabs/TabChat/ProjectChatTitle'
import {fetchChaProjectList, fetchChatTasksList, fetchChatWithUsersList, resetChatList} from 'components/Chat/actions'
enum TabType{
  People = 'people',
  Groups = 'groups'
}
interface Props {
  project: IProject
}

const TabChat = ({project, ...props}: Props) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const appContext = useAppContext()
  const [activeTab, setActiveTab] = useState<TabType>( TabType.People)

  const chat = useSelector((state: IRootState) => state.chat.chat)
  const chatList = useSelector((state: IRootState) => state.chat.chatList)
  const chatListLoading = useSelector((state: IRootState) => state.chat.chatListLoading)

  const tabs = [{name: 'People', key: TabType.People}, {name: 'Groups', key: TabType.Groups}]
  useEffect(() => {
      dispatch(fetchChaProjectList(project.id))
      return () => {dispatch(resetChatList())}
  }, [])

  const handleChangeTab = (tab) => {
    console.log("SetTab", tab)
    setActiveTab(tab.key)
  }

  if(chatListLoading){
    return <div className={styles.rootLoading}><Loader/></div>
  }
  return (
    <div className={styles.root}>
      <ProjectDescriptionHeader project={project} title={'Messages'}/>
      <div className={styles.chatArea}>

      <div className={styles.chatList}>
        <Tabs tabs={tabs} activeTab={activeTab} tabClassName={styles.tab} onChange={handleChangeTab}/>
        <div>
          {chatList.filter(i => (activeTab === TabType.People ? !i.isGroup : i.isGroup))
            .map(chatItem => <ChatListItem key={chatItem?.id} chat={chatItem} isActive={chatItem.id === chat?.id}/>)}
        </div>
      </div>
      {chat &&
      <div className={styles.chatMessages}>
        <ChatMessageList chat={chat} title={<ProjectChatTitle chat={chat}/>}/>
      </div>}
      </div>
    </div>
  )
}
export default TabChat
