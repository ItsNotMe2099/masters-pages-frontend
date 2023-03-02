import { modalClose, taskUpdateOpen } from 'components/Modal/actions'
import Task from 'components/Task'
import Loader from 'components/ui/Loader'
import Tabs from 'components/ui/Tabs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IRootState, ITask, ITaskCount, ITaskStatus } from 'types'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { TabSelect } from 'components/TabSelect'
import { useTranslation } from 'next-i18next'
import Layout from 'components/layout/Layout'
import { getAuthServerSide } from 'utils/auth'
import TabOrderModal from 'components/for_pages/Orders/TabOrderModal'
import Modals from 'components/layout/Modals'
import Button from 'components/ui/Button'
import { useAppContext } from 'context/state'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import TaskRepository from 'data/repositories/TaskRepository'
interface Props {
}
const TabOrders = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const dispatch = useDispatch()

  const { orderType } = router.query
  const appContext = useAppContext();
  const profile = appContext.profile
  const role = appContext.role
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [currentTaskEdit, setCurrentTaskEdit] = useState(null)

  const [tasks, setTasks] = useState<ITask[]>([])
  const [stat, setStat] = useState<ITaskCount[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)

  console.log('profileEweqe', profile)
  const tabs = [
    ...(role === 'client' ? [{ name: t('personalArea.tabOrders.menu.draft'), key: 'draft' }, { name: t('personalArea.tabOrders.menu.published'), key: 'published', badge: profile.notificationTaskResponseCount }] : []),
    ...(role !== 'client' ? [{ name: t('personalArea.tabOrders.menu.responses'), key: 'responses' }, { name: t('personalArea.tabOrders.menu.declined'), key: 'declined_responses', badge: profile.notificationTaskResponseDeclinedCount + profile.notificationTaskOfferDeclinedCount },] : []),
    { name: t('personalArea.tabOrders.menu.offers'), key: 'offers', badge: profile.notificationTaskOfferCount },
    { name: t('personalArea.tabOrders.menu.negotiation'), key: 'negotiation' },
    { name: t('personalArea.tabOrders.menu.inProgress'), key: 'in_progress' },
    { name: t('personalArea.tabOrders.menu.closed'), key: 'closed' },
    { name: t('personalArea.tabOrders.menu.saved'), key: 'saved' },
  ].map(item => {
    return {
      ...item,
      link: `/orders/${item.key}`
    }
  })

  const fetchSavedTasks = async (page: number) => {
    setLoading(true)
    await ProfileRepository.fetchSavedTasks(page, 10).then(i => {
      if (i) {
        setTasks(i.data)
        setTotal(i.total)
      }
    })
    await TaskRepository.fetchTaskUserStatRequest().then(i => setStat(i))
    setLoading(false)
  }

  const fetchTaskUser = async (page: number, sort: string = 'createdAt') => {
    setLoading(true)
    await TaskRepository.fetchTaskListByUser(page, 10, sort, 'DESC', orderType as ITaskStatus).then(i => {
      if (i) {
        setTasks(i.data)
        setTotal(i.total)
      }
    })
    await TaskRepository.fetchTaskUserStatRequest().then(i => setStat(i))
    setLoading(false)
  }

  const handleStatusChange = () => {
    if (orderType === 'saved') {
      fetchSavedTasks(page)
    }
    if (['published', 'in_progress'].includes(orderType as string)) {
      fetchTaskUser(page, 'deadline')
    } else {
      fetchTaskUser(page)
    }
  }

  useEffect(() => {
    if (orderType === 'saved') {
      fetchSavedTasks(page)
      return
    }
    if (['published', 'in_progress'].includes(orderType as string)) {
      fetchTaskUser(page, 'deadline')
    } else {
      fetchTaskUser(page)
    }
  }, [])

  useEffect(() => {
    if (orderType === 'saved') {
      fetchSavedTasks(page)
      return
    }
    if (['published', 'in_progress'].includes(orderType as string)) {
      fetchTaskUser(page, 'deadline')
    } else {
      fetchTaskUser(page)
    }
  }, [orderType])

  const handleScrollNext = async () => {
    if (orderType === 'saved') {
      setPage(page + 1)
      setLoading(true)
      await ProfileRepository.fetchSavedTasks(page + 1, 10).then(i => {
        if (i) {
          setTasks(tasks => [...tasks, ...i.data])
        }
      })
      setLoading(false)
    } else {
      setPage(page + 1)
      if (['published', 'in_progress'].includes(orderType as string)) {
        setLoading(true)
        await TaskRepository.fetchTaskListByUser(page + 1, 10, 'deadline', 'DESC', orderType as ITaskStatus).then(i => {
          if (i) {
            setTasks(tasks => [...tasks, ...i.data])
          }
        })
        setLoading(false)
      } else {
        setLoading(true)
        await TaskRepository.fetchTaskListByUser(page + 1, 10, 'createdAt', 'DESC', orderType as ITaskStatus).then(i => {
          if (i) {
            setTasks(tasks => [...tasks, ...i.data])
          }
        })
        setLoading(false)
      }
    }
  }

  const handleTaskEdit = (task: ITask) => {
    setCurrentTaskEdit(task)
    dispatch(taskUpdateOpen())
  }

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.actions}>
          <Button red={true} bold={true} size={'12px 40px'}
            type={'button'} onClick={() => router.push('/CreateTaskPage')}>{t('personalArea.tabOrders.menu.create')}</Button>
        </div>
        <div className={styles.desktop}>
          <Tabs style={'fullWidthRound'} tabs={tabs.map((tab => {
            const statResult = stat.find(item => item.task_status === tab.key)

            return { ...tab, name: tab.key === 'saved' ? `${tab.name}` : `${tab.name} (${statResult ? statResult.count : 0})` }
          }))} activeTab={orderType as string} />
        </div>
        <div className={styles.mobile}>
          <TabSelect tabs={tabs.map((tab => {
            const statResult = stat.find(item => item.task_status === tab.key)

            return { ...tab, name: tab.key === 'saved' ? `${tab.name}` : `${tab.name} (${statResult ? statResult.count : 0})` }
          }))} activeTab={orderType as string} />

        </div>
        <div className={styles.tasks}>
          {(loading && total === 0) && <Loader />}
          {total > 0 && <InfiniteScroll
            dataLength={tasks.length} //This is important field to render the next data
            next={handleScrollNext}
            hasMore={total > tasks.length}
            loader={loading ? <Loader /> : null}
            scrollableTarget='scrollableDiv'
          >
            {tasks.map(task => <Task onStatusChange={handleStatusChange} key={task.id} onEdit={handleTaskEdit} task={task} actionsType={orderType === 'saved' ? 'public' : role === 'client' ? 'client' : 'master'} showProfile={false} />)}
          </InfiniteScroll>}
        </div>
        <TabOrderModal task={currentTaskEdit} isOpen={modalKey === 'tabOrderEditModal'} onClose={() => dispatch(modalClose())} />

      </div>
      <Modals />
    </Layout>
  )
}
export default TabOrders
export const getServerSideProps = getAuthServerSide({ redirect: true })
