import Map from 'components/Map'
import Button from 'components/ui/Button'
import { DropDown } from 'components/ui/DropDown'
import Loader from 'components/ui/Loader'
import { useRouter } from 'next/router'
import { default as React, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import styles from './index.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import Sticky from 'react-stickynode'
const queryString = require('query-string')
const ProjectSearchFilter = dynamic(() => import(  'components/for_pages/ProjectSearch/Filter'), {
  ssr: false
})
import {
  useWindowWidth,
} from '@react-hook/window-size'
import Layout from 'components/layout/Layout'
import Modals from 'components/layout/Modals'
import dynamic from 'next/dynamic'
import {useAppContext} from 'context/state'
import {IProject} from 'data/intefaces/IProject'
import ProjectCard from 'components/for_pages/Project/ProjectCard'
import ProjectRepository, {IProjectSearchRequest} from 'data/repositories/ProjectRepository'
import ProjectModal from 'components/for_pages/Project/ProjectModal'
import OrganizationRepository from 'data/repositories/OrganizationRepository'
import { IOrganization } from 'data/intefaces/IOrganization'
import ProjectActions from "components/for_pages/Project/ProjectActions";
import {projectOpen} from "components/Modal/actions";
import {IRootState} from "types";

interface Props {
  onShowMap: () => void
}
const ProjectSearchListView = (props: Props) => {
  const width = useWindowWidth()
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [sortType, setSortType] = useState<string | null>()
  const [filter, setFilter] = useState<IProjectSearchRequest>({})
  const [projects, setProjects] = useState<IProject[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null)
  const [initialProjectTab, setInitialProjectTab] = useState<string | null>(null)
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)

  const limit = 10

  const appContext = useAppContext()
  const role = appContext.role
  const [isShow, setIsShow] = useState(width > 700)
  useEffect(() => {
    if(router.query.projectId){
      setCurrentProjectId(parseInt(router.query.projectId as string, 10))
    }
  }, [router.query.projectId])
  const fetchProjects = (page: number, limit: number, filter?: IProjectSearchRequest) => {
    ProjectRepository.search(page, limit, null, filter).then(data => {
      if(data){
        setProjects(data.data);
        setTotal(data.total);
      }
    })
  }
  useEffect(() => {
    fetchProjects(page, limit)
    setLoading(false)
  }, [])


  const handleSortChange = (item) => {
    setSortType(item.value);
    router.replace(`/projects-search?${queryString.stringify({filter: JSON.stringify(filter), sortType: item.value})}`, undefined, { shallow: true })
  }

  const handleScrollNext = () => {
    setPage(page + 1)
    ProjectRepository.search(page + 1, limit,null, filter).then(data => {
      if(data){
        setProjects(projects => [...projects, ...data.data])
      }
    })
  }

  const handleFilterChange = (data) => {
    setPage(1)
    setFilter(data)
    fetchProjects(1, limit, data)

  }
  const getQueryFilter = () => {
    try {
      if((router.query as any).filter) {
        return JSON.parse((router.query as any).filter)
      }
    }catch (e) {

    }
    return {}
  }

  const handleModalOpen = (project: IProject, type: 'create' | 'view' | 'edit' | 'application') => {
    console.log("handleModalOpen", type)
    switch (type) {
      case "create":
        setInitialProjectTab(null)
        setCurrentProjectId(null)
        break;
      case "view":
        setInitialProjectTab(null)
        setCurrentProjectId(project.id)
        break;
      case "edit":
        setInitialProjectTab(null)
        setCurrentProjectId(project.id);
        dispatch(projectOpen())
        break;
      case "application":
        setInitialProjectTab('application')
        setCurrentProjectId(project.id);
        break;
    }
    dispatch(projectOpen())
  }

  return (
    <Layout>
    <div className={`${styles.filters} ${role === 'client' && styles.filtersClient} ${role === 'volunteer' && styles.filtersVolunteer}`}>
      <div className={styles.form}>
        <ProjectSearchFilter onChange={handleFilterChange} collapsed={!isShow} initialValues={getQueryFilter()}/>
        <div className={styles.more} onClick={() => isShow ? setIsShow(false) : setIsShow(true)}>
          {isShow ? <span>{t('taskSearch.filter.hideMoreOptions')}</span> : <span>{t('taskSearch.filter.showMoreOptions')}</span>}
          <img className={isShow ? styles.hide : null} src="/img/icons/arrowDownSrchTask.svg" alt=""/>
        </div>
      </div>
    </div>
    <div className={styles.container}>
      <div className={styles.projectsContainer} id='scrollableDiv'>
        <Button className={styles.showOnTheMap} fullWidth={true} white={true} largeFont={true} bold={true}  borderRed={true} size={'16px 20px'} onClick={props.onShowMap}>{t('taskSearch.showOnTheMap')}</Button>

        <div className={styles.sidebar}>
        <Sticky enabled={true} top={100} bottomBoundary={'#projects-list'}>
          <div className={styles.sidebarWrapper}>
        <div className={styles.map}>
          <Map/>
        </div>
        <Button className={styles.showOnTheMap} fullWidth={true} white={true} largeFont={true} bold={true}  borderRed={true} size={'16px 20px'} onClick={props.onShowMap}>{t('taskSearch.showOnTheMap')}</Button>
            {/*<div className={styles.filter}>
          <div className={styles.filterLabel}>Key words</div>
          <Input input={{value: null, onChange: () => {}}}/>
        </div>*/}
          </div>
        </Sticky>
      </div>
      <div className={styles.projects} id={'projects-list'}>
         <div className={styles.projectsTobBar}>
           {!loading && <div className={styles.projectsAmount}>{t('taskSearch.projects')}: <span>{total}</span></div>}

        </div>
        {(loading && total === 0) && <Loader/>}
        {total > 0 && <InfiniteScroll
          dataLength={projects.length} //This is important field to render the next data
          next={handleScrollNext}
          hasMore={total > projects.length}
          loader={<Loader/>}
          scrollableTarget="scrollableDiv"
        >
          {projects.map((project, index) => <ProjectCard key={project.id}
            actions={<ProjectActions  onModalOpen={(mode) => handleModalOpen(project, mode)}
              actionsType={'public'} project={project}/>}
                                                         project={project}/>)}
        </InfiniteScroll>}
      </div>
      </div>

    </div>
        {modalKey === 'projectModal'  && <ProjectModal initialTab={initialProjectTab} showType={'public'} projectId={currentProjectId} isOpen/>}

      <Modals/>
    </Layout>
  )
}
export default ProjectSearchListView
