import styles from 'pages/FindOrdersGuest/index.module.scss'
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
import { addDays } from 'date-fns'
import { useDispatch } from 'react-redux'
import { signUpOpen } from 'components/Modal/actions'
import Loader from 'components/ui/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import TaskRepository, { ITaskSearchRequest } from 'data/repositories/TaskRepository'
import { ITask } from 'types'
import Task from 'components/Task'
import InputSearch from 'components/ui/Inputs/InputSearch'


const FindOrdersGuest = (props) => {

  const [tasks, setTasks] = useState<ITask[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [total, setTotal] = useState<number>(0)
  const [sortType, setSortType] = useState<string | null>()
  const [filter, setFilter] = useState<ITaskSearchRequest>({})
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const [page, setPage] = useState<number>(1)
  const limit = 10
  const [value, setValue] = useState('')

  const fetchTasks = (page: number, limit: number, keywords?: string, filter?: ITaskSearchRequest) => {
    TaskRepository.search(page, limit, keywords).then(data => {
      if (data) {
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

  const handleScrollNext = (value: string) => {
    setPage(page + 1);
    TaskRepository.search(page + 1, limit, value).then((data) => {
      if (data) {
        setTasks(tasks => [...tasks, ...data.data])
      }
    })
  }

  const serachRequest = async (value: string) => {
    setValue(value)
    await setPage(1)
    fetchTasks(page, limit, value)
  }

  return (
    <Layout isGuest>
      <div className={styles.root}>

        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.topContent}>
              <div className={styles.filters}>
                <GuestFilter
                  search={() => <InputSearch searchRequest={(value) => serachRequest(value)} />}
                  state={isVisible}
                  onClick={() => setIsVisible(isVisible ? false : true)}
                />
                <div className={styles.projectsTobBar}>
                  {!loading && <div className={styles.projectsAmount}>{t('taskSearch.tasks')}: <span>{total}</span></div>}
                  {tasks.length > 0 && <div className={styles.projectsSort}>
                    <span>{t('sort.title')}:</span>
                    <DropDown onChange={handleSortChange} value={sortType} options={[
                      { value: 'newFirst', label: t('sort.newFirst') },
                      { value: 'highPrice', label: t('sort.highestPrice') },
                      { value: 'lowPrice', label: t('sort.lowestPrice') }]}
                      item={(item) => <div>{item?.label}</div>}
                    />
                  </div>}
                </div>
              </div>
              <div className={styles.block}></div>
            </div>
            <div className={styles.content}>
              <div className={styles.orders}>
                {(loading && total === 0) && <Loader />}
                {total > 0 && <InfiniteScroll
                  dataLength={tasks.length} //This is important field to render the next data
                  next={() => handleScrollNext(value)}
                  hasMore={total > tasks.length}
                  loader={<Loader />}
                  scrollableTarget='scrollableDiv'
                >
                  {tasks.map(task =>
                    <Task key={task.id} task={task} />
                  )}
                </InfiniteScroll>}
              </div>
              <div className={classNames(styles.sidebar, { [styles.visible]: isVisible })}>
                <Sticky enabled={true} top={100} bottomBoundary={'#tasks-list'}>
                  <div className={styles.sidebarWrapper}>
                    <div className={styles.map}>
                      <Map />
                    </div>
                    <Button className={styles.showOnTheMap} fullWidth={true} white={true} largeFont={true} bold={true} borderRed={true} size={'16px 20px'} 
                    href='/registration/user'>{t('taskSearch.showOnTheMap')}</Button>
                  </div>
                </Sticky>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modals />
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const res = await getAuthServerSide()(ctx as any)
  setCookie(ctx, CookiesType.registrationMode, RegistrationMode.User, { expires: addDays(new Date(), 5) })
  return { props: { ...res.props } }

}

export default FindOrdersGuest
