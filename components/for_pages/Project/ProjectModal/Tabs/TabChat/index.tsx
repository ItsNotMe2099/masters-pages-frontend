import * as React from 'react'
import {useEffect, useState} from 'react'
import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import Loader from 'components/ui/Loader'
import Tabs from 'components/ui/Tabs'
import ChatListItem from 'components/Chat/ChatListItem'
import ChatMessageList from 'components/Chat/ChatMessageList'
import {useDispatch, useSelector} from 'react-redux'
import {IRootState} from 'types'
import ProjectChatTitle from 'components/for_pages/Project/ProjectModal/Tabs/TabChat/ProjectChatTitle'
import {fetchChaProjectList, resetChatList} from 'components/Chat/actions'
import ProjectStatusLabel from '../../ProjectStatusLabel'
import classNames from 'classnames'
import {format} from 'date-fns'

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
      <div className={classNames(styles.section, styles.info)}>
           <div className={styles.top}>
             <div className={styles.left}>
               <ProjectStatusLabel status={project.status}/>
               <div className={styles.title}>{project?.title || '[Project title]'}</div>
               <div className={styles.projectId}>Project id#: {project?.id}</div>
             </div>
             {project && <div className={styles.right}>
               <div className={styles.line}>Application Limit: 0/{project.applicationsLimits}</div>
               <div className={styles.line}>Vacancies: 0/{project.vacanciesLimits}</div>
             </div>}
           </div>

           <div className={styles.dates}>
             <div className={styles.dateItem}>
              <div className={styles.dateItemLabel}>Applications Deadline: </div> 
              <div className={styles.date}>
                <img src={'/img/Project/calendar.svg'}/>{format(new Date(project.applicationsClothingDate), 'MM.dd.yy')}</div>
              </div>
             <div className={styles.separator}/>
             <div className={styles.dateItem}><div className={styles.dateItemLabel}>Project Deadline: </div> 
             <div className={styles.date}>
              <img src={'/img/Project/calendar.svg'}/><span>{format(new Date(project.endDate), 'MM.dd.yy')}</span>
            </div>
             </div>

           </div>

       </div>
      <div className={styles.chatArea}>

      <div className={styles.chatList}>
        <Tabs tabs={tabs} activeTab={activeTab} tabClassName={styles.tab} onChange={handleChangeTab}/>
        <div className={styles.desktop}>
          {chatList.filter(i => (activeTab === TabType.People ? !i.isGroup : i.isGroup))
            .map(chatItem => <ChatListItem key={chatItem?.id} chat={chatItem} isActive={chatItem.id === chat?.id}/>)}
        </div>
        <div className={styles.mobile}>
          {chatList.filter(i => (activeTab === TabType.People ? !i.isGroup : i.isGroup))
            .map(chatItem => !chat && <ChatListItem key={chatItem?.id} chat={chatItem} isActive={chatItem.id === chat?.id}/>)}
          {chat &&
      <div className={styles.chatMessagesMobile}>
        <ChatMessageList style='modal' chat={chat} title={<ProjectChatTitle chat={chat}/>}/>
      </div>}
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
