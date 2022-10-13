import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import {useEffect, useMemo, useState} from 'react'
import {useAppContext} from 'context/state'
import ProjectTabHeader from "components/for_pages/Project/ProjectModal/ProjectTabHeader";
import * as React from "react";
import Tabs from "components/for_pages/Project/ProjectModal/Tabs/TabVolunteers/Tabs";
import {TabSelect} from "components/TabSelect";
import TabApplicationCard from "components/for_pages/Project/ProjectModal/Tabs/TabApplication/TabApplicationCard";
import {ApplicationStatus, IApplication} from "data/intefaces/IApplication";
import ApplicationRepository from "data/repositories/ApplicationRepository";
import {IApplicationCounts} from "data/intefaces/IApplicationCounts";
import TabVolunteerApplication
  from "components/for_pages/Project/ProjectModal/Tabs/TabVolunteers/TabVolunteerApplication";

enum ViewType {
  List,
  Application,
}

interface Props {
  project: IProject
}

const TabVolunteers = ({project, ...props}: Props) => {
  const [counts, setCounts] = useState<IApplicationCounts>({})
  const [view, setView] = useState<ViewType>(ViewType.List)
  const appContext = useAppContext()
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
  const [currentApplication, setCurrentApplication] = useState<IApplication>(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const fetchCounts = async () => {
   const counts = await ApplicationRepository.fetchCountsByProjectId(project.id);
    setCounts(counts ?? {})

  }
  useEffect(() => {
    const subscriptionUpdate = appContext.applicationUpdateState$.subscribe((application) => {

      setApplications(applications => applications.map(item => item.id === application.id ? ({...item, ...application}) : item))
     if(currentApplication?.id === application.id){
       setCurrentApplication(null)
       setView(ViewType.List)
     }
      fetchCounts()
    });
    const subscriptionDelete = appContext.applicationDeleteState$.subscribe((application) => {
      setApplications(applications => applications.filter(item => item.id !== application.id))
      fetchCounts()
    });
    return () => {
      subscriptionUpdate.unsubscribe()
      subscriptionDelete.unsubscribe()
    }
  }, [applications, currentApplication])

  useEffect(() => {
    fetchCounts()
    ApplicationRepository.fetchApplicationsByCorporateForProject(project.id).then(data => setApplications(data.data))
  }, [project])

  const handleChange = (item) => {
    setCurrentTab(item.key)
  }

  const handleView = (project: IProject, application: IApplication, index: number) => {
    setCurrentProject(project)
    setCurrentApplication(application)
    setCurrentIndex(index)
    setView(ViewType.Application)
  }

  const handleNext = () => {
    if(currentIndex + 1 < list.length){
      setCurrentIndex(currentIndex + 1)
      setCurrentApplication(applications[currentIndex + 1])
    }
  }

  const handlePrev = () => {
    if(currentIndex > 0){
      setCurrentIndex(currentIndex - 1)
      setCurrentApplication(applications[currentIndex - 1])
    }
  }


  const header = (view === ViewType.Application ?
    <div className={styles.header}>
      <div className={styles.back} onClick={() => setView(ViewType.List)}>
        <img src='/img/icons/back.svg' alt=''/>
        <div>Back</div>
      </div>
    </div> : <ProjectTabHeader project={project}/>)
  const tabsTexts = tabs.map((tab => ({...tab, name: `${tab.name} (${counts[tab.key] ? counts[tab.key] : 0})`})))
  const list = applications.filter(item => item.status === currentTab)
  return (
    <div className={styles.root}>
      {header}
      {view === ViewType.List && <div className={styles.root}>
        <div className={styles.desktop}>
          <Tabs style={'fullWidthRound'} tabs={tabsTexts} onChange={(item) => handleChange(item)}
                activeTab={currentTab}
          />
        </div>
        <div className={styles.mobile}>
          <TabSelect className={styles.select} style='projectModal'
                                                  tabs={tabsTexts} activeTab={currentTab}
                                                  onChange={(item) => setCurrentTab(item.key)}/>
        </div>
        <div className={styles.list}>
          {list.map((item, index) =>
            <TabApplicationCard profile={item.profile} application={item} key={index}
                                total={list.length}
                                index={index}
                                currentTab={currentTab}
                                onViewClick={() => handleView(project, item, index)}/>
          )}
        </div>
      </div>}
      {view === ViewType.Application && currentApplication && <TabVolunteerApplication
        total={list.length}
        index={currentIndex}
        project={project}
        onPrev={handlePrev}
        onNext={handleNext}
        application={currentApplication} currentTab={currentTab} />}

    </div>
  )
}

export default TabVolunteers
