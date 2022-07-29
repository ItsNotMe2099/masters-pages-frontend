import * as React from 'react'
import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import {useState} from 'react'
import Tabs from 'components/ui/Tabs'
import {ApplicationStatus} from 'data/intefaces/IApplication'
import ProjectTabHeader from '../../ProjectTabHeader'

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

const ProjectAutorepliesTab = ({project}: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const [activeTab, setActiveTab] = useState(ProjectAutoRepliesTabType.Status)
  const tabs = [
    {name: 'Status', key: ProjectAutoRepliesTabType.Status},
    {name: 'Applications', key: ProjectAutoRepliesTabType.Applications},
    {name: 'Shortlist', key: ProjectAutoRepliesTabType.Shortlist},
    {name: 'Invited', key: ProjectAutoRepliesTabType.Invited},
    {name: 'Accepted', key: ProjectAutoRepliesTabType.Accepted},
    {name: 'Completed', key: ProjectAutoRepliesTabType.Completed},
  ];
  const entities = {
    [ProjectAutoRepliesTabType.Status]: [{
      type: 'application',
      prevStatus: ApplicationStatus.Applied,
      nextStatus: ApplicationStatus.Applied,
      enabled: false
    },
      {
        type: 'application',
        nextStatus: ApplicationStatus.Applied,
        enabled: false
      }
      ]
  }
  return (
    <div className={styles.root}>
      <ProjectTabHeader project={project}/>
      <Tabs style={'fullWidthRound'} tabs={tabs} activeTab={activeTab as string}/>
    </div>
  )
}

export default ProjectAutorepliesTab
