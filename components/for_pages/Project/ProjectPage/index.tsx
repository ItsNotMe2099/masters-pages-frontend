import * as React from 'react'
import {ReactElement, useEffect, useState} from 'react'
import styles from './index.module.scss'
import {IProject, ProjectExecutionType} from 'data/intefaces/IProject'
import StarRatings from 'react-star-ratings'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import classNames from 'classnames'
import LanguageListItem from 'components/PublicProfile/components/view/CardLanguages/components/LanguageListItem'
import {format} from 'date-fns'
import CardProfile from 'components/for_pages/Project/ProjectPage/CardProfile'
import cx from 'classnames'
import ProjectStatusLabel from 'components/for_pages/Project/ProjectModal/ProjectStatusLabel'
import {getMediaPath} from 'utils/media'

import WorkInListItem from 'components/PublicProfile/components/view/CardPreferWorkIn/components/WorkInListItem'
import ProjectCategories from 'components/for_pages/Project/ProjectCategories'
interface Props {
  project: IProject
  controls: ReactElement[] | ReactElement
  onSave: (data) => any;
}
const RequirementStatus = (props: {name: string, success: boolean}) => {
  return <div className={classNames(styles.requirementStatus, {[styles.success]: props.success, [styles.failed]: !props.success})}>
    {props.name} <img src={`/img/Project/requirements_${props.success ? 'success' : 'failed'}.svg`}/>
  </div>
}
const ProjectPage = ({  project, ...props}: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const profile = appContext.profile

  const formatProjectAge = () => {
    if(project.minAge && project.maxAge){
      return `${project.minAge} - ${project.maxAge}`
    }else if(project.maxAge){
      return `< ${project.minAge}`
    }else if(project.minAge){
      return `> ${project.minAge}`
    }
    return null
  }

  const profileLink = `/id${project.corporateProfileId}`
  return (
   <div className={styles.root}>
    <div className={styles.left}>
      <CardProfile profileId={profile.id}/>
    </div>
     <div className={styles.center}>
       <div className={classNames(styles.section, styles.info)}>
           <div className={styles.top}>
             <div className={styles.left}>
               <ProjectStatusLabel status={project.status}/>
               <div className={styles.title}>{project?.title || '[Project title]'}</div>
               <div className={styles.projectId}>Project id#: {project?.id}</div>
             </div>
             {project && <div className={styles.right}>
               <div className={styles.line}>Application Limit: 0/{project.applicationsLimits}</div>
               <div className={styles.line}>Vacancies: 0/{project.vacanciesLimits}</div>
             </div>}
           </div>

           <div className={styles.dates}>
             <div className={styles.dateItem}><div className={styles.dateItemLabel}>Applications Deadline: </div> <img src={'/img/Project/calendar.svg'}/>{format(new Date(project.applicationsClothingDate), 'MM.dd.yyy')}</div>
             <div className={styles.separator}/>
             <div className={styles.dateItem}><div className={styles.dateItemLabel}>Project Deadline: </div> <img src={'/img/Project/calendar.svg'}/>{format(new Date(project.endDate), 'MM.dd.yyy')}</div>

           </div>

       </div>
       {project.inquiries && <div className={styles.section}>
         <div className={styles.sectionHeader}>Inquiries</div>
         <div className={styles.sectionContent}>{project.inquiries}</div>
       </div>}
       {project.description && <div className={styles.section}>
         <div className={styles.sectionHeader}>Project Description</div>
         <div className={styles.sectionContent}>{project.description}</div>
       </div>}
       {project.requirements && <div className={styles.section}>
         <div className={styles.sectionHeader}>Application Requirements</div>
         <div className={styles.sectionContent}>{project.requirements}</div>
       </div>}
       {project.benefits && <div className={styles.section}>
         <div className={styles.sectionHeader}>Benefits for participants</div>
         <div className={styles.sectionContent}>{project.benefits}</div>
       </div>}

       {profile && <div className={styles.controls}>
         {props.controls}
       </div>}
     </div>
     <div className={styles.right}>
        <div className={styles.header}>Project Info</div>
     {project.photo && <div className={styles.photo}><img src={getMediaPath(project.photo)}/></div>}
     <div className={styles.section}>
       <div className={styles.sectionHeader}>Execution type</div>
       <div className={classNames(styles.sectionContent, styles.executionType)}>
         {[ProjectExecutionType.Online, ProjectExecutionType.Combo].includes(project.executionType) && <div className={classNames(styles.executionTypeItem, styles.online)}><img src={'/img/Project/location_green.svg'}/> Online</div>}
         {[ProjectExecutionType.Offline, ProjectExecutionType.Combo].includes(project.executionType) && <div className={styles.executionTypeItem}><img src={'/img/Project/location.svg'}/> In Person</div>}
       </div>
     </div>

       {project.locations.length > 0 && <div className={styles.section}>
         <div className={styles.sectionHeader}>Project Locations:</div>
         <div className={classNames(styles.sectionContent, styles.projectLocations)}>
           {project.locations.map(i => <WorkInListItem model={{type: i.type, location: i.location}}/>)}
         </div>
       </div>}
       {project.skills.length > 0 && <div className={styles.section}>
         <div className={styles.sectionHeader}>Relevant to categories:</div>
         <div className={classNames(styles.sectionContent, styles.projectLocations)}>
           <ProjectCategories skills={project.skills}/>
         </div>
       </div>}

       {project.languages.length > 0 && <div className={styles.section}>
         <div className={styles.sectionHeader}>Languages:</div>
         <div className={classNames(styles.sectionContent, styles.languages)}>
           {project.languages.map(i => <LanguageListItem model={i}/>)}
         </div>
       </div>}
       {(project.minAge || project.maxAge) && <div className={styles.section}>
         <div className={styles.sectionHeader}>Age:</div>
         <div className={classNames(styles.sectionContent, styles.ageLimits)}>
           <div className={styles.ageItem}><div className={styles.label}>Min age</div><div className={styles.value}>{project.minAge}</div></div>
           <div className={styles.ageItem}><div className={styles.label}>Max age</div><div className={styles.value}>{project.maxAge}</div></div>
         </div>
       </div>}
       {project.webLink && <div className={styles.section}>
         <div className={styles.sectionHeader}>External Web Link:</div>
         <div className={classNames(styles.sectionContent, styles.webLink)}>
           <img src={'/img/Project/web.svg'}/> <a href={project.webLink} target={'_blank'}>{project.webLink}</a>
         </div>
       </div>}
     </div>


   </div>
  )
}

export default ProjectPage
