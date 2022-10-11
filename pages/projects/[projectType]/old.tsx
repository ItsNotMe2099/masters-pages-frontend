import {confirmModalClose, modalClose, projectOpen} from 'components/Modal/actions'
import Loader from 'components/ui/Loader'
import Tabs from 'components/ui/Tabs'
import {useRouter} from 'next/router'
import * as React from 'react'
import {useEffect, useMemo, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {IRootState} from 'types'
import styles from './index.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {TabSelect} from 'components/TabSelect'
import {useTranslation} from 'next-i18next'
import Layout from 'components/layout/Layout'
import {getAuthServerSide} from 'utils/auth'
import Modals from 'components/layout/Modals'
import Button from 'components/ui/Button'
import {IProfile, ProfileRole} from 'data/intefaces/IProfile'
import ProjectModal from 'components/for_pages/Project/ProjectModal'
import {useAppContext} from 'context/state'
import {IProject, ProjectStatus} from 'data/intefaces/IProject'
import ProjectCard from 'components/for_pages/Project/ProjectCard'
import ProjectRepository from 'data/repositories/ProjectRepository'
import {IProjectCounts} from 'data/intefaces/IProjectCounts'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import OrganizationRepository from 'data/repositories/OrganizationRepository'
import {IOrganization} from 'data/intefaces/IOrganization'

interface Props {
}

const ProjectsPage = (props: Props) => {
  const {t} = useTranslation('common')
  const router = useRouter()
  const dispatch = useDispatch()

  const {projectType} = router.query
  const appContext = useAppContext()
  const currentProfile = appContext.profile
  const loading = false
  const [projects, setProjects] = useState<IProject[]>([])
  const [applications, setApplications] = useState<IApplication[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [counts, setCounts] = useState<IProjectCounts>({})
  const [organization, setOrganization] = useState<IOrganization | null>(null)
  const [savedProjectsTotal, setSavedProjectsTotal] = useState(0)
  const stat = useSelector((state: IRootState) => state.taskUser.stat)
  const role = appContext.role
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [currentProjectEditId, setCurrentProjectEditId] = useState<number>(null)
  const limit = 30;
  const tabs = useMemo(
    () => (currentProfile.role === ProfileRole.Corporate ? [
      {name: t('personalArea.tabProjects.menu.draft'), key: ProjectStatus.Draft},
      {name: t('personalArea.tabProjects.menu.intake'), key: ProjectStatus.Published},
      {name: t('personalArea.tabProjects.menu.paused'), key: ProjectStatus.Paused},
      {name: t('personalArea.tabProjects.menu.execution'), key: ProjectStatus.Execution},
      {name: t('personalArea.tabProjects.menu.completed'), key: ProjectStatus.Completed},
      {name: t('personalArea.tabProjects.menu.cancelled'), key: ProjectStatus.Canceled},
    ] : [
      {name: t('personalArea.tabProjects.menu.saved'), key: 'saved'},
      {name: t('personalArea.tabProjects.menu.applied'), key: ApplicationStatus.Applied},
      {name: t('personalArea.tabProjects.menu.invited'), key: ApplicationStatus.Invited},
      {name: t('personalArea.tabProjects.menu.execution'), key: ApplicationStatus.Execution},
      {name: 'C-request', key: ApplicationStatus.CompleteRequest},
      {name: t('personalArea.tabProjects.menu.completed'), key: ApplicationStatus.Completed},
      {name: t('personalArea.tabProjects.menu.rejected'), key: 'rejected'},
    ]).map(item => {
      return {
        ...item,
        link: `/projects/${item.key}`
      }
    }),
    [currentProfile.role, counts]
  )

  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null)
  useEffect(() => {
    if (router.query.projectId) {
      console.log("OpenProjectId11")
      if (currentProfile.role === ProfileRole.Corporate) {
        setCurrentProjectEditId(parseInt(router.query.projectId as string, 10))
        dispatch(projectOpen())
      } else {
        setCurrentProjectId(parseInt(router.query.projectId as string, 10))
      }
    }
  }, [router.query.projectId])
  const fetchInitial = () => {
    if (currentProfile.role === ProfileRole.Corporate) {
      const resCounts = await ProjectRepository.fetchCounts()
      setCounts(resCounts ?? {})
      const resProjects = await ProjectRepository.fetchByStatus(projectType as ProjectStatus)
      setProjects(resProjects.data)
      setTotal(resProjects.total)
    } else if (currentProfile.role === ProfileRole.Volunteer) {
      const resCounts = await ProjectRepository.fetchCounts()
      setCounts(resCounts ?? {})
      const resSavedProjects = await ProfileRepository.fetchSavedProjects();
      setSavedProjectsTotal(resSavedProjects.total)
      if (projectType === 'saved') {
        setProjects(resSavedProjects.data)
        setTotal(resSavedProjects.total)
      } else {
        const resApps = await ApplicationRepository.fetchApplicationsByVolunteer();
        const projects = resApps.data.filter(item => projectType === 'applied' ? (item.status === projectType || item.status === 'shortlist') : projectType === 'rejected' ? (item.status === ApplicationStatus.RejectedByCompany || item.status === ApplicationStatus.RejectedByVolunteer) : item.status === projectType).map(item => item.project)
        setProjects(projects)
        setTotal(projects.length)
      }

    }
    useEffect(() => {
      fetchInitial();
    }, [projectType, currentProfile])


    useEffect(() => {
      if (currentProfile.role === ProfileRole.Corporate) {
        OrganizationRepository.fetchCurrentOrganization().then(data => setOrganization(data))
      }
    }, [])

    const handleScrollNext = async () => {
      setPage(page + 1);
      const data = await ProjectRepository.fetchByStatus(ProjectStatus.Draft);
      if (data) {
        setProjects(data.data);
        setTotal(data.total)
      }
    }
    const handleProjectViewOpen = async (project: IProject) => {
      console.log("handleProjectViewOpen", project)
      if (currentProfile.role !== ProfileRole.Corporate) {
        setCurrentProjectId(project.id)
      } else {
        setCurrentProjectEditId(project.id);

        dispatch(projectOpen())
      }

    }
    const handleCreateProject = () => {
      setCurrentProjectEditId(null)
      dispatch(projectOpen())
    }

    const appStatus = (status: string) => {
      return {status: status}
    }
    const handleUpdateStatus = (status: ProjectStatus, project: IProject) => {
      ProjectRepository.fetchCounts().then(data => setCounts(data ?? {}))
      ProjectRepository.fetchByStatus(projectType as ProjectStatus).then((data) => {
        if (data) {
          setProjects(data.data)
          setTotal(data.total)
        }
      });
    }


    const handleChangeStatus = async (newStatus: ApplicationStatus, projectId: number) => {
      const app = await ApplicationRepository.fetchOneByProject(projectId)
      const changedApp = await ApplicationRepository.changeApplicationStatus(app.id, appStatus(newStatus), 'volunteer')
      if (changedApp.status !== projectType) {
        setProjects(projects => projects.filter(item => item.status === projectType))
        ApplicationRepository.fetchCountsByProfile().then(data => setCounts(data ?? {}))
        if (currentProfile.role === ProfileRole.Volunteer) {
          ApplicationRepository.fetchApplicationsByVolunteer().then((data) => {
            if (data) {
              const projects = []
              data.data.filter(item => projectType === 'applied' ? (item.status === projectType || item.status === 'shortlist') : projectType === 'rejected' ? (item.status === ApplicationStatus.RejectedByCompany || item.status === ApplicationStatus.RejectedByVolunteer) : item.status === projectType).map(item => projects.push(item.project))
              setProjects(projects)
              setTotal(projects.length)
            }
          })
        }
      }
    }

    const handleChangeProjectStatus = async (newStatus: ProjectStatus, projectId: number) => {
      const changedProject = await ProjectRepository.update(projectId, {status: newStatus})
      if (changedProject?.status !== projectType) {
        ProjectRepository.fetchByStatus(projectType as ProjectStatus).then((data) => {
          if (data) {
            setProjects(data.data)
            setTotal(data.total)
          }
        })
        ProjectRepository.fetchCounts().then(data => setCounts(data ?? {}))
      }
    }

    const [initialProjectTab, setInitialProjectTab] = useState<string | null>(null)

    const handleProjectApplyOpen = async (project: IProject, profile: IProfile) => {
      setInitialProjectTab('application')
      setCurrentProjectId(project.id);

    }

    const [isEdit, setIsEdit] = useState(false)

    const handleProjectEdit = (project: IProject) => {
      setCurrentProjectEditId(project.id);
      dispatch(projectOpen())
      setIsEdit(true)
    }

    const applied = counts['applied'] + counts['shortlist']
    const rejected = counts['rejectedByCompany'] + counts['rejectedByVolunteer']
    useEffect(() => {
      appContext.projectCreateState$.subscribe((project) => {

      })
      const subscriptionCreate = appContext.projectCreateState$.subscribe((project) => {
        fetchInitial()
      });
      const subscriptionUpdate = appContext.projectUpdateState$.subscribe((project) => {
        fetchInitial()
      });
      const subscriptionDelete = appContext.projectDeleteState$.subscribe((project) => {
        fetchInitial()
      });
      return () => {
        subscriptionCreate.unsubscribe()
        subscriptionUpdate.unsubscribe()
        subscriptionDelete.unsubscribe()
      }
    }, [])
    return (
      <Layout>
        <div className={styles.root}>
          {currentProfile.role === ProfileRole.Corporate &&
            <div className={styles.actions}>
              <Button red={true} bold={true} size={'12px 40px'}
                      type={'button'} onClick={handleCreateProject}>{t('personalArea.tabProjects.menu.create')}</Button>
            </div>}
          <div className={styles.desktop}>
            <Tabs style={'fullWidthRound'} tabs={tabs.map((tab => {
              const statResult = counts[tab.key]
              console.log("TabRender", tab);
              return {
                ...tab,
                name: tab.key === 'saved' ? `${tab.name} (${savedProjectsTotal})` : tab.key === ApplicationStatus.Applied ? `${tab.name} (${applied ? applied : 0})` : tab.key === 'rejected' ? `${tab.name} (${rejected ? rejected : 0})` : `${tab.name} (${statResult ? statResult : 0})`
              }
            }))} activeTab={projectType as string}/>
          </div>
          <div className={styles.mobile}>
            <TabSelect style='projectStatus' tabs={tabs.map((tab => {
              const statResult = counts[tab.key]
              return {
                ...tab,
                name: tab.key === 'saved' ? `${tab.name} (${savedProjectsTotal})` : tab.key === ApplicationStatus.Applied ? `${tab.name} (${applied ? applied : 0})` : tab.key === 'rejected' ? `${tab.name} (${rejected ? rejected : 0})` : `${tab.name} (${statResult ? statResult : 0})`
              }
            }))} activeTab={projectType as string}/>

          </div>
          <div className={styles.projects}>
            {(loading && total === 0) && <Loader/>}
            {total > 0 && <InfiniteScroll
              dataLength={projects.length} //This is important field to render the next data
              next={handleScrollNext}
              hasMore={total > projects.length}
              loader={loading ? <Loader/> : null}>
              {projects.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)).map(project => <ProjectCard
                onUpdateStatus={handleUpdateStatus}
                onStatusChange={(newStatus) => handleChangeStatus(newStatus, project.id)}
                onProjectStatusChange={(newStatus) => handleChangeProjectStatus(newStatus, project.id)}
                status={projectType} key={project.id}
                onApplyClick={() => handleProjectApplyOpen(project, currentProfile)}
                onViewOpen={handleProjectViewOpen}
                onEdit={handleProjectEdit}
                project={project}
                actionsType={projectType === 'saved' && role !== 'volunteer' ? 'public' : role === 'corporate' ? 'client' : role === 'volunteer' ? 'volunteer' : 'public'}/>)}
            </InfiniteScroll>
            }
          </div>
          <ProjectModal organization={organization} outerVar={isEdit} projectId={currentProjectEditId}
                        initialTab={initialProjectTab} showType={role === 'corporate' ? 'client' : 'public'}
                        isOpen={modalKey === 'projectModal'}/>
          {!currentProjectEditId && currentProjectId &&
            <ProjectModal outerVar={isEdit} initialTab={initialProjectTab} showType={'public'}
                          projectId={currentProjectId} isOpen/>}
        </div>
        {total === 0 && <div className={styles.noProjects}><span>{t('noProjects')}</span></div>}
        <Modals/>
      </Layout>
    )
  }
  export default ProjectsPage
  export const getServerSideProps = getAuthServerSide({redirect: true})
