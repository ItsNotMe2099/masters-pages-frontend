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
import {useProjectContext} from "context/project_state";
import {ApplicationWrapper, useApplicationContext} from "context/application_state";
import ProjectTabHeader from "components/for_pages/Project/ProjectModal/ProjectTabHeader";

interface Props {
}

const TabApplicationInner = (props: Props) => {
  const {t} = useTranslation()
  const appContext = useAppContext()
  const projectContext = useProjectContext()
  const project = projectContext.project
  const applicationContext = useApplicationContext()
  const application = applicationContext.application
  const isLoading = applicationContext.loading || projectContext.loading
  const [isEdit, setIsEdit] = useState(false)
    console.log("isLoading11", applicationContext.loading  , projectContext.loading)

  const handleSave = async () => {
    setIsEdit(false)
  }

  const handleEdit =() => {
    setIsEdit(true)
  }

  return (
   <div className={styles.root}>
     {project && <ProjectTabHeader project={project}/>}
     {isLoading && <Loader/>}
      {!isLoading && (application && application.status !== ApplicationStatus.Draft && !isEdit) ?
      <TabApplicationView onEdit={handleEdit} application={application} project={projectContext.project}/>
      :
        !isLoading ? <TabApplicationForm edit={isEdit} projectId={projectContext.project.id} application={application} onSave={handleSave}/> : null}
   </div>
  )
}

export default function TabApplication(props: Props){
  const projectContext = useProjectContext()
  return <ApplicationWrapper projectId={projectContext.projectId}>
    <TabApplicationInner/>
  </ApplicationWrapper>
}
