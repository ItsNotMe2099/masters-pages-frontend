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

  const Buttons = (props: ProfileProps) => {

    switch(currentTab){
      case ApplicationStatus.Applied:
        return (
          <div className={styles.btns}>
            <Button onClick={props.onViewClick}  type='button' projectBtn='default'>VIEW</Button>
            <Button onClick={() => ApplicationRepository.changeApplicationStatus(props.application.id, appStatus(ApplicationStatus.Shortlist), 'corporate')} type='button' projectBtn='default'>
              SHORTLIST
            </Button>
            <Button 
            onClick={() => ApplicationRepository.changeApplicationStatus(props.application.id, appStatus(ApplicationStatus.RejectedByCompany), 'corporate')} 
            type='button' projectBtn='red'>REJECT</Button>
          </div>
        )
      case ApplicationStatus.Shortlist:
        return (
          <div className={styles.btns}>
            <Button type='button' projectBtn='default'>VIEW</Button>
            <Button onClick={() => ApplicationRepository.changeApplicationStatus(props.application.id, appStatus(ApplicationStatus.Invited), 'corporate')} type='button' projectBtn='default'>
              INVITE
            </Button>
            <Button 
            onClick={() => ApplicationRepository.changeApplicationStatus(props.application.id, appStatus(ApplicationStatus.RejectedByCompany), 'corporate')} 
            type='button' projectBtn='red'>REJECT</Button>
          </div>
        )
      case ApplicationStatus.Invited:
        return (
          <div className={styles.btns}>
            <Button type='button' projectBtn='default'>VIEW</Button>
            <Button 
            onClick={() => ApplicationRepository.changeApplicationStatus(props.application.id, appStatus(ApplicationStatus.Shortlist), 'corporate')} 
            type='button' projectBtn='red'>CANCEL INVITATION</Button>
          </div>
        )
      case ApplicationStatus.Execution:
        return (
          <div className={styles.btns}>
            <Button type='button' projectBtn='default'>VIEW</Button>
            <Button onClick={() => ApplicationRepository.changeApplicationStatus(props.application.id, appStatus(ApplicationStatus.Completed), 'corporate')} 
            type='button' projectBtn='default'>
              COMPLETE
            </Button>
            <Button 
            onClick={() => ApplicationRepository.changeApplicationStatus(props.application.id, appStatus(ApplicationStatus.RejectedByCompany), 'corporate')} 
            type='button' projectBtn='red'>REJECT</Button>
          </div>
          )
        case ApplicationStatus.Completed:
          return (
            <div className={styles.btnsCompleted}>
              <Button type='button' projectBtn='default'>VIEW</Button>
              <Button type='button' projectBtn='default'>
                REVIEW
              </Button>
              <Button type='button' projectBtn='default'>RECOMMEND</Button>
              <Button projectBtn='recycleBin'><img src='/img/icons/recycle-bin.svg' alt=''/></Button>
            </div>
          )
        case ApplicationStatus.RejectedByCompany:
          return (
            <div className={styles.btns}>
              <Button type='button' projectBtn='default'>VIEW</Button>
              <Button 
              onClick={() => ApplicationRepository.changeApplicationStatus(props.application.id, appStatus(ApplicationStatus.Shortlist), 'corporate')} 
              type='button' projectBtn='default'>
                RESTORE
              </Button>
              <Button projectBtn='recycleBin'><img src='/img/icons/recycle-bin.svg' alt=''/></Button>
            </div>
          )
    }
  }

  const Profile = (props: ProfileProps) => {

    return (
      <div className={styles.profile}>
        <div className={styles.left}>
          <div className={styles.avatar}>
            <Avatar image={props.profile.photo} size='largeSquare'/>
            <Button type='button' className={styles.details}><img src='/img/projects/account-details.svg' alt=''/></Button>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.top}>
            <div className={styles.left}>
              <div className={styles.name}>
                {props.profile.firstName} {props.profile.lastName}
              </div>
              <div className={styles.online}>
                <Marker color={props.profile.activityStatus === 'offline' ? '#DC2626' : '#27C60D'}/>
                <div className={classNames(styles.text, {[styles.textOff]: props.profile.activityStatus === 'offline'})}>
                  {props.profile.activityStatus === 'online' ? <>Online</> : <>Offline</>}
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.applied}>
                Applied on: <img src='/img/projects/calendar.svg' alt=''/> {format(new Date(props.application.appliedAt), 'dd.MM.yy')}
              </div>
              <div className={styles.applied}>
                Application No:
              </div>
            </div>
          </div>
          <div className={styles.requirements}>
            Main Requirements
          </div>
          <div className={styles.bottom}>
          <div className={styles.age}>
            <div>Age</div>
            <div className={styles.value}>
              {props.application.age}
            </div>
          </div>
          <div className={styles.age}>
            <div>Education</div>
            <div className={styles.value}>
              {props.application.education}
            </div>
          </div>
          {props.application.languages.length > 0 && <div>
         <div className={styles.sectionHeader}>Languages:</div>
         <div className={classNames(styles.sectionContent, styles.languages)}>
           {props.application.languages.map(i => <LanguageListItem className={styles.lang} model={i}/>)}
         </div>
       </div>}
        </div>
        <Buttons onViewClick={() => handleView(props.project, props.application)} application={props.application}/>
        </div>
        <div className={styles.statistic}>
          <div className={styles.withUs}>
            Statistic with us:
          </div>
          <div className={styles.option}>
            <div className={styles.text}>
              Applications:
            </div>
            0
          </div>
          <div className={styles.option}>
            <div className={styles.text}>
              Projects:
            </div>
            0
          </div>
          <div className={styles.option}>
            <div className={styles.text}>
              Orders:
            </div>
            0
          </div>
          <div className={styles.option}>
            <div className={styles.text}>
              Hours:
            </div>
            0h
          </div>
          <div className={styles.option}>
            <div className={styles.text}>
              Reviews:
            </div>
            0
          </div>
          <div className={styles.option}>
            <div className={styles.text}>
              Recommendation:
            </div>
            No
          </div>
        </div>
      </div>
    )
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
          <Profile profile={item.profile} application={item} key={index}/>
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
