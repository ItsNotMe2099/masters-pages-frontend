import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import classNames from 'classnames'
import ProjectStatusLabel from '../../ProjectStatusLabel'
import {format} from 'date-fns'
import TabsView from './Views/TabsView'


interface Props {
  project: IProject
}

const TabVolunteers = ({project, ...props}: Props) => {

  return (
   <div className={styles.root}>
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
       <TabsView project={project}/>
   </div>
  )
}

export default TabVolunteers
