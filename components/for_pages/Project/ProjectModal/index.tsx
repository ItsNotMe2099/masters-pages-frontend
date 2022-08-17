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
import ProjectsPage from 'pages/projects/[projectType]'

interface Props {
  showType: 'client' | 'public'
  isOpen: boolean,
  projectId?: number,
  onClose: () => void
  onDelete?: () => void | null | undefined
  organization?: IOrganization
  initialTab?: string
  outerVar?: boolean
}
const ProjectModal = ({projectId, isOpen, onClose, showType, onDelete, organization, initialTab, outerVar}: Props) => {
  const [tab, setTab] = useState(initialTab ? initialTab : 'description');
  const [project, setProject] = useState<IProject>(null);
  const appContext = useAppContext()
  const profile = appContext.profile
  const autoMessagesObject = {projectId: projectId, applicationStatusChangeMessages: [], projectStatusChangeMessages: []}
  const [autoMessages, setAutomessages] = useState<IAutoMessages | null>(autoMessagesObject)

  useEffect(() => {
    if(showType === 'public'){
      ProjectRepository.findPublicById(projectId).then(i => setProject(i))
    }
    if(!profile){
      ProjectRepository.searchByProjectId(1, 10, projectId).then(data => setProject(data.data[0]))
    }
    else{
      ProjectRepository.findById(projectId).then(i => setProject(i))
    }

    AutoMessagesRepository.getProjectAutoMessagesByProjectId(projectId).then(data => {
      if(data){
        setAutomessages(data)
      }
  })

  }, [projectId])

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

  ;
  const handleSaveProject = async (data: IProject) => {
    await ProjectRepository.findById(data.id).then(i => setProject(i))
  }

  const handlePreviewProject = (data) => {
    setProject(i => ({...i, ...data}))
  }

  const handleClose = () => {
    setTab('description')
    setProject(null)
    onClose()
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
          {((projectId && project) || !projectId) && <>
            {tab === 'description' && <TabProjectDescription outerVar={outerVar} organization={organization} project={project} onPreview={handlePreviewProject}  onSave={handleSaveProject} showType={showType} onChange={(item) => setTab('application')} onDelete={onDelete}/>}
            {tab === 'application' && <TabApplication project={project}  onSave={handleSaveProject}/>}
            {tab === 'volunteers' && <TabVolunteers project={project}/>}
            {tab === 'messages' && <TabChat project={project}/>}
            {tab === 'autoReplies' && <ProjectAutorepliesTab project={project} autoMessages={autoMessages}/>}
            {tab === 'reports' && <TabReports project={project}/>}
          </>}
        </div>
      </div>
    </Modal>
  )
}

export default ProjectModal
