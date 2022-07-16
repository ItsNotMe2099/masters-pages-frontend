import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import { useEffect, useMemo, useState } from 'react'
import { IApplicationCounts } from 'data/intefaces/IApplicationCounts'
import { ApplicationStatus, IApplication } from 'data/intefaces/IApplication'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import Tabs from '../../Tabs'
import ApplicationPage from 'components/for_pages/Project/ApplicationPage'
import TabApplicationCard from '../../../TabApplication/TabApplicationCard'
import { TabSelect } from 'components/TabSelect'

interface Props {
  project: IProject
  application?: IApplication
  view?: string
  onChangeView?: () => void
}

const TabsView = ({project, application, view, onChangeView, ...props}: Props) => {
  
  const [counts, setCounts] = useState<IApplicationCounts>({})
  const tabs = useMemo(
    () => ( [
      {name: 'Applications', key: ApplicationStatus.Applied},
      {name: 'Shortlist', key: ApplicationStatus.Shortlist},
      {name: 'Invited', key: ApplicationStatus.Invited},
      {name: 'Execution', key: ApplicationStatus.Execution},
      {name: 'C-request', key: ApplicationStatus.CompleteRequest},
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

  const [currentIndex, setCurrentIndex] = useState(0)



  useEffect(() => {
    ApplicationRepository.fetchCountsByProjectId(project.id).then(data => setCounts(data ?? {}))
    ApplicationRepository.fetchApplicationsByCorporateForProject(project.id).then(data => setApplications(data.data))
  }, [currentTab, project])

  const handleChange = (item) => {
    setCurrentTab(item.key)
  }

  const handleView = (project: IProject, application: IApplication, index: number) => {
    onChangeView()
    setCurrentProject(project)
    setCurrentApplication(application)
    setCurrentIndex(index)
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

  async function handleDelete(application: IApplication) {
    await ApplicationRepository.delete(application.id)
    setApplications(applications => applications.filter(item => item.id !== application.id))
    ApplicationRepository.fetchCountsByProjectId(project.id).then(data => setCounts(data ?? {}))
  }

  const handleNext = (index: number, apps: IApplication[]) => {
    if(index + 1 < apps.length){
      setCurrentIndex(currentIndex + 1)
      setCurrentApplication(apps[currentIndex + 1])
    }
  }

  const handlePrev = (index: number, apps: IApplication[]) => {
    if(index > 0){
      setCurrentIndex(currentIndex - 1)
      setCurrentApplication(apps[currentIndex - 1])
    }
  }

  return (
  <>
  {view === 'tabs' ?
   <div className={styles.root}>
      <div className={styles.desktop}>
       <Tabs style={'fullWidthRound'} tabs={tabs.map((tab => {
        const statResult = counts[tab.key];
        return {...tab, name: `${tab.name} (${statResult ? statResult : 0})`}
      }))} onChange={(item) => handleChange(item)}
      activeTab={currentTab}
      />
      </div>
      <div className={styles.mobile}><TabSelect className={styles.select} style='projectModal' tabs={tabs.map((tab => {
        const statResult = counts[tab.key];
        return {...tab, name: `${tab.name} (${statResult ? statResult : 0})`}
      }))} activeTab={currentTab} onChange={(item) => setCurrentTab(item.key)}/></div>
      <div className={styles.list}>
        {applications && applications.filter(item => item.status === currentTab).filter(item => item.profile.role === 'volunteer').map((item, index) =>
          <TabApplicationCard profile={item.profile} application={item} key={index} currentTab={currentTab} onDelete={(item) => handleDelete(item)}
          onStatusChange={(newStatus) => handleChangeStatus(newStatus, item)} onViewClick={() => handleView(project, item, index)}/>
        )}
      </div>
   </div>
   :
   <div>
    {applications && applications.filter(item => item.status === currentTab).filter(item => item.profile.role === 'volunteer').map((item, index) =>
    index === currentIndex &&
    <>
    {currentTab === ApplicationStatus.Applied &&
    <div className={styles.controls}>
      <div className={styles.prev} onClick={() => handlePrev(currentIndex, applications)}>
        <img src='/img/icons/back.svg' alt=''/>
        <div className={styles.text}>PREVIOUS VOLUNTEER</div>
      </div>
      <div className={styles.next} onClick={() => handleNext(currentIndex, applications)}>
        <div className={styles.text}>NEXT VOLUNTEER</div>
        <img src='/img/icons/back.svg' alt=''/>
      </div>
    </div>}
     <ApplicationPage onStatusChange={(newStatus) => handleChangeStatus(newStatus, item)} project={currentProject} application={currentApplication} index={currentIndex} modal currentTab={currentTab}/>
     </>
    )}
   </div>
  }
  </>
  )
}

export default TabsView
