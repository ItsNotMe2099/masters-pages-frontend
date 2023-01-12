import {confirmChangeData, confirmModalClose, confirmOpen, modalClose, projectOpen} from 'components/Modal/actions'
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
import OrganizationRepository from 'data/repositories/OrganizationRepository'
import {IOrganization} from 'data/intefaces/IOrganization'
import ProjectActions from "components/for_pages/Project/ProjectActions";

interface Props {
  onModalOpen: (project: IProject, mode: string) => void
}

const ProjectList = (props: Props) => {
  const {t} = useTranslation('common')
  const router = useRouter()
  const dispatch = useDispatch()
  const {projectType} = router.query
  const appContext = useAppContext()
  const currentProfile = appContext.profile
  const loading = false
  const [projects, setProjects] = useState<IProject[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [counts, setCounts] = useState<IProjectCounts>({})
  const [organization, setOrganization] = useState<IOrganization | null>(null)
  const stat = useSelector((state: IRootState) => state.taskUser.stat)
  const role = appContext.role
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [currentProjectEditId, setCurrentProjectEditId] = useState<number>(null)
  const limit = 30;
  const tabs = useMemo(
    () => ([
      {name: t('personalArea.tabProjects.menu.draft'), key: ProjectStatus.Draft},
      {name: t('personalArea.tabProjects.menu.intake'), key: ProjectStatus.Published, badge:   currentProfile.notificationNewApplicationCount + currentProfile.notificationApplicationRejectedByVolunteerCount},
      {name: t('personalArea.tabProjects.menu.paused'), key: ProjectStatus.Paused},
      {name: t('personalArea.tabProjects.menu.execution'), key: ProjectStatus.Execution, badge:  currentProfile.notificationApplicationCompleteRequestCount + currentProfile.notificationApplicationExecutionCount},
      {name: t('personalArea.tabProjects.menu.completed'), key: ProjectStatus.Completed},
      {name: t('personalArea.tabProjects.menu.cancelled'), key: ProjectStatus.Canceled},
    ]).map(item => {
      return {
        ...item,
        link: `/projects/${item.key}`
      }
    }),
    [currentProfile.role, counts,
      currentProfile.notificationNewApplicationCount,
      currentProfile.notificationApplicationShortlistCount,
      currentProfile.notificationApplicationCompleteRequestCount,
      currentProfile.notificationApplicationCompletedCount,
      currentProfile.notificationApplicationExecutionCount,
      currentProfile.notificationApplicationRejectedByVolunteerCount,
      currentProfile.notificationApplicationRejectedByCompanyCount,
    ]
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
  const fetchInitial = async () => {
    console.log("fetchInitial", projectType)
    const resCounts = await ProjectRepository.fetchCounts()
    setCounts(resCounts ?? {})
    const resProjects = await ProjectRepository.fetchByStatus(projectType as ProjectStatus, 1, limit)
    setProjects(resProjects.data)
    setTotal(resProjects.total)
  }
  useEffect(() => {
    fetchInitial();
  }, [projectType, currentProfile])


  useEffect(() => {
    OrganizationRepository.fetchCurrentOrganization().then(data => setOrganization(data))
  }, [])

  const handleScrollNext = async () => {
    setPage(page + 1);
    const data = await ProjectRepository.fetchByStatus(projectType as ProjectStatus, page + 1, limit);
    if (data) {
      setProjects(data.data);
      setTotal(data.total)
    }
  }

  const handleCreateProject = () => {
    props.onModalOpen(null, 'create')
  }

  const appStatus = (status: string) => {
    return {status: status}
  }



  const [initialProjectTab, setInitialProjectTab] = useState<string | null>(null)

  const [isEdit, setIsEdit] = useState(false)

  const handleModalOpen = (project: IProject, type: 'view' | 'edit' | 'application') => {
    switch (type) {
      case "view":
        setCurrentProjectId(project.id)
        break;
      case "edit":
        setCurrentProjectEditId(project.id);
        dispatch(projectOpen())
        setIsEdit(true)
        break;
      case "application":
        setInitialProjectTab('application')
        setCurrentProjectId(project.id);
        break;
    }
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
  }, [projectType])
  const handleDelete = (project: IProject) => {
    dispatch(confirmOpen({
      description: `${t('task.confirmDelete')} «${project.title}»?`,
      onConfirm: async () => {
        dispatch(confirmChangeData({loading: true}))
        await ProjectRepository.delete(project.id)
        appContext.projectDeleteState$.next(project)
        dispatch(confirmModalClose())
      }
    }))
  }
  return (
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
              name: `${tab.name} (${statResult ? statResult : 0})`
            }
          }))} activeTab={projectType as string}/>
        </div>
        <div className={styles.mobile}>
          <TabSelect style='projectStatus' tabs={tabs.map((tab => {
            const statResult = counts[tab.key]
            return {
              ...tab,
              name:  `${tab.name} (${statResult ? statResult : 0})`
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
            {projects.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)).map(project =>
              <ProjectCard
                key={project.id}
                actions={<ProjectActions onDelete={() => handleDelete(project)} onModalOpen={(mode) => props.onModalOpen(project, mode)}
                                         actionsType={actionsType} status={projectType} project={project}/>}
                project={project}/>
            )}
          </InfiniteScroll>
          }
        </div>
      </div>

  )
}
export default ProjectList
