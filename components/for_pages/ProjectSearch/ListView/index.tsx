import Map from 'components/Map'
import Button from 'components/ui/Button'
import { DropDown } from 'components/ui/DropDown'
import Loader from 'components/ui/Loader'
import { useRouter } from 'next/router'
import { default as React, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import styles from './index.module.scss'
import { useDispatch} from 'react-redux'
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
  const [currentProject, setCurrentProject] = useState<IProject | null>(null)
  const [initialProjectTab, setInitialProjectTab] = useState<string | null>(null)

  const appContext = useAppContext()
  const role = appContext.role
  const [isShow, setIsShow] = useState(width > 700)
  console.log('Fetch1112')
  const fetchProjects = (filter?: IProjectSearchRequest, sortType?: string, page?: number, limit?: number) => {
    ProjectRepository.search(filter, page, limit).then(data => {
      if(data){
        setProjects(data.data);
        setTotal(data.total);
      }
    })
  }
  useEffect(() => {
    fetchProjects()
    setLoading(false);
  }, [])


  const handleSortChange = (item) => {
    setSortType(item.value);
    router.replace(`/ProjectSearchPage?${queryString.stringify({filter: JSON.stringify(filter), sortType: item.value})}`, undefined, { shallow: true })
  }
  const handleScrollNext = () => {
    setPage(page + 1);
    fetchProjects(filter, sortType, page + 1);
  }
  const handleRefresh = () => {

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
  const handleProjectViewOpen = (project: IProject) => {
    setInitialProjectTab('description')
    setCurrentProject(project);
  }
  const handleProjectApplyOpen = (project: IProject) => {
    setInitialProjectTab('application')
    setCurrentProject(project);

  }
  return (
    <Layout>
    <div className={`${styles.filters} ${role === 'client' && styles.filtersClient} ${role === 'volunteer' && styles.filtersVolunteer}`}>
      <div className={styles.form}>
        <ProjectSearchFilter collapsed={!isShow} initialValues={getQueryFilter()}/>
        <div className={styles.more} onClick={() => isShow ? setIsShow(false) : setIsShow(true)}>
          {isShow ? <span>{t('taskSearch.filter.hideMoreOptions')}</span> : <span>{t('taskSearch.filter.showMoreOptions')}</span>}
          <img className={isShow ? styles.hide : null} src="/img/icons/arrowDownSrchTask.svg" alt=""/>
        </div>
      </div>
    </div>
    <div className={styles.container}>
      <div className={styles.projectsContainer}>
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
          {projects.length > 0 && <div className={styles.projectsSort}>
            <span>{t('sort.title')}:</span>
            <DropDown onChange={handleSortChange} value={sortType} options={[
              {value: 'newFirst',  label: t('sort.newFirst')},
              {value: 'highPrice', label: t('sort.highestPrice')},
              {value: 'lowPrice', label: t('sort.lowestPrice')}]}
                      item={(item) => <div>{item?.label}</div>}
            />
          </div>}
        </div>
        {(loading && total === 0) && <Loader/>}
        {total > 0 && <InfiniteScroll
          dataLength={projects.length} //This is important field to render the next data
          next={handleScrollNext}
          hasMore={total > projects.length}
          loader={<Loader/>}
        >
          {projects.map((project, index) => <ProjectCard key={project.id} actionsType={'public'} project={project} onApplyClick={handleProjectApplyOpen} onViewOpen={handleProjectViewOpen}/>)}
        </InfiniteScroll>}
      </div>
      </div>

    </div>
      {currentProject && <ProjectModal showType={'public'} projectId={currentProject?.id} isOpen onClose={() => setCurrentProject(null)}/>}

      <Modals/>
    </Layout>
  )
}
export default ProjectSearchListView
