import * as React from 'react'
import styles from './index.module.scss'
import {IProject, ProjectStatus} from 'data/intefaces/IProject'
import classNames from 'classnames'
import Avatar from 'components/ui/Avatar'
import {format} from 'date-fns'
import {confirmModalClose, confirmOpen, modalClose, signUpOpen} from 'components/Modal/actions'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'next-i18next'
import ProjectRepository from 'data/repositories/ProjectRepository'
import {useMemo} from 'react'
import {useAppContext} from 'context/state'
import WorkInListItem from 'components/PublicProfile/components/view/CardPreferWorkIn/components/WorkInListItem'
import ProjectCategories from 'components/for_pages/Project/ProjectCategories'
import Button from 'components/PublicProfile/components/Button'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import {useState} from 'react'
import {ProfileRole} from 'data/intefaces/IProfile'
import {ProjectWrapper, useProjectContext} from "context/project_state";
import {ApplicationWrapper, useApplicationContext} from "context/application_state";

interface Props {
  project?: IProject
  application?: IApplication | null
  actionsType: 'client' | 'public' | 'volunteer' | 'corporate'
  onModalOpen: (mode: 'edit' | 'view' | 'application') => void
  status?: string | string[]
  onDelete?: () => void
}

const ProjectActionsInner = (props: Props) => {
  const { actionsType} = props;
  const {t} = useTranslation();
  const projectContext = useProjectContext();
  const applicationContext = useApplicationContext()
  const project = projectContext.project;
  const dispatch = useDispatch()
  const appContext = useAppContext();
  const profile = appContext.profile

  const description = (newStatus: ApplicationStatus, button?: string) => {
    switch (newStatus) {
      case ApplicationStatus.Completed:
        if (profile.role === 'volunteer') {
          return 'Your involvement will be marked as “completed” and will be ended. Do you want to proceed?'
        } else {
          return 'Volunteer involvement will be marked as “completed” and will be ended. Do you want to proceed?'
        }
      case ApplicationStatus.CompleteRequest:
        if (profile.role === 'volunteer') {
          return 'Your involvement will be marked as “completed” and will be ended. Do you want to proceed?'
        } else {
          return 'Volunteer involvement will be marked as “completed” and will be ended. Do you want to proceed?'
        }
      case ApplicationStatus.Invited:
        return 'Invitation to join the project will be sent to the applicant. Do you want to proceed?'
      case ApplicationStatus.Shortlist:
        if (button === 'CANCEL INVITATION') {
          return 'Invitation to join the project will be withdrawn. Do you want to proceed?'
        } else {
          return 'The application will be “shortlisted”. Do you want to proceed?'
        }
      case ApplicationStatus.Execution:
        return 'Accept invitation?'
      case ApplicationStatus.RejectedByCompany:
        return 'Volunteer involvement will be cancelled. Do you want to proceed?'
      case ApplicationStatus.RejectedByVolunteer:
        return 'Your participation in the project will be ended. Do you want to proceed?'
    }
  }

  const handleChangeProjectStatus = (newStatus: ProjectStatus) => {
    projectContext.changeStatus(newStatus);
  }


  const handleSave = async () => {
    dispatch(confirmOpen({
      description: `Do you want to save this project?`,
      onConfirm: async () => {
        dispatch(modalClose())
        await ProfileRepository.addToSavedProjects({projectId: project.id})
      }
    }))
  }

  const handleApply = () => {
    if (!profile) {
      dispatch(signUpOpen())
      return;
    }
    props.onModalOpen('application')
  }

  const handleConfirm = (status: ApplicationStatus) => {
    dispatch(confirmModalClose())
  }

  const confirmData = (status: ApplicationStatus, button?: string) => {
    return {
      title: ' ', description: description(status, button), onConfirm: () => {
        handleConfirm(status)
      }, onCancel: () => {
        dispatch(confirmModalClose())
      }
    }
  }
  const handleView = () => {
      props.onModalOpen('view')

  }

  const handleEdit = () => {
   props.onModalOpen('edit')
  }
  const handlePublish = () => {
    handleChangeProjectStatus(ProjectStatus.Published)
  }
  const handleUnPublish = () => {
    handleChangeProjectStatus(ProjectStatus.Draft)
  }
  const handleAccept = () => {
    applicationContext.changeStatus(ApplicationStatus.Execution)
  }
  const handleReject = () => {
    applicationContext.changeStatus(ApplicationStatus.RejectedByVolunteer)
  }
  const handleReApply = () => {
    applicationContext.changeStatus(ApplicationStatus.Applied)
  }
  const handleResume = () => {
    handleChangeProjectStatus(ProjectStatus.Published)
  }
  const handlePause = () => {
    handleChangeProjectStatus(ProjectStatus.Paused)
  }
  const handleComplete = () => {
    if (profile.role === ProfileRole.Corporate) {
      handleChangeProjectStatus(ProjectStatus.Completed)
    } else {
      applicationContext.changeStatus(ApplicationStatus.CompleteRequest)
    }
  }
  const handleAbort = () => {
    handleChangeProjectStatus(ProjectStatus.Canceled)
  }
  const handleLaunch = () => {
    handleChangeProjectStatus(ProjectStatus.Execution)
  }
  const handleDelete = () => {
    props.onDelete()
  }
  const renderActionButton = (action) => {
    switch (action) {
      case 'view':
        return <Button color={'grey'} onClick={handleView}>VIEW</Button>
      case 'delete':
        return <Button color={'grey'}>DELETE</Button>
      case 'edit':
        return <Button onClick={handleEdit} type='button'
                       projectBtn='default'>EDIT</Button>
      case 'publish':
        return <Button color={'grey'} onClick={handlePublish} projectBtn='default'>PUBLISH</Button>
      case 'unPublish':
        return <Button color={'grey'} onClick={handleUnPublish}>UNPUBLISH</Button>
      case 'apply':
        return <Button color={'grey'} onClick={handleApply}>APPLY</Button>
      case 'save':
        return <Button onClick={() => profile ? handleSave() : dispatch(signUpOpen())} color={'grey'}>SAVE</Button>
      case 'open':
        return <Button onClick={handleView} type='button' projectBtn='default'>OPEN</Button>
      case 'pause':
        return <Button type='button' onClick={handlePause} projectBtn='default'>PAUSE</Button>
      case 'resume':
        return <Button onClick={handleResume} type='button' projectBtn='default'>RESUME</Button>
      case 'launch':
        return <Button onClick={handleLaunch} type='button' projectBtn='default'>LAUNCH</Button>
      case 'applyAlt':
        return <Button onClick={handleApply} type='button' projectBtn='default'>APPLY</Button>
      case 'reapply':
        return <Button onClick={handleReApply} type='button' projectBtn='default'>REAPPLY</Button>
      case 'recall':
        return <Button type='button' onClick={handleReject} projectBtn='red'>RECALL</Button>
      case 'accept':
        return <Button onClick={handleAccept} type='button' projectBtn='green'>ACCEPT</Button>
      case 'reject':
        return <Button onClick={handleReject} type='button' projectBtn='red'>RECALL</Button>
      case 'complete':
        return <Button
          onClick={handleComplete} type='button'
          projectBtn={profile.role === ProfileRole.Corporate ? 'default' : 'green'}>COMPLETE</Button>
      case 'abort':
        return <Button onClick={handleAbort} type='button' projectBtn='default'>ABORT</Button>
      case 'recycleBin':
        return <Button
          onClick={handleDelete}
          projectBtn='recycleBin'><img src='/img/icons/recycle-bin.svg' alt=''/></Button>

    }
  }

  const actions = useMemo(
    () => {
      const actions = []
      {actionsType !== 'volunteer' && actions.push('view')}
      if (actionsType === 'client') {
        if (([ProjectStatus.Draft, ProjectStatus.Published] as ProjectStatus[]).includes(project.status) && profile?.id === project.corporateProfileId) {
        }
        if (([ProjectStatus.Draft] as ProjectStatus[]).includes(project.status)) {
          actions.pop()
          actions.push('open')
          actions.push('publish')
          actions.push('recycleBin')
        }

        if (([ProjectStatus.Published] as ProjectStatus[]).includes(project.status) && profile?.id === project.corporateProfileId) {
          actions.pop()
          actions.push('open')
          actions.push('pause')
          actions.push('launch')
          actions.push('recycleBin')
        }
        if (([ProjectStatus.Paused] as ProjectStatus[]).includes(project.status) && profile?.id === project.corporateProfileId) {
          actions.pop()
          actions.push('open')
          //actions.push('pause')
          actions.push('edit')
          actions.push('resume')
          actions.push('recycleBin')
        }
        if (([ProjectStatus.Execution] as ProjectStatus[]).includes(project.status)) {
          actions.pop()
          actions.push('open')
          actions.push('complete')
          //actions.push('abort')
          actions.push('recycleBin')
        }
        if (([ProjectStatus.Completed] as ProjectStatus[]).includes(project.status) || ([ProjectStatus.Canceled] as ProjectStatus[]).includes(project.status)) {
          actions.pop()
          actions.push('open')
          actions.push('recycleBin')
        }


      } else if (actionsType === 'public') {
        actions.push('share')
        actions.push('save')
        actions.push('apply')
      }
      else if (actionsType === 'volunteer') {
        actions.push('open')
        if(props.status === 'saved'){
          actions.push('applyAlt')
        }
        if(props.status === 'invited'){
          actions.push('accept')
          actions.push('reject')
        }
        if(props.status === 'execution'){
          actions.push('complete')
          actions.push('reject')
        }
        if(props.status === 'applied'){
          actions.push('reject')
        }
        if(props.status === 'rejected'){
          actions.push('reapply')
        }
        if(props.status === 'completed' || props.status === 'rejected' || props.status === 'saved'){
          actions.push('recycleBin')
        }
      }
      else if(actionsType === 'corporate'){
        actions.push('save')
      }
      return actions;
    },
    [actionsType, project?.status, profile?.id, props.status]
  )

  return (
    <div className={styles.root}>
      {actions.map((action, index) => renderActionButton(action))}
    </div>
  )
}

export default function ProjectActions(props: Props){
return (<ProjectWrapper mode={['client'].includes(props.actionsType) ? 'private' : 'public'} projectId={props.project?.id} project={props.project}>
  <ApplicationWrapper applicationId={props.application?.id} application={props.application}>
    <ProjectActionsInner {...props}/>
  </ApplicationWrapper>
</ProjectWrapper>)
}
