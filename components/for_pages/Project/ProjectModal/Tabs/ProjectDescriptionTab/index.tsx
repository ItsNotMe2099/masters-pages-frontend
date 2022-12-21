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
import { useDispatch } from 'react-redux'
import {confirmModalClose, confirmOpen, modalClose} from 'components/Modal/actions'
import {useProjectContext} from "context/project_state";
import classNames from "classnames";

interface Props {
  project: IProject | null
  showType: 'client' | 'public'
  onApply?: (item) => void
  onPreview?: (data) => void
  organization?: IOrganization
  isEdit?: boolean
  onClose?: () => void
  fullWidth?: boolean
}


const TabProjectDescription = ({project, showType, organization, onClose, fullWidth, ...props}: Props) => {
  const {t} = useTranslation();
  const projectContext = useProjectContext()
  const [isEdit, setIsEdit] = useState(props.isEdit)
  const [projectPreview, setProjectPreview] = useState<IProject | null>(null)
  const [application, setApplication] = useState<IApplication | null>(null)
  const projectStatus = project?.status
  const router = useRouter()
  console.log('router', router)
  console.log("ISEdit11", isEdit)
  const dispatch = useDispatch()

  const appContext = useAppContext()
  const currentProfile = appContext.profile

  const handleSave = () => {
    setIsEdit(false);
    setProjectPreview(null)
  }

  const context = useAppContext()

  const handlePreview = (data: IProject) => {
    setProjectPreview(data)
  }
  const handleEdit = () => {
    setIsEdit(true);
    setProjectPreview(null)
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



  const handleChangeProjectStatus = async (newStatus: ProjectStatus, projectId: number, oldStatus?: ProjectStatus) => {
    if(await projectContext.changeStatus(newStatus)){
      dispatch(modalClose())
    }

  }
  const handleDelete = () => {
    projectContext.delete();
  }

  const handleDeleteSaved = (project: IProject) => {
    dispatch(confirmOpen({
      description: `${t('task.confirmDelete')} «${project.title}»?`,
      onConfirm: async () => {
        dispatch(modalClose())
        await ProfileRepository.deleteFromSavedProjects({profileId: currentProfile?.id}, project.id)
      }
    }))
  }


  const renderActionButton = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.Draft:
        return <Button color={'grey'} onClick={() => handleChangeProjectStatus(ProjectStatus.Published, project.id/*, ProjectStatus.Draft*/)} projectBtn='default'>PUBLISH</Button>
      case ProjectStatus.Published:
        return <><Button type='button' onClick={() => handleChangeProjectStatus(ProjectStatus.Paused, project.id)} projectBtn='default'>PAUSE</Button>
                <Button onClick={() => handleChangeProjectStatus(ProjectStatus.Execution, project.id)} type='button' projectBtn='default'>LAUNCH</Button></>
      case ProjectStatus.Paused:
        return <Button onClick={() => handleChangeProjectStatus(ProjectStatus.Published, project.id)} type='button' projectBtn='default'>RESUME</Button>
      case ProjectStatus.Execution:
        return <><Button
        onClick={() => handleChangeProjectStatus(ProjectStatus.Completed, project.id)} type='button' projectBtn='default'>COMPLETE</Button>
          <Button  className={styles.delete} onClick={() => handleChangeProjectStatus(ProjectStatus.Canceled, project.id)} type='button' projectBtn='default'><img src='/img/icons/recycle-bin.svg' alt=''/></Button></>
    }
  }

  return (
  <div className={styles.root}>
    {(isEdit) && <div className={classNames({[styles.hidden]: !!projectPreview})}><TabDescriptionForm project={project} onSave={handleSave} onPreview={handlePreview}/></div>}
    {((!isEdit && project) || !!projectPreview) && <ProjectPage fullWidth={fullWidth} organization={organization} projectStatus={projectStatus}  project={projectPreview ?? project} onSave={handleSave} controls={ (showType === 'client' && project?.status) ? [
      (projectStatus === ProjectStatus.Draft || projectStatus === ProjectStatus.Paused) && <Button projectBtn='default' className={styles.edit} onClick={handleEdit}>Edit</Button>,
      projectStatus === ProjectStatus.Draft && renderActionButton(ProjectStatus.Draft),
      projectStatus === ProjectStatus.Published && renderActionButton(ProjectStatus.Published),
      projectStatus === ProjectStatus.Paused && renderActionButton(ProjectStatus.Paused),
      projectStatus === ProjectStatus.Execution && renderActionButton(ProjectStatus.Execution),
      projectStatus !== ProjectStatus.Execution && <Button color={'white'}
      onClick={() => projectStatus !== ProjectStatus.Canceled ? handleChangeProjectStatus(ProjectStatus.Canceled, project.id) : handleDelete()} className={styles.delete}><img src='/img/icons/recycle-bin.svg' alt=''/></Button>,
    ] :
    (!project?.status) ? [<Button color={'red'} className={styles.edit} onClick={handleEdit}>Edit</Button>] :
    (application?.status === ApplicationStatus.Applied ||
      application?.status === ApplicationStatus.Invited ||
      application?.status === ApplicationStatus.Execution ||
      application?.status === ApplicationStatus.CompleteRequest ||
      application?.status === ApplicationStatus.Completed ||
      application?.status === ApplicationStatus.RejectedByVolunteer ||
      application?.status === ApplicationStatus.RejectedByCompany) ? null : router.query.projectType !== 'saved' ? [<Button onClick={() => projectContext.saveToFavorite()} color={'white'} className={styles.delete}>SAVE</Button>,
    <Button color={'white'} className={styles.edit} onClick={props.onApply}>Apply</Button>] : [<Button color={'white'} className={styles.edit} onClick={props.onApply}>Apply</Button>,
    <Button color={'white'}
      onClick={() => handleDeleteSaved(project)} className={styles.delete}><img src='/img/icons/recycle-bin.svg' alt=''/></Button>
    ]}/>}
  </div>
  )
}

export default TabProjectDescription
