import * as React from 'react'
import {useEffect, useState} from 'react'
import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import ProjectDescriptionHeader from 'components/for_pages/Project/ProjectModal/ProjectDescriptionHeader'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import TabApplicationView from 'components/for_pages/Project/ProjectModal/Tabs/TabApplication/TabApplicationView'
import TabApplicationForm from 'components/for_pages/Project/ProjectModal/Tabs/TabApplication/TabApplicationForm'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import Loader from 'components/ui/Loader'

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
      <ProjectDescriptionHeader project={project} title={'Application'}/>
     {isLoading && <Loader/>}
      {!isLoading && (application && application.status !== ApplicationStatus.Draft && !isEdit) ?
      <TabApplicationView onEdit={handleEdit} application={application} project={project}/>
      :
        !isLoading ? <TabApplicationForm edit={isEdit} projectId={project.id} application={application} onSave={handleSave}/> : null}
   </div>
  )
}

export default TabApplication
