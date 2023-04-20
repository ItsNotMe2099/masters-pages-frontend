import { modalClose, taskUpdateOpen } from 'components/Modal/actions'
import Task from 'components/Task'
import {
  fetchTaskUserList,
  fetchTaskUserStatRequest, resetTaskUserList,
  setFilterTaskUser,
  setPageTaskUser, setSortOrderTaskUser, setSortTaskUser
} from 'components/TaskUser/actions'
import Loader from 'components/ui/Loader'
import Tabs from 'components/ui/Tabs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IRootState, ITask, ITaskNegotiation, ITaskStatus } from 'types'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { TabSelect } from 'components/TabSelect'
import { useTranslation } from 'next-i18next'
import Layout from 'components/layout/Layout'
import { getAuthServerSide } from 'utils/auth'
import TabOrderModal from 'components/for_pages/Orders/TabOrderModal'
import Modals from 'components/layout/Modals'
import Button from 'components/ui/Button'
import { fetchSavedTasksRequest, resetSavedTasksList } from 'components/SavedTasks/actions'
import { useAppContext } from 'context/state'
import NegotiationRepository from 'data/repositories/NegotiationRepository'
interface Props {
}
const TabOrders = (props: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const dispatch = useDispatch()

  const { orderType } = router.query
  const appContext = useAppContext();
  const profile = appContext.profile
  const loading = orderType === 'saved' ? useSelector((state: IRootState) => state.savedTasks.isLoading) : useSelector((state: IRootState) => state.taskUser.listLoading)
  const tasks = orderType === 'saved' ? useSelector((state: IRootState) => state.savedTasks.list) : useSelector((state: IRootState) => state.taskUser.list)
  const total = orderType === 'saved' ? useSelector((state: IRootState) => state.savedTasks.listTotal) : useSelector((state: IRootState) => state.taskUser.total)
  const page = useSelector((state: IRootState) => state.taskUser.page)
  const stat = useSelector((state: IRootState) => state.taskUser.stat)
  const role = appContext.role
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [currentTaskEdit, setCurrentTaskEdit] = useState(null)

  const [offers, setOffers] = useState<ITaskNegotiation[]>([])

  const [offersTotal, setOffersTotal] = useState<number>(0)

  const [offersPage, setOffersPage] = useState<number>(1)

  console.log('profileEweqe', profile)
  const tabs = [
    ...(role === 'client' ? [{ name: t('personalArea.tabOrders.menu.draft'), key: 'draft' }, { name: t('personalArea.tabOrders.menu.published'), key: 'published', badge: profile.notificationTaskResponseCount }] : []),
    ...(role !== 'client' ? [{ name: t('personalArea.tabOrders.menu.responses'), key: 'responses' }, { name: t('personalArea.tabOrders.menu.declined'), key: 'declined_responses', badge: profile.notificationTaskResponseDeclinedCount + profile.notificationTaskOfferDeclinedCount },] : []),
    ...(role === 'client' ? [{ name: t('Offers from master'), key: 'offers-master', badge: profile.notificationTaskOfferCount }] : []),
    { name: t('Offers'), key: 'offers', badge: profile.notificationTaskOfferCount },
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

  const fetchOffersFromClient = async (page: number) => {
    await NegotiationRepository.fetchOffersFromClient(page).then(i => {
      if (i) {
        setOffers(i.data)
        setOffersTotal(i.total)
      }
    })
  }

  const fetchOffersFromMaster = async (page: number) => {
    await NegotiationRepository.fetchOffersFromMaster(page).then(i => {
      if (i) {
        setOffers(i.data)
        setOffersTotal(i.total)
      }
    })
  }

  useEffect(() => {
    if (orderType === 'saved') {
      dispatch(resetSavedTasksList())
      dispatch(resetTaskUserList())
      dispatch(fetchSavedTasksRequest(1, 10))
      dispatch(fetchTaskUserStatRequest())
      return
    }
    if (profile.role === 'client') {
      if (orderType === ITaskStatus.Offers) {
        setOffersPage(1)
        fetchOffersFromClient(offersPage)
      }
      else if (orderType === ITaskStatus.OffersMaster) {
        setOffersPage(1)
        fetchOffersFromMaster(offersPage)
      }
      else {
        dispatch(setFilterTaskUser({ status: orderType }))
      }
    }
    else {
      dispatch(setFilterTaskUser({ status: orderType }))
    }
    if (['published', 'in_progress'].includes(orderType as string)) {
      dispatch(setSortTaskUser('deadline'))
      dispatch(setSortOrderTaskUser('DESC'))
    } else {
      dispatch(setSortTaskUser('createdAt'))
      dispatch(setSortOrderTaskUser('DESC'))
    }

    dispatch(resetTaskUserList())
    dispatch(fetchTaskUserList())
    dispatch(fetchTaskUserStatRequest())
  }, [orderType])

  useEffect(() => {
    return () => {
      if (orderType === 'saved') {
        dispatch(resetSavedTasksList())
      }
      dispatch(resetTaskUserList())

    }
  }, [])
  const handleScrollNext = async () => {
    if (orderType === 'saved') {
      dispatch(setPageTaskUser(page + 1))
      dispatch(fetchSavedTasksRequest(page + 1, 10))
    }
    else if (orderType === ITaskStatus.Offers && profile.role === 'client') {
      setOffersPage(offersPage + 1)
      await NegotiationRepository.fetchOffersFromClient(page + 1).then(i => {
        if (i) {
          setOffers(offers => [...offers, ...i.data])
        }
      })
    }
    else if (orderType === ITaskStatus.OffersMaster && profile.role === 'client') {
      setOffersPage(offersPage + 1)
      await NegotiationRepository.fetchOffersFromMaster(page + 1).then(i => {
        if (i) {
          setOffers(offers => [...offers, ...i.data])
        }
      })
    }
    else {
      dispatch(setPageTaskUser(page + 1))
      dispatch(fetchTaskUserList())
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

            return { ...tab, name: tab.name }
          }))} activeTab={orderType as string} />
        </div>
        <div className={styles.mobile}>
          <TabSelect tabs={tabs.map((tab => {

            return { ...tab, name: tab.name }
          }))} activeTab={orderType as string} />

        </div>
        {orderType === ITaskStatus.Offers && profile.role === 'client' ?
          <div className={styles.tasks}>
            {loading && offersTotal === 0 && <Loader />}
            {total > 0 && <InfiniteScroll
              dataLength={offers.length} //This is important field to render the next data
              next={handleScrollNext}
              hasMore={offersTotal > offers.length}
              loader={loading ? <Loader /> : null}
              scrollableTarget='scrollableDiv'>
              {offers.map(task => <Task key={task.task.id} onEdit={handleTaskEdit} task={task.task} actionsType={'client'} showProfile={false} />)}
            </InfiniteScroll>}
          </div>
          :
          orderType === ITaskStatus.OffersMaster && profile.role === 'client' ?
            <div className={styles.tasks}>
              {loading && offersTotal === 0 && <Loader />}
              {total > 0 && <InfiniteScroll
                dataLength={offers.length} //This is important field to render the next data
                next={handleScrollNext}
                hasMore={offersTotal > offers.length}
                loader={loading ? <Loader /> : null}
                scrollableTarget='scrollableDiv'>
                {offers.map(task => <Task key={task.task.id} onEdit={handleTaskEdit} task={task.task} actionsType={'client'} showProfile={false} />)}
              </InfiniteScroll>}
            </div>
            :
            <div className={styles.tasks}>
              {loading && total === 0 && <Loader />}
              {total > 0 && <InfiniteScroll
                dataLength={tasks.length} //This is important field to render the next data
                next={handleScrollNext}
                hasMore={total > tasks.length}
                loader={loading ? <Loader /> : null}
                scrollableTarget='scrollableDiv'>
                {tasks.map(task => <Task key={task.id} onEdit={handleTaskEdit} task={task} actionsType={orderType === 'saved' ? 'public' : role === 'client' ? 'client' : 'master'} showProfile={false} />)}
              </InfiniteScroll>}
            </div>}
        <TabOrderModal task={currentTaskEdit} isOpen={modalKey === 'tabOrderEditModal'} onClose={() => dispatch(modalClose())} />

      </div>
      <Modals />
    </Layout>
  )
}
export default TabOrders
export const getServerSideProps = getAuthServerSide({ redirect: true })
