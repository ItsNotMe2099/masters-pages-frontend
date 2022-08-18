import * as React from 'react'
import styles from './index.module.scss'
import {IProject, ProjectStatus} from 'data/intefaces/IProject'
import {useTranslation} from 'next-i18next'
import {useState, useEffect} from 'react'
import Button from 'components/PublicProfile/components/Button'
import TabDescriptionForm from 'components/for_pages/Project/ProjectModal/Tabs/ProjectDescriptionTab/TabDescriptionForm'
import ProjectPage from 'components/for_pages/Project/ProjectPage'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import { ApplicationStatus, IApplication } from 'data/intefaces/IApplication'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import ProjectRepository from 'data/repositories/ProjectRepository'
import { useAppContext } from 'context/state'
import { IOrganization } from 'data/intefaces/IOrganization'
import { useRouter } from 'next/router'

interface Props {
  project: IProject | null
  onSave: (data) => any
  showType: 'client' | 'public'
  onChange?: (item) => void
  onPreview?: (data) => void
  onDelete: () => void | null
  organization?: IOrganization
  outerVar?: boolean
}


const TabProjectDescription = ({project, showType, organization, outerVar, ...props}: Props) => {
  const {t} = useTranslation();
  const [isEdit, setIsEdit] = useState(outerVar ? outerVar : !project)
  const [application, setApplication] = useState<IApplication | null>(null)
  const [projectStatus, setProjectStatus] = useState(project?.status)
  const router = useRouter()
  const handleSave = (data) => {
    setIsEdit(false);
    props.onSave(data);
  }

  const context = useAppContext()

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

  const handleChangeProjectStatus = async (newStatus: ProjectStatus, projectId: number) => {
    await ProjectRepository.update(projectId, {status: newStatus})
    setProjectStatus(newStatus)
  }

  const renderActionButton = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.Draft:
        return <Button color={'grey'} onClick={() => handleChangeProjectStatus(ProjectStatus.Published, project.id)} projectBtn='default'>PUBLISH</Button>
      case ProjectStatus.Published:
        return <><Button type='button' onClick={() => handleChangeProjectStatus(ProjectStatus.Paused, project.id)} projectBtn='default'>PAUSE</Button>
                <Button onClick={() => handleChangeProjectStatus(ProjectStatus.Execution, project.id)} type='button' projectBtn='default'>LAUNCH</Button></>
      case ProjectStatus.Paused:
        return <Button onClick={() => handleChangeProjectStatus(ProjectStatus.Published, project.id)} type='button' projectBtn='default'>RESUME</Button>
      case ProjectStatus.Execution:
        return <><Button 
        onClick={() => handleChangeProjectStatus(ProjectStatus.Completed, project.id)} type='button' projectBtn='default'>COMPLETE</Button>
          <Button onClick={() => handleChangeProjectStatus(ProjectStatus.Canceled, project.id)} type='button' projectBtn='default'>ABORT</Button></>
    }
  }

  return (
  <div className={styles.root}>
    {(isEdit || !project) && <TabDescriptionForm project={project} onSave={handleSave} onPreview={handlePreview}/>}
    {(!isEdit && project) && <ProjectPage organization={organization} projectStatus={projectStatus}  project={project} onSave={props.onSave} controls={ (showType === 'client' && project.status) ? [
      projectStatus === ProjectStatus.Draft && renderActionButton(ProjectStatus.Draft),
      projectStatus === ProjectStatus.Published && renderActionButton(ProjectStatus.Published),
      projectStatus === ProjectStatus.Paused && renderActionButton(ProjectStatus.Paused),
      projectStatus === ProjectStatus.Execution && renderActionButton(ProjectStatus.Execution),
      <Button color={'white'} onClick={handleDelete} className={styles.delete}><img src='/img/icons/recycle-bin.svg' alt=''/></Button>,
      (projectStatus === ProjectStatus.Draft || projectStatus === ProjectStatus.Published || projectStatus === ProjectStatus.Paused) && <Button color={'red'} className={styles.edit} onClick={() => setIsEdit(true)}>Edit</Button>
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
