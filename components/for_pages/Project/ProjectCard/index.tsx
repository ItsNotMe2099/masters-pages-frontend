import Modal from 'components/ui/Modal'
import * as React from 'react'
import styles from './index.module.scss'
import {IProject, ProjectStatus} from 'data/intefaces/IProject'
import classNames from 'classnames'
import Avatar from 'components/ui/Avatar'
import {format} from 'date-fns'
import TaskActionButton from 'components/Task/components/ActionButton'
import BookmarkSvg from 'components/svg/Bookmark'
import {confirmOpen} from 'components/Modal/actions'
import {deleteTaskUser, setPublishedTaskUser} from 'components/TaskUser/actions'
import { useDispatch, useSelector } from 'react-redux'
import {useTranslation} from 'next-i18next'
import ProjectRepository from 'data/repositories/ProjectRepository'
import {ITaskStatus} from 'types'
import {useMemo} from 'react'
import {IProfile, ProfileRole} from 'data/intefaces/IProfile'
import {useAppContext} from 'context/state'
import WorkInListItem from 'components/PublicProfile/components/view/CardPreferWorkIn/components/WorkInListItem'
import ProjectCategories from 'components/for_pages/Project/ProjectCategories'
import Button from 'components/PublicProfile/components/Button'
import { ApplicationStatus, IApplication } from 'data/intefaces/IApplication'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import ProfileRepository from 'data/repositories/ProfileRepostory'

