import * as React from 'react'
import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import ApplicationPage from 'components/for_pages/Project/ApplicationPage'
import ApplicationRepository from 'data/repositories/ApplicationRepository'

interface Props {
  application: IApplication | null
  project: IProject
  onEdit?: () => void
}

const TabApplicationView = ({application, project, ...props}: Props) => {



  return (
    <div className={styles.root}>
      <ApplicationPage onEdit={props.onEdit}  application={application} project={project} modal currentTab={application.status}/>
    </div>
  )
}

export default TabApplicationView
