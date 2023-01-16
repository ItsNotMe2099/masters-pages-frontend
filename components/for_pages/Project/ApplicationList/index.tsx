import {confirmOpen, modalClose} from 'components/Modal/actions'
import Loader from 'components/ui/Loader'
import Tabs from 'components/ui/Tabs'
import {useRouter} from 'next/router'
import * as React from 'react'
import {useEffect, useMemo, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './index.module.scss'
import {useDispatch} from 'react-redux'
import {TabSelect} from 'components/TabSelect'
import {useTranslation} from 'next-i18next'
import {ProfileRole} from 'data/intefaces/IProfile'
import {useAppContext} from 'context/state'
import {IProject, IProjectApplicationsNotification, IProjectNotification} from 'data/intefaces/IProject'
import ProjectCard from 'components/for_pages/Project/ProjectCard'
import {IProjectCounts} from 'data/intefaces/IProjectCounts'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import ProjectActions from "components/for_pages/Project/ProjectActions";
import useInterval from "use-interval";
import NotificationRepository from "data/repositories/NotificationRepository";

interface Props {
  onModalOpen: (project: IProject, mode: string) => void
}
const ApplicationList = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const dispatch = useDispatch()

  const { projectType } = router.query
  const appContext = useAppContext()
  const currentProfile = appContext.profile
  const loading = false
  const [projects, setProjects] = useState<IProject[]>([])
  const [applications, setApplications] = useState<IApplication[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [counts, setCounts] = useState<IProjectCounts>({})
  const [savedProjectsTotal, setSavedProjectsTotal] = useState(0)
  const [notification, setNotification] = useState<IProjectApplicationsNotification | null>(null)

  const role = appContext.role
  const limit = 30;

  const fetchNotification = async () => {
    const res = await NotificationRepository.getApplicationStatus();
    if(res != null){
      setNotification(res);
    }
  }
  useInterval(() => {
    fetchNotification();
  }, 10000)
  const tabs = useMemo(
    () => ( [
      {name: t('personalArea.tabProjects.menu.saved'), key: 'saved'},
      {name: t('personalArea.tabProjects.menu.applied'), key: ApplicationStatus.Applied, badge:  notification?.notificationProjectMessagesForAppliedApplicationCount},
      {name: t('personalArea.tabProjects.menu.invited'), key: ApplicationStatus.Invited, badge: notification?.notificationProjectMessagesForInvitedApplicationCount + currentProfile.notificationApplicationInvitedCount},
      {name: t('personalArea.tabProjects.menu.execution'), key: ApplicationStatus.Execution, badge: notification?.notificationProjectMessagesForExecutionApplicationCount + currentProfile.notificationApplicationExecutionCount},
      {name: 'C-request', key: ApplicationStatus.CompleteRequest, badge: notification?.notificationProjectMessagesForCompleteRequestApplicationCount},
      {name: t('personalArea.tabProjects.menu.completed'), key: ApplicationStatus.Completed, badge:  notification?.notificationProjectMessagesForCompletedApplicationCount + currentProfile.notificationApplicationCompletedCount},
      {name: t('personalArea.tabProjects.menu.rejected'), key: 'rejected', badge:  notification?.notificationProjectMessagesForRejectedApplicationCount + currentProfile.notificationApplicationRejectedByCompanyCount},  ]).map(item => {
      return{
        ...item,
        link: `/projects/${item.key}`
      }}),
    [currentProfile.role, counts, ProfileRole.Client,
      currentProfile.notificationNewApplicationCount,
      currentProfile.notificationApplicationShortlistCount,
      currentProfile.notificationApplicationCompleteRequestCount,
      currentProfile.notificationApplicationCompletedCount,
      currentProfile.notificationApplicationExecutionCount,
      currentProfile.notificationApplicationRejectedByVolunteerCount,
      currentProfile.notificationApplicationRejectedByCompanyCount,]
  )

  const fetchInitial = async () => {
      const resCounts = await ApplicationRepository.fetchCountsByProfile()
      setCounts(resCounts ?? {})
      const resSavedProjects = await ProfileRepository.fetchSavedProjects();
      setSavedProjectsTotal(resSavedProjects.total)
      if (projectType === 'saved') {
        setProjects(resSavedProjects.data)
        setTotal(resSavedProjects.total)
      } else {
        const resApps = await ApplicationRepository.fetchApplicationsByVolunteer(1, limit);
        const projects = resApps.data.filter(item => {
          switch (projectType){
            case 'applied':
              return   (item.status === projectType || item.status === 'shortlist')
            case 'rejected':
              return (item.status === ApplicationStatus.RejectedByCompany || item.status === ApplicationStatus.RejectedByVolunteer)
            default:
              return item.status === projectType
          }
        })
        setApplications(projects)
        setTotal(projects.length)
      }


  }
  useEffect(() => {
    fetchInitial();
    fetchNotification();
  }, [projectType, currentProfile])




  const handleScrollNext = async () => {
    setPage(page + 1);
    if (projectType === 'saved') {
      const data = await ProfileRepository.fetchSavedProjects(page + 1, limit);
      if(data) {
        setProjects(data.data);
        setTotal(data.total)
      }
    }

  }

  const applied = counts['applied'] + counts['shortlist']
  const rejected = counts['rejectedByCompany'] + counts['rejectedByVolunteer']
  useEffect(() => {
    const subscriptionCreate = appContext.applicationCreateState$.subscribe((project) => {
      fetchInitial()
    });
    const subscriptionUpdate = appContext.applicationUpdateState$.subscribe((project) => {
      fetchInitial()
    });
    const subscriptionDelete = appContext.applicationDeleteState$.subscribe((project) => {
      fetchInitial()
    });

      return () => {
        subscriptionCreate.unsubscribe()
        subscriptionUpdate.unsubscribe()
        subscriptionDelete.unsubscribe()
    }
  }, [projectType])
  const handleDeleteApplication = (app: IApplication) => {
    dispatch(confirmOpen({
      description: `${t('task.confirmDelete')} «${app.project.title}»?`,
      onConfirm: async () => {
        dispatch(modalClose())
        await ApplicationRepository.delete(app.id)
        appContext.applicationDeleteState$.next(app)
      }
    }))
  }
  const handleDeleteSaved = (project: IProject) => {
    dispatch(confirmOpen({
      description: `${t('task.confirmDelete')} «${project.title}»?`,
      onConfirm: async () => {
        dispatch(modalClose())
        await ProfileRepository.deleteFromSavedProjects({profileId: currentProfile?.id}, project.id)
        fetchInitial()
      }
    }))
  }

  const actionsType = useMemo(() => {
    if (projectType === 'saved' && role !== 'volunteer') {
      return 'public'
    } else if (role === 'corporate') {
      return 'client'
    } else if (role === 'volunteer') {
      return 'volunteer'
    } else {
      return 'public'
    }
  }, [projectType, role])
  return (
    <div className={styles.root}>
      <div className={styles.desktop}>
        <Tabs style={'fullWidthRound'} tabs={tabs.map((tab => {
        const statResult = counts[tab.key]
        console.log("TabRender", tab);
        return {...tab, name: tab.key === 'saved' ? `${tab.name} (${savedProjectsTotal})` : tab.key === ApplicationStatus.Applied ? `${tab.name} (${applied ? applied : 0})` : tab.key === 'rejected' ? `${tab.name} (${rejected ? rejected : 0})` : `${tab.name} (${statResult ? statResult : 0})`}
      }))} activeTab={projectType as string}/>
      </div>
      <div className={styles.mobile}>
        <TabSelect style='projectStatus' tabs={tabs.map((tab => {
          const statResult = counts[tab.key]
          return {...tab, name: tab.key === 'saved' ? `${tab.name} (${savedProjectsTotal})` : tab.key === ApplicationStatus.Applied ? `${tab.name} (${applied ? applied : 0})` : tab.key === 'rejected' ? `${tab.name} (${rejected ? rejected : 0})` : `${tab.name} (${statResult ? statResult : 0})`}
      }))} activeTab={projectType as string}/>

        </div>
      <div className={styles.projects}>
        {(loading && total === 0) && <Loader/>}
        {total > 0 && <InfiniteScroll
          dataLength={projects.length} //This is important field to render the next data
          next={handleScrollNext}
          hasMore={total > projects.length}
          loader={loading ? <Loader/> : null}>
          {projectType === 'saved' ? projects.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)).map(project =>
              <ProjectCard
                key={project.id}
                actions={<ProjectActions onDelete={() => handleDeleteSaved(project)} onModalOpen={(mode) => props.onModalOpen(project, mode)}
                                         actionsType={actionsType} status={projectType} project={project}/>}
                project={project}/>
            ) : applications.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)).map(app =>
            <ProjectCard
              key={app.id}
              actions={<ProjectActions onDelete={() => handleDeleteApplication(app)} onModalOpen={(mode) => props.onModalOpen(app.project, mode)}
                                       actionsType={actionsType} status={projectType} application={app} />}
              project={app.project}/>
          )}
        </InfiniteScroll>
      }
      </div>
     </div>
  )
}
export default ApplicationList
