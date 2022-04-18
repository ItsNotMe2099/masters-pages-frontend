import {modalClose, projectOpen} from 'components/Modal/actions'

import Loader from 'components/ui/Loader'
import Tabs from 'components/ui/Tabs'
import {useRouter} from 'next/router'
import * as React from 'react'
import {useEffect, useMemo, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {IRootState, ITask} from 'types'
import styles from './index.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {TabSelect} from 'components/TabSelect'
import {useTranslation} from 'next-i18next'
import Layout from 'components/layout/Layout'
import {getAuthServerSide} from 'utils/auth'
import Modals from 'components/layout/Modals'
import Button from 'components/ui/Button'
import {ProfileRole} from 'data/intefaces/IProfile'
import ProjectModal from 'components/for_pages/Project/ProjectModal'
import {useAppContext} from 'context/state'
import {IProject, ProjectStatus} from 'data/intefaces/IProject'
import ProjectCard from 'components/for_pages/Project/ProjectCard'
import ProjectRepository from 'data/repositories/ProjectRepository'
import {IProjectCounts} from 'data/intefaces/IProjectCounts'
import { ApplicationStatus, IApplication } from 'data/intefaces/IApplication'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import { getItem } from 'localforage'

interface Props {
}
const ProjectsPage = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const dispatch = useDispatch()

  const { projectType } = router.query
  const appContext = useAppContext();
  const profile = appContext.profile
  const loading = false
  const [projects, setProjects] = useState<IProject[]>([])
  const [total, setTotal] = useState<number>(0)
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
      {name: t('personalArea.tabProjects.menu.completed'), key: ApplicationStatus.Completed},
      {name: t('personalArea.tabProjects.menu.rejected'), key: ApplicationStatus.RejectedByCompany},
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
      ApplicationRepository.fetchApplicationsByVolunteer().then((data) => {
        if(data) {
          const projects = []
          data.data.filter(item => item.status === projectType).map(item => projects.push(item.project))
          setProjects(projects)
          setTotal(projects.length)
        }
      })
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
        const statResult = counts[tab.key];
        console.log("TabRender", tab);
        return {...tab, name: tab.key === 'saved' ? `${tab.name}` : `${tab.name} (${statResult ? statResult : 0})`}
      }))} activeTab={projectType as string}/>
      </div>
      <div className={styles.mobile}>
        <TabSelect tabs={tabs.map((tab => {
          const statResult = counts[tab.key];

          return {...tab, name: tab.key === 'saved' ? `${tab.name}` : `${tab.name} (${statResult ? statResult : 0})`}
      }))} activeTab={projectType as string}/>

        </div>
      <div className={styles.projects}>
        {(loading && total === 0) && <Loader/>}
        {total > 0 && <InfiniteScroll
          dataLength={projects.length} //This is important field to render the next data
          next={handleScrollNext}
          hasMore={total > projects.length}
          loader={loading ? <Loader/> : null}>
          {projects.map(project => <ProjectCard  key={project.id}  onViewOpen={handleProjectViewOpen} project={project} actionsType={projectType === 'saved'? 'public' : role === 'corporate' ? 'client' : role === 'volunteer' ? 'volunteer' : 'public'}/>)}
        </InfiniteScroll>}
      </div>
      <ProjectModal projectId={currentProjectEdit?.id} showType={role === 'corporate' ? 'client' : 'public'} isOpen={modalKey === 'projectModal'} onClose={() => dispatch(modalClose())}/>

    </div>
      <Modals/>
    </Layout>
  )
}
export default ProjectsPage
export const getServerSideProps = getAuthServerSide({redirect: true})
