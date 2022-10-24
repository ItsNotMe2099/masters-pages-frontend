import * as React from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import {IProject} from 'data/intefaces/IProject'
import {useTranslation} from 'next-i18next'
import {format} from 'date-fns'
import ProjectStatusLabel from '../ProjectStatusLabel'

interface Props {
  project: IProject | null
}

const ProjectTabHeader = ({project}: Props) => {
  const {t} = useTranslation();
  
  return (
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
             <div className={styles.dateItem}>
              <div className={styles.dateItemLabel}>Applications Deadline: </div> 
              <div className={styles.date}>
                <img src={'/img/Project/calendar.svg'}/>{format(new Date(project.applicationsClothingDate), 'MM.dd.yy')}</div>
              </div>
             <div className={styles.separator}/>
             <div className={styles.dateItem}><div className={styles.dateItemLabel}>Project Deadline: </div> 
             <div className={styles.date}>
              <img src={'/img/Project/calendar.svg'}/><span>{format(new Date(project.endDate), 'MM.dd.yy')}</span>
            </div>
             </div>

           </div>

       </div>
  )
}

export default ProjectTabHeader
