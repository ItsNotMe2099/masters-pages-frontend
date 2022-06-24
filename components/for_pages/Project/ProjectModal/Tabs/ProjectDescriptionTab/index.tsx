import * as React from 'react'
import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import {useTranslation} from 'next-i18next'
import {useState, useEffect} from 'react'
import Button from 'components/PublicProfile/components/Button'
import TabDescriptionForm from 'components/for_pages/Project/ProjectModal/Tabs/ProjectDescriptionTab/TabDescriptionForm'
import ProjectPage from 'components/for_pages/Project/ProjectPage'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import { ApplicationStatus, IApplication } from 'data/intefaces/IApplication'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import ProjectRepository from 'data/repositories/ProjectRepository'

interface Props {
  project: IProject | null
  onSave: (data) => any
  showType: 'client' | 'public'
  onChange?: (item) => void
  onPreview?: (data) => void
  onDelete: () => void | null
}


const TabProjectDescription = ({project, showType, ...props}: Props) => {
  const {t} = useTranslation();
  const [isEdit, setIsEdit] = useState(!project)
  const [application, setApplication] = useState<IApplication | null>(null)
  const handleSave = (data) => {
    setIsEdit(false);
    props.onSave(data);
  }

  const handlePreview = (data) => {
    setIsEdit(false);
    props.onPreview(data);
  }

  useEffect(() => {
    if(project){
    ApplicationRepository.fetchOneByProject(project.id).then((data) => {
      if(data){
        setApplication(data)
      }
    }
    )
  }
  }, [])
  const handleDelete = async () => {
    await ProjectRepository.delete(project.id)
    if(props.onDelete){
    props.onDelete()
    }
  }

  return (
  <div className={styles.root}>
    {(isEdit || !project) && <TabDescriptionForm project={project} onSave={handleSave} onPreview={handlePreview}/>}
    {(!isEdit && project) && <ProjectPage project={project} onSave={props.onSave} controls={ (showType === 'client' && project.status) ? [
      <Button color={'white'} className={styles.delete}><img src='/img/icons/recycle-bin.svg' alt=''/></Button>,
      <Button color={'red'} className={styles.edit} onClick={() => setIsEdit(true)}>Edit</Button>
    ] : 
    (!project.status) ? [<Button color={'red'} className={styles.edit} onClick={() => setIsEdit(true)}>Edit</Button>] :
    (application?.status === ApplicationStatus.Applied || 
      application?.status === ApplicationStatus.Invited ||
      application?.status === ApplicationStatus.Execution ||
      application?.status === ApplicationStatus.CompleteRequest ||
      application?.status === ApplicationStatus.Completed ||
      application?.status === ApplicationStatus.RejectedByVolunteer ||
      application?.status === ApplicationStatus.RejectedByCompany) ? null : [<Button onClick={() => ProfileRepository.addToSavedProjects({projectId: project.id})} color={'white'} className={styles.delete}>SAVE</Button>,
    <Button color={'white'} className={styles.edit} onClick={props.onChange}>Apply</Button>]}/>}
  </div>
  )
}

export default TabProjectDescription
