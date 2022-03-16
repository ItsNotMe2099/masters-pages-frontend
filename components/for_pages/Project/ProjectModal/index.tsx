import Modal from 'components/ui/Modal'
import * as React from 'react'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import {IProject} from 'data/intefaces/IProject'
import ProjectTabs from 'components/for_pages/Project/ProjectModal/ProjectTabs'
import {useState} from 'react'
import ProjectDescriptionTab from 'components/for_pages/Project/ProjectModal/Tabs/ProjectDescriptionTab'

interface Props {
  isOpen: boolean,
  project?: IProject,
  onClose: () => void
}
const ProjectModal = ({isOpen, project, onClose}: Props) => {
  const dispatch = useDispatch()
  const [tab, setTab] = useState('description');
  const tabs = [
    {name: 'Description', key: 'description', icon: ''},
    {name: 'Volunteers', key: 'volunteers', icon: ''},
    {name: 'Messages', key: 'messages', icon: ''},
    {name: 'Auto replies', key: 'autoReplies', icon: ''},
    {name: 'Events', key: 'events', icon: ''},
    {name: 'Reports', key: 'reports', icon: ''},
  ];
  return (
    <Modal size={'large'} isOpen={isOpen} className={styles.modal} loading={false} closeClassName={styles.modalClose} onRequestClose={onClose}>
    <div className={styles.root}>
    <ProjectTabs tabs={tabs} activeTab={tab}/>
    <div className={styles.content}>
      <ProjectDescriptionTab project={project} />
    </div>
    </div>
    </Modal>
  )
}

export default ProjectModal
