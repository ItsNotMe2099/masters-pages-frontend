import * as React from 'react'
import styles from './index.module.scss'
import {IProject, ProjectStatus} from 'data/intefaces/IProject'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import {useState} from 'react'
import Tabs from '../TabVolunteers/Tabs'
import {ApplicationStatus} from 'data/intefaces/IApplication'
import ProjectTabHeader from '../../ProjectTabHeader'
import MessageCard from './MessageCard'
import { IAutoMessages} from 'data/intefaces/IAutoMessages'
import AutoMessagesRepository from 'data/repositories/AutoMessagesRepository'

interface Props {
  project: IProject | null
  autoMessages?: IAutoMessages
}

export enum ProjectAutoRepliesTabType {
  Status = 'status',
  Applications = 'applications',
  Shortlist = 'shortList',
  Invited = 'invited',
  Accepted = 'accepted',
  Completed = 'completed',
}

const ProjectAutorepliesTab = ({project, autoMessages}: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const tabs = ([
    {name: 'Status', key: ProjectAutoRepliesTabType.Status},
    {name: 'Applications', key: ProjectAutoRepliesTabType.Applications},
    {name: 'Shortlist', key: ProjectAutoRepliesTabType.Shortlist},
    {name: 'Invited', key: ProjectAutoRepliesTabType.Invited},
    {name: 'Accepted', key: ProjectAutoRepliesTabType.Accepted},
    {name: 'Completed', key: ProjectAutoRepliesTabType.Completed},
  ]).map(item => {
    return{
      ...item,
      link: `/projects/${item.key}`
    }});

  const [currentTab, setCurrentTab] = useState(tabs[0].key)

  const handleChange = (item) => {
    setCurrentTab(item.key)
  }

  const messages = currentTab === ProjectAutoRepliesTabType.Status ? 
  [
    {name: 'Welcome/Restore', prevStatus: ApplicationStatus.Draft, nextStatus: ApplicationStatus.Applied, applicationStatusChange: true},
    {name: 'Pause', prevStatus: ProjectStatus.Published, nextStatus: ProjectStatus.Paused, applicationStatusChange: false},
    {name: 'Resume', prevStatus: ProjectStatus.Paused, nextStatus: ProjectStatus.Published, applicationStatusChange: false},
  ] :
  []

const handleSubmit = async (data, item) => {
  if(item.applicationStatusChange){
    const filtered = autoMessages?.applicationStatusChangeMessages.find(i => i.prevStatus === item.prevStatus)
    if(filtered){
      const index = autoMessages?.applicationStatusChangeMessages.indexOf(filtered)
      autoMessages?.applicationStatusChangeMessages.splice(index, 1)
      autoMessages?.applicationStatusChangeMessages.push({
        prevStatus: item.prevStatus,
        nextStatus: item.nextStatus,
        enabled: data.enabled,
        message: data.message 
    })
    }
    else{
    autoMessages?.applicationStatusChangeMessages.push({
        prevStatus: item.prevStatus,
        nextStatus: item.nextStatus,
        enabled: true,
        message: data.message 
    })
  }
  } 
  else{
    const filtered = autoMessages?.projectStatusChangeMessages.find(i => i.prevStatus === item.prevStatus)
    if(filtered){
      const index = autoMessages?.projectStatusChangeMessages.indexOf(filtered)
      autoMessages?.projectStatusChangeMessages.splice(index, 1)
      autoMessages?.projectStatusChangeMessages.push({
        prevStatus: item.prevStatus,
        nextStatus: item.nextStatus,
        enabled: data.enabled,
        message: data.message 
    })
    }
    else{
    autoMessages?.projectStatusChangeMessages.push({
      prevStatus: item.prevStatus,
      nextStatus: item.nextStatus,
      enabled: true,
      message: data.message 
  })
}
  }
  if(!autoMessages?.applicationStatusChangeMessages.length || !autoMessages?.projectStatusChangeMessages.length){
    AutoMessagesRepository.addProjectAutoMessages(autoMessages)
  }
  else{
    AutoMessagesRepository.updateProjectAutoMessages(autoMessages)
  }
}

  return (
    <div className={styles.root}>
      <ProjectTabHeader project={project}/>
      <Tabs onChange={(item) => handleChange(item)} style={'fullWidthRound'} tabs={tabs} activeTab={currentTab}/>
      <div className={styles.messageCards}>
        {messages.map(item => 
          <MessageCard 
          name={item.name} 
          project={project} 
          prevStatus={item.prevStatus} 
          nextStatus={item .nextStatus} 
          applicationStatusChange={item.applicationStatusChange}
          onSubmit={(data) => handleSubmit(data, item)}
          autoMessages={autoMessages}
          />
        )}
      </div>    
    </div>
  )
}

export default ProjectAutorepliesTab
