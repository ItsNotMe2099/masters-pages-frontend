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
import { ApplicationStatus } from 'data/intefaces/IApplication'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import ProfileRepository from 'data/repositories/ProfileRepostory'

interface Props {
}
const ProjectsPage = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const dispatch = useDispatch()

  const { projectType } = router.query
  const appContext = useAppContext()
  const profile = appContext.profile
  const loading = false
  const [projects, setProjects] = useState<IProject[]>([])
  const [total, setTotal] = useState<number>(0)
  const [saved, setSaved] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [counts, setCounts] = useState<IProjectCounts>({})
  const stat = useSelector((state: IRootState) => state.taskUser.stat)
  const role = appContext.role
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [currentProjectEdit, setCurrentProjectEdit] = useState(null)
  console.log("Profile", profile);
  const tabs = useMemo(
    () => (profile.role === ProfileRole.Corporate ? [
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
      return{
        ...item,
        link: `/projects/${item.key}`
      }}),
    [profile.role, counts]
  )

  useEffect(() => {
    if(profile.role === ProfileRole.Corporate){
    ProjectRepository.fetchCounts().then(data => setCounts(data ?? {}))
    ProjectRepository.fetchByStatus(projectType as ProjectStatus).then((data) => {
      if(data) {
        setProjects(data.data)
        setTotal(data.total)
      }
    }
    )}
    else if(profile.role === ProfileRole.Volunteer){
      ApplicationRepository.fetchCountsByProfile().then(data => setCounts(data ?? {}))
      ProfileRepository.fetchSavedProjects().then((data) => {
        if(data){
            if(projectType === 'saved'){
              const projects = []
              data.data.map(item => projects.push(item))
              setProjects(projects)
              setTotal(data.total)
            }
            setSaved(data.total)
        }

      })
      if(projectType !== 'saved'){
      ApplicationRepository.fetchApplicationsByVolunteer().then((data) => {
        if(data) {
          const projects = []
          data.data.filter(item => projectType === 'applied' ? (item.status === projectType || item.status === 'shortlist') : projectType === 'rejected' ? (item.status === ApplicationStatus.RejectedByCompany || item.status === ApplicationStatus.RejectedByVolunteer) : item.status === projectType).map(item => projects.push(item.project))
          setProjects(projects)
          setTotal(projects.length)
        }
      })}
    }

  }, [projectType])



  useEffect(() => {
    return () => {


    }
  }, [])
  const handleScrollNext = async () => {
    setPage(page + 1);
    const data = await ProjectRepository.fetchByStatus(ProjectStatus.Draft);
    if(data) {
      setProjects(data.data);
      setTotal(data.total)
    }
  }
  const handleProjectViewOpen = (project: IProject) => {
    setCurrentProjectEdit(project);
    dispatch(projectOpen())
  }
  const handleCreateProject = () => {
    setCurrentProjectEdit(null)
    dispatch(projectOpen())
  }

  const appStatus = (status: string) => {
    return {status: status}
  }
  const handleUpdateStatus = (status: ProjectStatus, project: IProject) => {
      ProjectRepository.fetchCounts().then(data => setCounts(data ?? {}))
      ProjectRepository.fetchByStatus(projectType as ProjectStatus).then((data) => {
        if(data) {
          setProjects(data.data)
          setTotal(data.total)
        }
      });
  }

  const handleChangeStatus = async (newStatus: ApplicationStatus, projectId: number) => {
    const app = await ApplicationRepository.fetchOneByProject(projectId)
    const changedApp = await ApplicationRepository.changeApplicationStatus(app.id, appStatus(newStatus), 'volunteer')
    if(changedApp.status !== projectType){
      setProjects(projects => projects.filter(item => item.status === projectType))
      ApplicationRepository.fetchCountsByProfile().then(data => setCounts(data ?? {}))
    }
  }

  const [currentProject, setCurrentProject] = useState<IProject | null>(null)
  const [initialProjectTab, setInitialProjectTab] = useState<string | null>(null)

  const handleProjectApplyOpen = (project: IProject, profile: IProfile) => {
    setInitialProjectTab('application')
    setCurrentProject(project);
  }

  const handleModalClose = () => {
    setCurrentProject(null)
    ApplicationRepository.fetchCountsByProfile().then(data => setCounts(data ?? {}))
    ProfileRepository.fetchSavedProjects().then((data) => {
      if(data){
        if(projectType === 'saved'){
          const projects = []
          data.data.map(item => projects.push(item))
          setProjects(projects)
          setTotal(data.total)
        }
        setSaved(data.total)
    }

    })
    ApplicationRepository.fetchApplicationsByVolunteer().then((data) => {
      if(data) {
        const projects = []
        data.data.filter(item => projectType === 'applied' ? (item.status === projectType || item.status === 'shortlist') : projectType === 'rejected' ? (item.status === ApplicationStatus.RejectedByCompany || item.status === ApplicationStatus.RejectedByVolunteer) : item.status === projectType).map(item => projects.push(item.project))
        setProjects(projects)
        setTotal(projects.length)
      }
    })
    dispatch(confirmModalClose())
  }

  const applied = counts['applied'] + counts['shortlist']
  const rejected = counts['rejectedByCompany'] + counts['rejectedByVolunteer']

  return (
    <Layout>
    <div className={styles.root}>
      {profile.role === ProfileRole.Corporate &&
      <div className={styles.actions}>
      <Button  red={true} bold={true} size={'12px 40px'}
              type={'button'} onClick={handleCreateProject}>{t('personalArea.tabProjects.menu.create')}</Button>
      </div>}
      <div className={styles.desktop}>
        <Tabs style={'fullWidthRound'} tabs={tabs.map((tab => {
        const statResult = counts[tab.key]
        console.log("TabRender", tab);
        return {...tab, name: tab.key === 'saved' ? `${tab.name} (${saved})` : tab.key === ApplicationStatus.Applied ? `${tab.name} (${applied ? applied : 0})` : tab.key === 'rejected' ? `${tab.name} (${rejected ? rejected : 0})` : `${tab.name} (${statResult ? statResult : 0})`}
      }))} activeTab={projectType as string}/>
      </div>
      <div className={styles.mobile}>
        <TabSelect tabs={tabs.map((tab => {
          const statResult = counts[tab.key]
          return {...tab, name: tab.key === 'saved' ? `${tab.name} (${saved})` : tab.key === ApplicationStatus.Applied ? `${tab.name} (${applied ? applied : 0})` : tab.key === 'rejected' ? `${tab.name} (${rejected ? rejected : 0})` : `${tab.name} (${statResult ? statResult : 0})`}
      }))} activeTab={projectType as string}/>

        </div>
      <div className={styles.projects}>
        {(loading && total === 0) && <Loader/>}
        {total > 0 && <InfiniteScroll
          dataLength={projects.length} //This is important field to render the next data
          next={handleScrollNext}
          hasMore={total > projects.length}
          loader={loading ? <Loader/> : null}>
          {projects.map(project => <ProjectCard
            onDelete={handleModalClose}
            onUpdateStatus={handleUpdateStatus}
            onStatusChange={(newStatus) => handleChangeStatus(newStatus, project.id)}
           status={projectType} key={project.id}
            onApplyClick={() => handleProjectApplyOpen(project, profile)}
            onViewOpen={handleProjectViewOpen} project={project}
            actionsType={projectType === 'saved' && role !== 'volunteer' ? 'public' : role === 'corporate' ? 'client' : role === 'volunteer' ? 'volunteer' : 'public'}/>)}
        </InfiniteScroll>}
      </div>
      <ProjectModal projectId={currentProjectEdit?.id} showType={role === 'corporate' ? 'client' : 'public'} isOpen={modalKey === 'projectModal'} onClose={() => dispatch(modalClose())}/>
      {currentProject && <ProjectModal showType={'public'} projectId={currentProject?.id} isOpen onClose={handleModalClose}/>}
    </div>
      <Modals/>
    </Layout>
  )
}
export default ProjectsPage
export const getServerSideProps = getAuthServerSide({redirect: true})