interface Props {
  project: IProject
  actionsType: 'client' | 'public' | 'volunteer'
  onViewOpen: (project: IProject) => void
  onApplyClick?: (project: IProject) => void
  onDelete?: (project: IProject) => void
  onUpdateStatus?: (status: ProjectStatus, project: IProject) => void
  status?: string | string[]
  onStatusChange?: (newStatus: ApplicationStatus) => void
}
const DurationDates = ({name, startDate, endDate}: {name: string, startDate?: string, endDate?: string}) => {
  return <div className={styles.durationDate}>
    <div className={styles.name}>{name}</div>
    <img src={'/img/Project/calendar.svg'} className={styles.icon}/>
    {startDate && <div className={styles.duration}>{format(new Date(startDate), 'MM.dd.yyy')}</div>}
    {startDate && endDate && <div className={styles.separator}>-</div>}
    {endDate && <div className={styles.duration}>{format(new Date(endDate), 'MM.dd.yyy')}</div>}
  </div>
}
const StatItem = ({name, value}: {name: string, value: number}) => {
  return <div className={styles.statItem}>
    <img src={'/img/Project/user.svg'}/>
    <div className={styles.statLabel}>{name}</div>
    <div className={styles.statValue}>{value}</div>
  </div>
}
const ProjectCard = (props: Props) => {
  const {project, actionsType} = props;
  const {t} = useTranslation();
  const dispatch = useDispatch()
  const appContext = useAppContext();
  const profile = appContext.profile
  const formatAge = () => {
    if(project.minAge && project.maxAge){
      return `${project.minAge} - ${project.maxAge}`
    }else if(project.maxAge){
      return `< ${project.minAge}`
    }else if(project.minAge){
      return `> ${project.minAge}`
    }
    return null
  }
  const handlePublish = () => {
    dispatch(confirmOpen({
      description: `${t('task.confirmPublish')} «${project.title}»?`,
      onConfirm: async () => {
        await ProjectRepository.update(project.id, {status: ProjectStatus.Published});
        props.onUpdateStatus(ProjectStatus.Published, project);
      }
    }))
  }
  const handleUnPublish = () => {
    dispatch(confirmOpen({
      description: `${t('task.confirmUnPublish')} «${project.title}»?`,
      onConfirm: async () => {
        await ProjectRepository.update(project.id, {status: ProjectStatus.Draft});
        props.onUpdateStatus(ProjectStatus.Draft, project);
      }
    }))
  }
  const handleDelete = () => {
    dispatch(confirmOpen({
      description: `${t('task.confirmDelete')} «${project.title}»?`,
      onConfirm: async () => {
        await ProjectRepository.delete(project.id);
        props.onDelete(project);
      }
    }))
  }
  const handleApply = () => {
    props.onApplyClick(project)
  }

  const savedData = (projectId: number) => {
    return {projectId: projectId}
  }

  const renderActionButton = (action) => {
    switch (action) {
      case 'view':
        return <Button color={'grey'}  onClick={() => props.onViewOpen ? props.onViewOpen(project) : null}>View</Button>
      case 'delete':
        return <Button color={'grey'}>Delete</Button>
      case 'publish':
        return <Button color={'grey'} onClick={handlePublish}>Publish</Button>
      case 'unPublish':
        return <Button color={'grey'} onClick={handleUnPublish}>UnPublish</Button>
      case 'apply':
        return <Button color={'grey'} onClick={handleApply}>Apply</Button>
      case 'save':
        return <Button onClick={() => ProfileRepository.addToSavedProjects(savedData(project.id))} color={'grey'}>Save</Button>
      case 'open':
        return <Button type='button' projectBtn='default'>OPEN</Button>
      case 'applyAlt':
        return <Button onClick={handleApply} type='button' projectBtn='default'>APPLY</Button>
      case 'recall':
        return <Button type='button' projectBtn='red'>RECALL</Button>
      case 'accept':
        return <Button onClick={() => props.onStatusChange(ApplicationStatus.Execution)} type='button' projectBtn='green'>ACCEPT</Button>
      case 'reject':
        return <Button onClick={() => props.onStatusChange(ApplicationStatus.RejectedByVolunteer)} type='button' projectBtn='red'>REJECT</Button>
      case 'complete':
        return <Button onClick={() => props.onStatusChange(ApplicationStatus.Completed)} type='button' projectBtn='green'>COMPLETE</Button>
      case 'recycleBin':
        return <Button projectBtn='recycleBin'><img src='/img/icons/recycle-bin.svg' alt=''/></Button>
        /*
      case 'cancel':
        return <TaskActionButton title={t('task.cancel')} icon={'delete'} onClick={handleCancel}/>
      case 'markAsCompleted':
        return <TaskActionButton title={t('task.markAsCompleted')} icon={'mark'} onClick={handleTaskComplete}/>
      case 'share':
        return <TaskActionButton title={t('task.share')} icon={'share'} onClick={handleShare}/>
      case 'save':
        return <TaskActionButton title={t(task.isSavedByCurrentProfile ? 'task.saved' : 'task.save')} icon={<BookmarkSvg isSaved={task.isSavedByCurrentProfile}/>} onClick={handleFavorite}/>
      case 'feedbackToClient':
        return <TaskActionButton title={t('task.postFeedback')} icon={'mark'}  onClick={handleFeedbackByMaster}/>

         */
    }
  }

  const actions = useMemo(
    () => {
      const actions = []
      {actionsType !== 'volunteer' && actions.push('view')}
      if (actionsType === 'client') {
        if (([ProjectStatus.Draft, ProjectStatus.Published] as ProjectStatus[]).includes(project.status) && profile.id === project.corporateProfileId) {
        }
        if (([ProjectStatus.Draft] as ProjectStatus[]).includes(project.status)) {
          actions.push('delete')
          actions.push('publish')
        }

        if (([ProjectStatus.Published] as ProjectStatus[]).includes(project.status) && profile.id === project.corporateProfileId) {
          actions.push('unPublish')
          actions.push('cancel')
        }
        if (([ProjectStatus.Execution] as ProjectStatus[]).includes(project.status)) {
          actions.push('cancel')
          actions.push('markAsCompleted')
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
          actions.push('recall')
        }
        if(props.status === 'completed' || props.status === 'rejectedByVolunteer' || props.status === 'saved'){
          actions.push('recycleBin')
        }
      }
      return actions;
    },
    [actionsType, project.status, profile.id]
  )
console.log("actionsType", actionsType);
  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.image}>
          <Avatar image={project.photo}/>
        </div>
        <div className={styles.stats}>
          <StatItem name={'Vacancies'} value={0}/>
          <StatItem name={'Applications'} value={0}/>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.header}>
          <div className={styles.title}>{project.title}</div>
          {project.applicationsClothingDate && <DurationDates name={'Application until:'} endDate={project.applicationsClothingDate}/>}
          <DurationDates name={'Project:'} startDate={project.startDate} endDate={project.endDate}/>
        </div>
        <div className={styles.center}>
          <div className={classNames(styles.section, styles.sectionLocations)}>
            <div className={styles.sectionHeader}>Locations</div>
            <div className={styles.locations}>
            {project.locations?.map(i => <WorkInListItem model={{type: i.type, location: i.location}}/>)}
            </div>
          </div>
          <div className={classNames(styles.section, styles.sectionCategories)}>
            <div className={styles.sectionHeader}>Relevant for categories:</div>
            <div className={styles.skills}>
              {project.skills &&
              <ProjectCategories skills={project.skills}/>}
            </div>

          </div>
          <div className={classNames(styles.section, styles.sectionAdditional)}>
            {formatAge() &&
            <div className={styles.additionalItem}>
              <div className={styles.sectionHeader}>Age</div>
              <div className={styles.additionValue}>{formatAge()}</div>
            </div>}

            {project.education &&
            <div className={styles.additionalItem}>
              <div className={styles.sectionHeader}>Education</div>
              <div className={styles.additionValue}>{project.education}</div>
            </div>}
          </div>
        </div>
        <div className={styles.footer}>
          {actions.map((action, index) =>  renderActionButton(action))}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
