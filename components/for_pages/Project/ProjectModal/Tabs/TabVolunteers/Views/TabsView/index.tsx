import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import classNames from 'classnames'
import {format} from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { IApplicationCounts } from 'data/intefaces/IApplicationCounts'
import { ApplicationStatus, IApplication } from 'data/intefaces/IApplication'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import { IProfile } from 'data/intefaces/IProfile'
import Avatar from 'components/ui/Avatar'
import Button from 'components/ui/Button'
import Marker from 'components/svg/Marker'
import LanguageListItem from 'components/PublicProfile/components/view/CardLanguages/components/LanguageListItem'
import Tabs from '../../Tabs'
import ApplicationPage from 'components/for_pages/Project/ApplicationPage'
import TabApplicationCard from '../../../TabApplication/TabApplicationCard'


interface Props {
  project: IProject
  application?: IApplication
}

interface ProfileProps {
  profile?: IProfile
  application?: IApplication
  onViewClick?: () => void
  project?: IProject
}

const TabsView = ({project, application, ...props}: Props) => {
  
  const [counts, setCounts] = useState<IApplicationCounts>({})
  const tabs = useMemo(
    () => ( [
      {name: 'Applications', key: ApplicationStatus.Applied},
      {name: 'Shortlist', key: ApplicationStatus.Shortlist},
      {name: 'Invited', key: ApplicationStatus.Invited},
      {name: 'Execution', key: ApplicationStatus.Execution},
      {name: 'Completed', key: ApplicationStatus.Completed},
      {name: 'Rejected', key: ApplicationStatus.RejectedByCompany},
    ]).map(item => {
      return{
        ...item,
        link: `/projects/${item.key}`
      }}),
    [counts]
  )

  const [currentTab, setCurrentTab] = useState(tabs[0].key)

  const [currentProject, setCurrentProject] = useState<IProject>(project)

  const [applications, setApplications] = useState<IApplication[]>([])

  const [currentApplication, setCurrentApplication] = useState<IApplication>(application)

  const [view, setView] = useState('tabs')

  useEffect(() => {
    ApplicationRepository.fetchCountsByProjectId(project.id).then(data => setCounts(data ?? {}))
    ApplicationRepository.fetchApplicationsByCorporateForProject(project.id).then(data => setApplications(data.data))
  }, [currentTab, project])

  const handleChange = (item) => {
    setCurrentTab(item.key)
  }

  const handleView = (project: IProject, application: IApplication) => {
    setView('profile')
    setCurrentProject(project)
    setCurrentApplication(application)
  }

  const appStatus = (status: string) => {
    return {status: status}
  }

  async function handleChangeStatus(newStatus: ApplicationStatus, application: IApplication) {
    await ApplicationRepository.changeApplicationStatus(application.id, appStatus(newStatus), 'corporate')
    if(newStatus !== currentTab){
      setApplications(applications => applications.filter(item => item.id !== application.id))
      ApplicationRepository.fetchCountsByProjectId(project.id).then(data => setCounts(data ?? {}))
    }
  }

  return (
  <>
  {view === 'tabs' ?
   <div className={styles.root}>
       <Tabs style={'fullWidthRound'} tabs={tabs.map((tab => {
        const statResult = counts[tab.key];
        console.log("TabRender", tab);
        return {...tab, name: `${tab.name} (${statResult ? statResult : 0})`}
      }))} onChange={(item) => handleChange(item)}
      activeTab={currentTab}
      />
      <div className={styles.list}>
        {applications && applications.filter(item => item.status === currentTab).filter(item => item.profile.role === 'volunteer').map((item, index) =>
          <TabApplicationCard profile={item.profile} application={item} key={index} currentTab={currentTab} 
          onStatusChange={(newStatus) => handleChangeStatus(newStatus, item)}/>
        )}
      </div>
   </div>
   :
   <div>
     <ApplicationPage project={currentProject} application={currentApplication}/>
   </div>
  }
  </>
  )
}

export default TabsView
