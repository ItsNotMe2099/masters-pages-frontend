import * as React from 'react'
import {useEffect, useState} from 'react'
import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import TabApplicationView from 'components/for_pages/Project/ProjectModal/Tabs/TabApplication/TabApplicationView'
import TabApplicationForm from 'components/for_pages/Project/ProjectModal/Tabs/TabApplication/TabApplicationForm'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import Loader from 'components/ui/Loader'
import classNames from 'classnames'
import ProjectStatusLabel from '../../ProjectStatusLabel'
import {format} from 'date-fns'

interface Props {
  project: IProject
  onSave: (data) => any;
}

const TabApplication = ({project, ...props}: Props) => {
  const {t} = useTranslation()
  const appContext = useAppContext()
  const [isLoading, setIsLoading] = useState(true)
  const [application, setApplication] = useState<IApplication | null>(null)
  const [isEdit, setIsEdit] = useState(false)
  useEffect(() => {
    ApplicationRepository.fetchOneByProject(project.id).then((data) => {
      setApplication(data);
      setIsLoading(false);
    })
  }, [])

  const handleSave = async () => {
    ApplicationRepository.fetchOneByProject(project.id).then((data) => {
      setApplication(data)
    })
    setIsEdit(false)
  }

  const handleEdit =() => {
    setIsEdit(true)
  }

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
     {isLoading && <Loader/>}
      {!isLoading && (application && application.status !== ApplicationStatus.Draft && !isEdit) ?
      <TabApplicationView onEdit={handleEdit} application={application} project={project}/>
      :
        !isLoading ? <TabApplicationForm edit={isEdit} projectId={project.id} application={application} onSave={handleSave}/> : null}
   </div>
  )
}

export default TabApplication
