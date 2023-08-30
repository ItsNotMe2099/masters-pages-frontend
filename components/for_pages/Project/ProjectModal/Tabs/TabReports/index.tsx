import * as React from 'react'
import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import {useState, useEffect} from 'react'
import Tabs from '../TabVolunteers/Tabs'
import ProjectTabHeader from '../../ProjectTabHeader'
import { format } from 'date-fns'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import { ApplicationStatus, IApplication } from 'data/intefaces/IApplication'
import classNames from 'classnames'
import SliderVolunteers from './Slider'
import { TabSelect } from 'components/TabSelect'
import { useWindowWidth } from '@react-hook/window-size'
import TabReportEvents from "components/for_pages/Project/ProjectModal/Tabs/TabReports/TabReportEvents";

interface Props {
  project: IProject | null
}

export enum ProjectReportsTabType {
  Project = 'project',
  Events = 'events',
  Volunteers = 'volunteers',
  Categories = 'categories',
}

export enum ProjectReportsTabTypeProject {
  Summary = 'summary',
  Events = 'events',
  Volunteers = 'volunteers',
  Categories = 'categories',
}

const TabReports = ({project}: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const tabs = ([
    {name: 'Project', key: ProjectReportsTabType.Project},
    {name: 'Events', key: ProjectReportsTabType.Events},
    {name: 'Volunteers', key: ProjectReportsTabType.Volunteers},
    {name: 'Categories', key: ProjectReportsTabType.Categories},
  ]).map(item => {
    return{
      ...item,
      link: `/projects/${item.key}`
    }});
    const [currentTab, setCurrentTab] = useState(tabs[0].key)
    const miniTabs = (currentTab === ProjectReportsTabType.Project ? [
      {name: 'Summary', key: ProjectReportsTabTypeProject.Summary},
      {name: 'by Events', key: ProjectReportsTabTypeProject.Events},
      {name: 'by Volunteers', key: ProjectReportsTabTypeProject.Volunteers},
      {name: 'by Categories', key: ProjectReportsTabTypeProject.Categories},
    ] :
    currentTab === ProjectReportsTabType.Events ? [] : currentTab === ProjectReportsTabType.Volunteers ? [] : []
    ).map(item => {
      return{
        ...item,
        link: `/projects/${item.key}`
      }});

  const [tab, setTab] = useState(miniTabs[0]);

  const [currentMiniTab, setCurrentMiniTab] = useState(miniTabs.length ? miniTabs[0].key : null)

  const [applications, setApplications] = useState<IApplication[]>([])
  const [total, setTotal] = useState(0)
  const width = useWindowWidth()
  const isMobile = width < 429

  const handleChange = (item, miniTabs?: boolean) => {
    miniTabs ? setCurrentMiniTab(item.key) : setCurrentTab(item.key)
  }

  useEffect(() => {
    ApplicationRepository.fetchApplicationsByCorporateForProject(project.id).then(data => {
      if(data){
        setApplications(data.data)
        setTotal(data.total)
      }
    })
  }, [])

  const firstTable = [
    {name: 'Project created', value: format(new Date(project.createdAt), 'MMM dd, yyyy')},
    {name: 'Project published', value: format(new Date(project.updatedAt), 'MMM dd, yyyy')},
    {name: 'Aplications start date', value: format(new Date(project.startDate), 'MMM dd, yyyy')},
    {name: 'Aplications end date', value: format(new Date(project.applicationsClothingDate), 'MMM dd, yyyy')},
    {name: 'Project started', value: format(new Date(project.startDate), 'MMM dd, yyyy')},
    {name: 'Project completed', value: format(new Date(project.endDate), 'MMM dd, yyyy')},
  ]

  const secondTable = [
      {name: 'Applications limit / Received', value: `0/${project.applicationsLimits}`},
      {name: 'Vacancies limit/filled', value: `0/${project.vacanciesLimits}`},
      {name: 'ShortList', value: applications.filter(i => i.status === ApplicationStatus.Shortlist).length},
      {name: 'Invited', value: applications.filter(i => i.status === ApplicationStatus.Invited).length},
      {name: 'Accepted', value: applications.filter(i => i.status === ApplicationStatus.Execution).length},
      {name: 'Rejected by us', value: applications.filter(i => i.status === ApplicationStatus.RejectedByCompany).length},
      {name: 'Rejected by volunteers', value: applications.filter(i => i.status === ApplicationStatus.RejectedByVolunteer).length},
  ]
  console.log("currentTab", currentTab)

  return (
    <div className={styles.root}>
      <ProjectTabHeader project={project}/>
      <Tabs onChange={(item) => handleChange(item)} style={'reports'} tabs={tabs} activeTab={currentTab}/>
      <div className={classNames(styles.content, {[styles.border]: currentTab !== ProjectReportsTabType.Project})}>
        {currentTab === ProjectReportsTabType.Events &&
        <TabReportEvents project={project}/>
        }
        {currentTab === ProjectReportsTabType.Project &&
        <>
          {!isMobile ?
          <Tabs onChange={(item) => handleChange(item, true)} style={'mini'} tabs={miniTabs} activeTab={currentMiniTab}/>
          :
          <TabSelect style='projectStatus' tabs={miniTabs} activeTab={currentMiniTab} onChange={(item) => handleChange(item, true)}/>
          }
        <div className={styles.miniTabsContent}>
          {currentMiniTab === ProjectReportsTabTypeProject.Summary &&
            <div className={styles.tables}>
              <div className={styles.dates}>
                <div className={styles.title}>
                  Dates
                </div>
                <div className={styles.table}>
                  {firstTable.map(i =>
                    <div className={styles.row}>
                    <div className={styles.cellFirst}>
                      {i.name}
                    </div>
                    <div className={styles.cell}>
                      {i.value}
                    </div>
                  </div>
                  )}
                </div>
              </div>
              <div className={styles.volunteers}>
                <div className={styles.title}>
                  Volunteers
                </div>
                <div className={styles.table}>
                {secondTable.map(i =>
                    <div className={styles.row}>
                    <div className={styles.cellFirst}>
                      {i.name}
                    </div>
                    <div className={styles.cell}>
                      {i.value}
                    </div>
                  </div>
                  )}
                </div>
              </div>
            </div>
          }
        </div>
        </>
        }
        {currentTab === ProjectReportsTabType.Volunteers &&
          <>
            <div className={styles.header}>
              <div>
                <span>Volunteers:</span><span className={styles.total}>{total}</span></div>
              </div>
            <SliderVolunteers project={project}/>
          </>
        }
      </div>
    </div>
  )
}

export default TabReports
