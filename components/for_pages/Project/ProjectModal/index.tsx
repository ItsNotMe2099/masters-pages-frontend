import Modal from 'components/ui/Modal'
import * as React from 'react'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
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
import { useRouter } from 'next/router'
import { TabSelect } from 'components/TabSelect'

interface Props {
  showType: 'client' | 'public'
  isOpen: boolean,
  projectId?: number,
  onClose: () => void
  onDelete?: () => void | null | undefined
  organization?: IOrganization
  initialTab?: string
}
const ProjectModal = ({projectId, isOpen, onClose, showType, onDelete, organization, initialTab}: Props) => {
  const dispatch = useDispatch()
  const [tab, setTab] = useState(initialTab ? initialTab : 'description');
  const [project, setProject] = useState<IProject>(null);
  const appContext = useAppContext()
  const profile = appContext.profile
  const router = useRouter()

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
    onClose()
  }

  console.log("ModalProject", project);
  return (
    <Modal size={'large'} isOpen={isOpen} className={styles.modal} loading={false} closeClassName={styles.modalClose} onRequestClose={handleClose}>
      <div className={styles.root}>
        <div className={styles.desktop}><ProjectTabs tabs={tabs} activeTab={tab} onChange={(item) => setTab(item.key)}/></div>
        <div className={styles.mobile}><TabSelect style='projectModal' tabs={tabs} activeTab={tab} onChange={(item) => setTab(item.key)}/></div>
        <div className={styles.content}>
          {((projectId && project) || !projectId) && <>
            {tab === 'description' && <TabProjectDescription organization={organization} project={project} onPreview={handlePreviewProject}  onSave={handleSaveProject} showType={showType} onChange={(item) => setTab('application')} onDelete={onDelete}/>}
            {tab === 'application' && <TabApplication project={project}  onSave={handleSaveProject}/>}
            {tab === 'volunteers' && <TabVolunteers project={project}/>}
            {tab === 'messages' && <TabChat project={project}/>}
          </>}
        </div>
      </div>
    </Modal>
  )
}

export default ProjectModal
