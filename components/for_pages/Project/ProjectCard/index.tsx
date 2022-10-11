import * as React from 'react'
import styles from './index.module.scss'
import {IProject, ProjectStatus} from 'data/intefaces/IProject'
import classNames from 'classnames'
import Avatar from 'components/ui/Avatar'
import {format} from 'date-fns'
import {confirmModalClose, confirmOpen, modalClose, signUpOpen} from 'components/Modal/actions'
import { useDispatch} from 'react-redux'
import {useTranslation} from 'next-i18next'
import ProjectRepository from 'data/repositories/ProjectRepository'
import {ReactElement, useMemo} from 'react'
import {useAppContext} from 'context/state'
import WorkInListItem from 'components/PublicProfile/components/view/CardPreferWorkIn/components/WorkInListItem'
import ProjectCategories from 'components/for_pages/Project/ProjectCategories'
import Button from 'components/PublicProfile/components/Button'
import { ApplicationStatus, IApplication } from 'data/intefaces/IApplication'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import {useState} from 'react'
import { ProfileRole } from 'data/intefaces/IProfile'

interface Props {
  project: IProject
  actions: ReactElement
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
  const {project} = props;
  const {t} = useTranslation();
  const dispatch = useDispatch()
  const appContext = useAppContext();
  const profile = appContext.profile
  const [applications, setApplications] = useState<IApplication[]>([])
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

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.image}>
          <Avatar image={project.photo}/>
        </div>
        <div className={styles.stats}>
          <StatItem name={'Vacancies'} value={project.vacanciesLimits ? project.vacanciesLimits : 0}/>
          <StatItem name={'Applications'} value={project.applicationsLimits ? project.applicationsLimits : 0}/>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.header}>
          <div className={styles.title}>{project.title}</div>
          {project.applicationsClothingDate && <div className={styles.dateWrapper}>
            <DurationDates name={'Application until:'} endDate={project.applicationsClothingDate}/></div>}
          <DurationDates name={'Project:'} startDate={project.startDate} endDate={project.endDate}/>
        </div>
        <div className={styles.center}>
          <div className={classNames(styles.section, styles.sectionLocations)}>
            <div className={styles.sectionHeader}>Locations</div>
            <div className={styles.locations}>
            {project.locations?.map(i => <WorkInListItem model={{type: i.type, location: i.location, isOnline: i.isOnline}} address={i.address}/>)}
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
        {props.actions}
      </div>
    </div>
  )
}

export default ProjectCard
