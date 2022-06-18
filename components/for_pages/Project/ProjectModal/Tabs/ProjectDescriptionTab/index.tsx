import * as React from 'react'
import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import {useTranslation} from 'next-i18next'
import {useState, useEffect} from 'react'
import Button from 'components/PublicProfile/components/Button'
import TabDescriptionForm from 'components/for_pages/Project/ProjectModal/Tabs/ProjectDescriptionTab/TabDescriptionForm'
import ProjectPage from 'components/for_pages/Project/ProjectPage'
import BaskerOutlineIcon from 'components/svg/BaskerOutlineIcon'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import { ApplicationStatus, IApplication } from 'data/intefaces/IApplication'
import ApplicationRepository from 'data/repositories/ApplicationRepository'

interface Props {
  project: IProject | null
  onSave: (data) => any
  showType: 'client' | 'public'
  onChange?: (item) => void
}


const TabProjectDescription = ({project, showType, ...props}: Props) => {
  const {t} = useTranslation();
  const [isEdit, setIsEdit] = useState(!project)
  const [application, setApplication] = useState<IApplication | null>(null)
  const handleSave = (data) => {
    setIsEdit(false);
    props.onSave(data);
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

  return (
  <div className={styles.root}>
    {(isEdit || !project) && <TabDescriptionForm project={project} onSave={handleSave}/>}
    {(!isEdit && project) && <ProjectPage project={project} onSave={props.onSave} controls={ showType === 'client' ? [
      <Button color={'white'} className={styles.delete}><img src='/img/icons/recycle-bin.svg' alt=''/></Button>,
      <Button color={'red'} className={styles.edit} onClick={() => setIsEdit(true)}>Edit</Button>
    ] : application?.status !== ApplicationStatus.Completed ? [<Button onClick={() => ProfileRepository.addToSavedProjects({projectId: project.id})} color={'white'} className={styles.delete}>SAVE</Button>,
    <Button color={'white'} className={styles.edit} onClick={props.onChange}>Apply</Button>] : null}/>}
  </div>
  )
}

export default TabProjectDescription
