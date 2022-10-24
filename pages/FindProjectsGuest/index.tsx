import styles from 'pages/FindProjectsGuest/index.module.scss'
import React, { useEffect, useState } from 'react'
import Layout from 'components/layout/Layout'
import Modals from 'components/layout/Modals'
import { DropDown } from 'components/ui/DropDown'
import { useTranslation } from 'next-i18next'
import GuestFilter from 'components/for_pages/GuestPage/GuestFilter'
import Sticky from 'react-stickynode'
import Button from 'components/ui/Button'
import Map from 'components/Map'
import classNames from 'classnames'
import { getAuthServerSide } from 'utils/auth'
import { setCookie } from 'nookies'
import { CookiesType, RegistrationMode } from 'types/enums'
import {addDays} from 'date-fns'
import {useDispatch, useSelector} from 'react-redux'
import {projectOpen, signUpOpen} from 'components/Modal/actions'
import { IProject } from 'data/intefaces/IProject'
import ProjectRepository from 'data/repositories/ProjectRepository'
import { IProjectSearchRequest } from 'data/repositories/ApplicationRepository'
import ProjectCard from 'components/for_pages/Project/ProjectCard'
import ProjectModal from 'components/for_pages/Project/ProjectModal'
import Loader from 'components/ui/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import InputSearch from 'components/ui/Inputs/InputSearch'
import OrganizationRepository from 'data/repositories/OrganizationRepository'
import { IOrganization } from 'data/intefaces/IOrganization'
import {useRouter} from "next/router";
import ProjectActions from "components/for_pages/Project/ProjectActions";
import {IRootState} from "types";


const FindProjectsGuest = (props) => {
  const router = useRouter()
  const [projects, setProjects] = useState<IProject[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [total, setTotal] = useState<number>(0)
  const [sortType, setSortType] = useState<string | null>()
  const [filter, setFilter] = useState<IProjectSearchRequest>({})
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null)
  const [initialProjectTab, setInitialProjectTab] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const limit = 10
  const [value, setValue] = useState('')
  useEffect(() => {
    if(router.query.projectId){
      setCurrentProjectId(parseInt(router.query.projectId as string, 10))
    }
  }, [router.query.projectId])
  const fetchProjects = (page: number, limit: number, keywords?: string, filter?: IProjectSearchRequest) => {
    ProjectRepository.search(page, limit, keywords).then(data => {
      if(data){
        setProjects(data.data);
        setTotal(data.total);
      }
    })
  }

  useEffect(() => {
    fetchProjects(page, limit)
    setLoading(false);
  }, [])

  const handleSortChange = (item) => {
    setSortType(item.value);
    //router.replace(`/ProjectSearchPage?${queryString.stringify({filter: JSON.stringify(filter), sortType: item.value})}`, undefined, { shallow: true })
  }

  const handleProjectViewOpen = async (project: IProject) => {
    setInitialProjectTab('description')
    router.push(`/FindProjectsGuest?projectId=${project.id}`, `/FindProjectsGuest?projectId=${project.id}`, {shallow: true})

    setCurrentProjectId(project.id)
  }

  const handleScrollNext = (value: string) => {
    setPage(page + 1)
    ProjectRepository.search(page + 1, limit, value).then(data => {
      if(data){
        setProjects(projects => [...projects, ...data.data])
      }
    })
  }

  const serachRequest = async (value: string) => {
    setValue(value)
    await setPage(1)
    fetchProjects(page, limit, value)
  }

  const handleOnClose = () => {
    setCurrentProjectId(null)
    router.push(`/FindProjectsGuest`, `/FindProjectsGuest`, {shallow: true})

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
      <div className={styles.root}>

        <div className={styles.container}>
          <div className={styles.left}>
          <div className={styles.topContent}>
          <div className={styles.filters}>
          <GuestFilter
            search={() => <InputSearch searchRequest={(value) => serachRequest(value)}/>}
            state={isVisible}
            onClick={() => setIsVisible(isVisible ? false : true)}
          />
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
        </div>
        <div className={styles.block}></div>
        </div>
        <div className={styles.content}>
          <div>
          {(loading && total === 0) && <Loader/>}
          {total > 0 && <InfiniteScroll
          dataLength={projects.length} //This is important field to render the next data
          next={() => handleScrollNext(value)}
          hasMore={total > projects.length}
          loader={<Loader/>}
          scrollableTarget='scrollableDiv'
        >
          {projects.map(project =>
              <ProjectCard  project={project}  actions={<ProjectActions  onModalOpen={(mode) => handleModalOpen(project, mode)}
                                                                                             actionsType={'public'} project={project}/>} />
          )}
          </InfiniteScroll>}
          </div>
          <div className={classNames(styles.sidebar, {[styles.visible]: isVisible})}>
        <Sticky enabled={true} top={100} bottomBoundary={'#tasks-list'}>
          <div className={styles.sidebarWrapper}>
        <div className={styles.map}>
          <Map/>
        </div>
        <Button className={styles.showOnTheMap} fullWidth={true} white={true} largeFont={true} bold={true}  borderRed={true} size={'16px 20px'} onClick={() => dispatch(signUpOpen())}>{t('taskSearch.showOnTheMap')}</Button>
          </div>
        </Sticky>
      </div>
        </div>
          </div>
        </div>
      </div>
      {modalKey === 'projectModal'  && <ProjectModal initialTab={initialProjectTab} showType={'public'} projectId={currentProjectId} isOpen/>}

      <Modals/>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const res = await getAuthServerSide()(ctx as any)
  setCookie(ctx, CookiesType.registrationMode, RegistrationMode.User, {expires: addDays(new Date(), 5)})
  return {props: {...res.props}}

}

export default FindProjectsGuest
