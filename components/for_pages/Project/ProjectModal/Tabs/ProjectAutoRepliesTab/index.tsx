import * as React from 'react'
import styles from './index.module.scss'
import { IProject, ProjectStatus } from 'data/intefaces/IProject'
import { useTranslation } from 'next-i18next'
import { useAppContext } from 'context/state'
import { useEffect, useState } from 'react'
import Tabs from '../TabVolunteers/Tabs'
import { ApplicationStatus } from 'data/intefaces/IApplication'
import ProjectTabHeader from '../../ProjectTabHeader'
import MessageCard from './MessageCard'
import { IAutoMessages } from 'data/intefaces/IAutoMessages'
import AutoMessagesRepository from 'data/repositories/AutoMessagesRepository'
import classNames from 'classnames'
import { TabSelect } from 'components/TabSelect'
import { useProjectContext } from "context/project_state";
import Loader from "components/ui/Loader";
import AutoConfirmedEventsForm from './AutoConfirmedEventsForm'

interface Props {
  project: IProject | null
}

export enum ProjectAutoRepliesTabType {
  Status = 'status',
  Applications = 'applications',
  Shortlist = 'shortList',
  Invited = 'invited',
  Accepted = 'accepted',
  Completed = 'completed',
}

const ProjectAutorepliesTab = ({ project }: Props) => {
  const { t } = useTranslation();
  const appContext = useAppContext();
  const projectContext = useProjectContext()
  const tabs = ([
    { name: 'Status', key: ProjectAutoRepliesTabType.Status },
    { name: 'Applications', key: ProjectAutoRepliesTabType.Applications },
    { name: 'Shortlist', key: ProjectAutoRepliesTabType.Shortlist },
    { name: 'Invited', key: ProjectAutoRepliesTabType.Invited },
    //{name: 'Accepted', key: ProjectAutoRepliesTabType.Accepted},
    { name: 'Completed', key: ProjectAutoRepliesTabType.Completed },
  ]).map(item => {
    return {
      ...item,
      link: `/projects/${item.key}`
    }
  });

  const [currentTab, setCurrentTab] = useState(tabs[0].key)
  const autoMessages = projectContext.autoMessages

  useEffect(() => {
    projectContext.fetchAutoMessages()
  }, [])
  const handleChange = (item) => {
    setCurrentTab(item.key)
  }

  const messages = currentTab === ProjectAutoRepliesTabType.Status ?
    [
      {
        name: 'Welcome/Restore',
        prevStatus: ApplicationStatus.Draft,
        nextStatus: ApplicationStatus.Applied,
        applicationStatusChange: true
      },
      {
        name: 'Pause',
        prevStatus: ProjectStatus.Published,
        nextStatus: ProjectStatus.Paused,
        applicationStatusChange: false
      },
      {
        name: 'Resume',
        prevStatus: ProjectStatus.Paused,
        nextStatus: ProjectStatus.Published,
        applicationStatusChange: false
      },
    ] :
    currentTab === ProjectAutoRepliesTabType.Applications ?
      [
        {
          name: 'Shortlist',
          prevStatus: ApplicationStatus.Applied,
          nextStatus: ApplicationStatus.Shortlist,
          applicationStatusChange: true
        },
        {
          name: 'Reject',
          prevStatus: ApplicationStatus.Applied,
          nextStatus: ApplicationStatus.RejectedByCompany,
          applicationStatusChange: true
        },
      ]
      :
      currentTab === ProjectAutoRepliesTabType.Shortlist ?
        [
          {
            name: 'Invite',
            prevStatus: ApplicationStatus.Shortlist,
            nextStatus: ApplicationStatus.Invited,
            applicationStatusChange: true
          },
          {
            name: 'Reject',
            prevStatus: ApplicationStatus.Shortlist,
            nextStatus: ApplicationStatus.RejectedByCompany,
            applicationStatusChange: true
          },
        ] :
        currentTab === ProjectAutoRepliesTabType.Invited ?
          [
            {
              name: 'Cancel invitation',
              prevStatus: ApplicationStatus.Invited,
              nextStatus: ApplicationStatus.Shortlist,
              applicationStatusChange: true
            },
          ]
          :
          currentTab === ProjectAutoRepliesTabType.Completed ?
            [
              { name: 'Completed', nextStatus: 'feedback.created', isEvent: true },
              { name: 'Completed', nextStatus: 'recommendation.created', isEvent: true },
            ]
            :
            []

  const handleSubmit = async (data, item) => {
    autoMessages.projectId = project.id
    if (item.applicationStatusChange) {
      const filtered = autoMessages?.applicationStatusChangeMessages.find(i => i.nextStatus === item.nextStatus && i.prevStatus === item.prevStatus)
      if (filtered) {
        const index = autoMessages?.applicationStatusChangeMessages.indexOf(filtered)
        autoMessages?.applicationStatusChangeMessages.splice(index, 1)
        autoMessages?.applicationStatusChangeMessages.push({
          prevStatus: item.prevStatus,
          nextStatus: item.nextStatus,
          enabled: data.enabled,
          message: data.message
        })
      } else {
        autoMessages?.applicationStatusChangeMessages.push({
          prevStatus: item.prevStatus,
          nextStatus: item.nextStatus,
          enabled: true,
          message: data.message
        })
      }
    } else if (item.isEvent) {
      const filtered = autoMessages?.eventMessages.find(i => i.event === item.nextStatus)
      if (filtered) {
        const index = autoMessages?.eventMessages.indexOf(filtered)
        autoMessages?.eventMessages.splice(index, 1)
        autoMessages?.eventMessages.push({
          event: item.nextStatus,
          enabled: data.enabled,
          message: data.message
        })
      } else {
        autoMessages?.eventMessages.push({
          event: item.nextStatus,
          enabled: true,
          message: data.message
        })
      }
    } else {
      const filtered = autoMessages?.projectStatusChangeMessages.find(i => i.nextStatus === item.nextStatus && i.prevStatus === item.prevStatus)
      if (filtered) {
        const index = autoMessages?.projectStatusChangeMessages.indexOf(filtered)
        autoMessages?.projectStatusChangeMessages.splice(index, 1)
        autoMessages?.projectStatusChangeMessages.push({
          prevStatus: item.prevStatus,
          nextStatus: item.nextStatus,
          enabled: data.enabled,
          message: data.message
        })
      } else {
        autoMessages?.projectStatusChangeMessages.push({
          prevStatus: item.prevStatus,
          nextStatus: item.nextStatus,
          enabled: true,
          message: data.message
        })
      }
    }
    if (!autoMessages?.applicationStatusChangeMessages.length || !autoMessages?.projectStatusChangeMessages.length || !autoMessages?.eventMessages.length) {
      await AutoMessagesRepository.addProjectAutoMessages(autoMessages)
    } else {
      await AutoMessagesRepository.updateProjectAutoMessages(autoMessages)
    }
  }

  const isColumns = () => {
    switch (currentTab) {
      case ProjectAutoRepliesTabType.Applications:
        return true
      case ProjectAutoRepliesTabType.Shortlist:
        return true
      case ProjectAutoRepliesTabType.Completed:
        return true
      default:
        return false
    }
  }


  if (projectContext.autoMessageLoading) {
    return (<div className={styles.root}>
      <ProjectTabHeader project={project} />
      <Loader />
    </div>)
  }
  return (
    <div className={styles.root}>
      <ProjectTabHeader project={project} />
      <AutoConfirmedEventsForm project={project} />
      <div className={styles.settings}>
        REPLIES settings
      </div>
      {currentTab === ProjectAutoRepliesTabType.Applications ?
        <div className={styles.altMessageCards}>
          <div className={styles.desktop}>
            <Tabs onChange={(item) => handleChange(item)} style={'fullWidthRound'} tabs={tabs} activeTab={currentTab} />
          </div>
          <div className={styles.mobile}>
            <TabSelect style='projectStatus' tabs={tabs} activeTab={currentTab}
              onChange={(item) => setCurrentTab(item.key)} />
          </div>
          <div className={classNames(styles.messageCards, { [styles.columns]: isColumns() === true })}>
            {messages.map(item =>
              <MessageCard
                name={item.name}
                project={project}
                prevStatus={item.prevStatus}
                nextStatus={item.nextStatus}
                applicationStatusChange={item.applicationStatusChange}
                onSubmit={(data) => handleSubmit(data, item)}
                autoMessages={autoMessages}
                className={styles.messageCard}
                desc
              />
            )}
          </div>
        </div>
        :
        <>
          <div className={styles.desktop}>
            <Tabs onChange={(item) => handleChange(item)} style={'fullWidthRound'} tabs={tabs} activeTab={currentTab} />
          </div>
          <div className={styles.mobile}>
            <TabSelect style='projectStatus' tabs={tabs} activeTab={currentTab}
              onChange={(item) => setCurrentTab(item.key)} />
          </div>
          <div className={classNames(styles.messageCards, { [styles.columns]: isColumns() === true })}>
            {messages.map(item =>
              <MessageCard
                name={item.name}
                project={project}
                prevStatus={item.prevStatus}
                nextStatus={item.nextStatus}
                applicationStatusChange={item.applicationStatusChange}
                isEvent={item.isEvent}
                onSubmit={(data) => handleSubmit(data, item)}
                autoMessages={autoMessages}
                className={styles.messageCard}
                desc={currentTab !== ProjectAutoRepliesTabType.Status}
              />
            )}
          </div>
        </>
      }
    </div>
  )
}

export default ProjectAutorepliesTab
