import Modal from 'components/ui/Modal'
import * as React from 'react'
import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import ProjectTabs from 'components/for_pages/Project/ProjectModal/ProjectTabs'
import {useEffect, useState} from 'react'
import ProjectRepository from 'data/repositories/ProjectRepository'
import TabApplication from 'components/for_pages/Project/ProjectModal/Tabs/TabApplication'
import TabProjectDescription from 'components/for_pages/Project/ProjectModal/Tabs/ProjectDescriptionTab'
import TabVolunteers from './Tabs/TabVolunteers'
import { useAppContext } from 'context/state'
import TabChat from 'components/for_pages/Project/ProjectModal/Tabs/TabChat'
import { IOrganization } from 'data/intefaces/IOrganization'
import { TabSelect } from 'components/TabSelect'
import CloseIcon from 'components/svg/CloseIcon'
import { ProfileRole } from 'data/intefaces/IProfile'
import classNames from 'classnames'
import ProjectAutorepliesTab from './Tabs/ProjectAutoRepliesTab'
import TabReports from './Tabs/TabReports'
import AutoMessagesRepository from 'data/repositories/AutoMessagesRepository'
import { IAutoMessages } from 'data/intefaces/IAutoMessages'
import OrganizationRepository from "data/repositories/OrganizationRepository";
import {ProjectWrapper, useProjectContext} from "context/project_state";
import {useDispatch} from "react-redux";
import {modalClose} from "components/Modal/actions";
import {ProjectVolunteerFeedbackModal} from "components/for_pages/Project/ProjectVolunteerFeedback";
import {ModalType} from "types/enums";
import ProjectApplicationNote from "components/for_pages/Project/ProjectModal/ProjectApplicationNote";

interface Props {
  showType: 'client' | 'public'
  isOpen: boolean,
  projectId?: number,
  initialTab?: string
  isEdit?: boolean
  organization?: IOrganization

}
const ProjectModalInner = ({projectId, isOpen, showType, initialTab, isEdit, ...props}: Props) => {
  const [tab, setTab] = useState(initialTab ? initialTab : 'description');
  const appContext = useAppContext()
  const projectContext = useProjectContext()
  const organization = projectContext.organization
  const profile = appContext.profile

  const dispatch = useDispatch()
  const tabs = (showType === 'client' && projectId && profile) ? [
      {name: 'Description', key: 'description', icon: 'description'},
      {name: 'Volunteers', key: 'volunteers', icon: 'volunteers'},
      {name: 'Messages', key: 'messages', icon: 'messages'},
      {name: 'Auto replies', key: 'autoReplies', icon: 'autoReplies'},
      {name: 'Events', key: 'events', icon: 'events'},
      {name: 'Reports', key: 'reports', icon: 'reports'},
    ] :
    ((!profile || showType === 'client' && !projectId)) ?
      [
        {name: 'Description', key: 'description', icon: 'description'},
      ] :
      [
        {name: 'Description', key: 'description', icon: 'description'},
        {name: 'Application', key: 'application', icon: 'application'},
        {name: 'Messages', key: 'messages', icon: 'messages'},
      ]


  const handleClose = () => {
    dispatch(modalClose())
  }

  const roleCurrent = appContext.role

  const getModeClass = () => {
    switch (roleCurrent) {
      case ProfileRole.Master:
        return styles.modeMaster
      case ProfileRole.Volunteer:
        return styles.modeVolunteer
      case ProfileRole.Corporate:
        return styles.modeCorporate
      case ProfileRole.Client:
        return styles.modeClient
      default:
        return styles.modeGuest
    }
  }

  return (
    <Modal size={'large'} isOpen={isOpen} className={styles.modal} loading={false} closeClassName={styles.modalClose}>
      <div className={styles.root}>
        <div className={styles.desktop}>
          <ProjectTabs tabs={tabs} activeTab={tab} onChange={(item) => setTab(item.key)}/>
         </div>
        <div className={classNames(styles.mobile, getModeClass())}>
          <div className={styles.topPanel}>
            <CloseIcon color='#000' className={styles.close} onClick={handleClose}/>
          </div>
          <TabSelect style='projectModal' tabs={tabs} activeTab={tab} onChange={(item) => setTab(item.key)}/>
        </div>
        <div className={styles.content}>
          <div className={styles.topPanel}>
            <CloseIcon color='#000' className={styles.close} onClick={handleClose}/>
          </div>
          {tab === 'description' && (organization || props.organization) && <TabProjectDescription project={projectContext.project} isEdit={isEdit || !projectId} organization={organization ?? props.organization}  showType={showType} onApply={(item) => setTab('application')}/>}

          {projectContext.projectId && <>
            {tab === 'application' && <TabApplication />}
            {tab === 'volunteers' && <TabVolunteers project={projectContext.project}/>}
            {tab === 'messages' && <TabChat project={projectContext.project}/>}
            {tab === 'autoReplies' && <ProjectAutorepliesTab project={projectContext.project}/>}
            {tab === 'reports' && <TabReports project={projectContext.project}/>}
          </>}
        </div>
      </div>
      {projectContext.modal === ModalType.VolunteerFeedBackModal && <ProjectVolunteerFeedbackModal  projectId={projectContext.projectId}/>}
      {projectContext.currentApplication && <ProjectApplicationNote application={projectContext.currentApplication} />}

    </Modal>
  )
}

export default function ProjectModal(props: Props){
  console.log("projectModal", props)
  return <ProjectWrapper projectId={props.projectId}  mode={props.showType === 'client' ? 'private' : 'public'}>
    <ProjectModalInner {...props}/>
  </ProjectWrapper>
}
