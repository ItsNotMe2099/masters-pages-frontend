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

interface Props {
  showType: 'client' | 'public'
  isOpen: boolean,
  projectId?: number,
  onClose: () => void
}
const ProjectModal = ({projectId, isOpen, onClose, showType}: Props) => {
  const dispatch = useDispatch()
  const [tab, setTab] = useState('description');
  const [project, setProject] = useState<IProject>(null);
  useEffect(() => {
    if(showType === 'public'){
      ProjectRepository.findPublicById(projectId).then(i => setProject(i));
    }else{
      ProjectRepository.findById(projectId).then(i => setProject(i));
    }

  }, [projectId])

  const tabs = (showType === 'client' && projectId) ? [
    {name: 'Description', key: 'description', icon: 'description'},
    {name: 'Volunteers', key: 'volunteers', icon: 'volunteers'},
    {name: 'Messages', key: 'messages', icon: 'messages'},
    {name: 'Auto replies', key: 'autoReplies', icon: 'autoReplies'},
    {name: 'Events', key: 'events', icon: 'events'},
    {name: 'Reports', key: 'reports', icon: 'reports'},
  ] : 
  (showType === 'client' && !projectId) ?
  [
    {name: 'Description', key: 'description', icon: 'description'},
  ] :
  [
    {name: 'Description', key: 'description', icon: 'description'},
    {name: 'Application', key: 'application', icon: 'application'},
  ];
  const handleSaveProject = async (data) => {
    if(projectId){
     await ProjectRepository.update(projectId ,{...data, id: projectId});
      await ProjectRepository.findById(projectId).then(i => setProject(i));
    }else{
     const project = await ProjectRepository.create(data);
      await ProjectRepository.findById(project.id).then(i => setProject(i));
    }

  }

  const handleClose = () => {
    setTab('description')
    onClose()
  }

  console.log("ModalProject", project);
  return (
    <Modal size={'large'} isOpen={isOpen} className={styles.modal} loading={false} closeClassName={styles.modalClose} onRequestClose={handleClose}>
    <div className={styles.root}>
    <ProjectTabs tabs={tabs} activeTab={tab} onChange={(item) => setTab(item.key)}/>
    <div className={styles.content}>

      {((projectId && project) || !projectId) && <>
      {tab === 'description' && <TabProjectDescription project={project}  onSave={handleSaveProject} showType={showType}/>}
      {tab === 'application' && <TabApplication project={project}  onSave={handleSaveProject}/>}
      {tab === 'volunteers' && <TabVolunteers project={project}/>}
      </>}
    </div>
    </div>
    </Modal>
  )
}

export default ProjectModal
