import * as React from 'react'
import {useEffect, useState} from 'react'
import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import ProjectDescriptionHeader from 'components/for_pages/Project/ProjectModal/ProjectDescriptionHeader'
import {useTranslation} from 'next-i18next'
import {Form, FormikProvider} from 'formik'
import {useAppContext} from 'context/state'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import TabApplicationView from 'components/for_pages/Project/ProjectModal/Tabs/TabApplication/TabApplicationView'
import TabApplicationForm from 'components/for_pages/Project/ProjectModal/Tabs/TabApplication/TabApplicationForm'
import ApplicationRepository from 'data/repositories/ApplicationRepository'

interface Props {
  project: IProject
  onSave: (data) => any;
}

const TabApplication = ({project, ...props}: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [application, setApplication] = useState<IApplication | null>(null);
  useEffect(() => {
    ApplicationRepository.fetchOneByProject(project.id).then((data) => {
      setApplication(data);
      setIsLoading(false);
    })
  }, [])
  const handleSave = async () => {
    ApplicationRepository.fetchOneByProject(project.id).then((data) => {
      setApplication(data);
    })
  }

  return (
   <div className={styles.root}>
        <ProjectDescriptionHeader project={project} title={'Application'}/>
        {application && application.status !== ApplicationStatus.Draft ? <TabApplicationView application={application} project={project}/> : <TabApplicationForm projectId={project.id} application={application} onSave={handleSave}/>}
   </div>
  )
}

export default TabApplication
