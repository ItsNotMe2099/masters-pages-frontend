import styles from 'pages/FindCompaniesGuest/index.module.scss'
import { useEffect, useState } from 'react'
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
import { useDispatch } from 'react-redux'
import { signUpOpen } from 'components/Modal/actions'
import ProjectModal from 'components/for_pages/Project/ProjectModal'
import Loader from 'components/ui/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import TaskRepository, { ITaskSearchRequest } from 'data/repositories/TaskRepository'
import { ITask } from 'types'
import Task from 'components/Task'


const FindOrdersGuest = (props) => {

  const [tasks, setTasks] = useState<ITask[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [total, setTotal] = useState<number>(0)
  const [sortType, setSortType] = useState<string | null>()
  const [filter, setFilter] = useState<ITaskSearchRequest>({})
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const [currentProject, setCurrentProject] = useState<ITask | null>(null)
  const [page, setPage] = useState<number>(1)
  const limit = 10

  const fetchTasks = (page: number, limit: number, filter?: ITaskSearchRequest) => {
    TaskRepository.search(page, limit).then(data => {
      if(data){
        setTasks(data.data);
        setTotal(data.total);
      }
    })
  }
  useEffect(() => {
    fetchTasks(page, limit)
    setLoading(false);
  }, [])

  const handleSortChange = (item) => {
    setSortType(item.value);
    //router.replace(`/ProjectSearchPage?${queryString.stringify({filter: JSON.stringify(filter), sortType: item.value})}`, undefined, { shallow: true })
  }

  const handleScrollNext = () => {
    setPage(page + 1);
    TaskRepository.search(page + 1, limit).then((data) => {
      if(data){
        setTasks(tasks => [...data.data, ...tasks])
      }
    })
  }

  return (
    <Layout>
      <div className={styles.root}>
 
        <div className={styles.container}>
          <div className={styles.left}>
          <div className={styles.topContent}>
          <div className={styles.filters}>
          <GuestFilter state={isVisible} onClick={() => setIsVisible(isVisible ? false : true)}/>
      <div className={styles.projectsTobBar}>
           {!loading && <div className={styles.projectsAmount}>{t('taskSearch.projects')}: <span>{total}</span></div>}
          {tasks.length > 0 && <div className={styles.projectsSort}>
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
          dataLength={tasks.length} //This is important field to render the next data
          next={handleScrollNext}
          hasMore={total > tasks.length}
          loader={<Loader/>}
          scrollableTarget='scrollableDiv'
        >
          {tasks.map(task => 
              <Task key={task.id} task={task}/>
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
      {currentProject && <ProjectModal showType={'public'} projectId={currentProject?.id} isOpen onClose={() => setCurrentProject(null)}/>}
      <Modals/>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const res = await getAuthServerSide()(ctx as any)
  setCookie(ctx, CookiesType.registrationMode, RegistrationMode.User, {expires: addDays(new Date(), 5)})
  return {props: {...res.props}}

}

export default FindOrdersGuest
