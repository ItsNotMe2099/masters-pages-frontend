import {modalClose, taskUpdateOpen} from 'components/Modal/actions'
import Task from 'components/Task'
import {fetchTaskUserList, setPageTaskUser} from 'components/TaskUser/actions'
import Loader from 'components/ui/Loader'
import Tabs from 'components/ui/Tabs'
import {useRouter} from 'next/router'
import * as React from 'react'
import {useEffect, useRef, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  IRootState,
  ITask,
  ITaskNegotiation,
  ITaskNegotiationState,
  ITaskNegotiationType,
  ITaskStatus,
  ITypesWithStates
} from 'types'
import styles from './index.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {TabSelect} from 'components/TabSelect'
import {useTranslation} from 'next-i18next'
import Layout from 'components/layout/Layout'
import {getAuthServerSide} from 'utils/auth'
import TabOrderModal from 'components/for_pages/Orders/TabOrderModal'
import Modals from 'components/layout/Modals'
import Button from 'components/ui/Button'
import {fetchSavedTasksRequest} from 'components/SavedTasks/actions'
import {useAppContext} from 'context/state'
import NegotiationRepository from 'data/repositories/NegotiationRepository'
import TaskResponse from 'components/TaskResponse'
import {IPagination} from "types/types";
import TaskRepository from "data/repositories/TaskRepository";
import TaskNegotiationRepository from "data/repositories/TaskNegotiationRepository";
import ProfileRepository from "data/repositories/ProfileRepostory";
import TaskNew from "components/TaskNew";
import { updatedDiff } from 'deep-object-diff';
enum TabKey {
  Drafts = 'drafts',
  Offers = 'offers',
  Negotiation = 'negotiation',
  Published = 'published',
  InProgress = 'inProgress',
  Closed = 'closed',
  Saved = 'saved',

}

interface Props {
}

const TabOrders = (props: Props) => {
  const {t} = useTranslation('common')
  const router = useRouter()
  const dispatch = useDispatch()

  const orderType = router.query.orderType as TabKey
  const appContext = useAppContext()
  const profile = appContext.profile
  const [items, setItems] = useState<{ task: ITask, negotiation: ITaskNegotiation }[]>([])
  const itemsRef = useRef();
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const role = appContext.role
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [currentTaskEdit, setCurrentTaskEdit] = useState(null)
  const tabs = [
    ...(role === 'client' ? [{name: t('personalArea.tabOrders.menu.draft'), key: TabKey.Drafts},
      {
        name: t('personalArea.tabOrders.menu.published'),
        key: TabKey.Published,
        badge: profile.notificationTaskResponseCount
      }
    ] : []),
    //...(role === 'client' ? [{ name: t('Offers from master'), key: 'offers-master', badge: profile.notificationTaskOfferCount }] : []),
    {name: t('Offers'), key: TabKey.Offers, badge: profile.notificationTaskOfferCount},
    {name: t('personalArea.tabOrders.menu.negotiation'), key: TabKey.Negotiation},
    {name: t('personalArea.tabOrders.menu.inProgress'), key: TabKey.InProgress},
    {name: t('personalArea.tabOrders.menu.closed'), key: TabKey.Closed},
    ...(role !== 'client' ? [
    {name: t('personalArea.tabOrders.menu.saved'), key: TabKey.Saved}] : []),
  ].map(item => {
    return {
      ...item,
      link: `/orders/${item.key}`
    }
  })

  useEffect(() => {
    const subscriptionNegotiation = appContext.negotiationUpdateState$.subscribe(({before, after}) => {
      let toDelete = false;
      switch (after.type){
        case ITaskNegotiationType.TaskOffer:
          if([ITaskNegotiationState.Accepted, ITaskNegotiationState.Declined].includes(after.state)){
            toDelete = true
          }
          break;
        case ITaskNegotiationType.ResponseToTask:
          if([ITaskNegotiationState.Accepted, ITaskNegotiationState.Declined].includes(after.state)){
            toDelete = true
          }
          break;
        case ITaskNegotiationType.MarkAsDone:
          if([ITaskNegotiationState.Accepted].includes(after.state)){
            toDelete = true
          }
          break;
        case ITaskNegotiationType.TaskCompleted:
          if([ITaskNegotiationState.Accepted].includes(after.state)){
            toDelete = true
          }
          break;
      }
      if(toDelete){
        setItems(i => i.filter(i => !i.negotiation || i.negotiation?.id !== after.id))
      }else{
        setItems( i => i.map(i => i.negotiation && i.negotiation?.id === after.id ? {...i, ...after} : i))
      }
    })

    const subscriptionTaskUpdate = appContext.taskUpdateState$.subscribe(({before, after}) => {
      let toDelete = false;

      const afterDiff = updatedDiff(before, after);
      if(afterDiff['status']){
        toDelete = true;
      }
      if(toDelete){
        setItems(i => i.filter(i => !i.task || i.task?.id !== after.id))
      }else{
        setItems( i => i.map(i => i.task && i.task?.id === after.id ? {...i, ...after} : i))
      }
    })
    const subscriptionTaskDelete = appContext.taskDeleteState$.subscribe((task) => {
      setItems(i => i.filter(i => !i.task || i.task?.id !== task.id))
    })
    return () => {
      subscriptionNegotiation.unsubscribe()
      subscriptionTaskUpdate.unsubscribe()
      subscriptionTaskDelete.unsubscribe();
    }
  }, [items])

  useEffect(() => {
    setItems([]);
    setPage(1);
    setLoading(true);
    fetch(orderType, {page: 1, limit: 10})
  }, [orderType])


  const setTasksData = (data: IPagination<ITask>) => {
    setTotal(data.total);
    setItems(cur => [...cur, ...data.data.map(task => ({task, negotiation: ![TabKey.Published, TabKey.Drafts].includes(orderType) ? task.lastNegotiation : null}))])
  }
  const setNegotiationsData = (data: IPagination<ITaskNegotiation>) => {
    setTotal(data.total);
    setItems(cur => [...cur, ...data.data.map(negotiation => ({task: negotiation.task , negotiation}))])
  }

  const fetch = async (tab: TabKey, data: {page: number, limit: number}) => {
    console.log("FetchTab", tab);
    switch (tab){
      case TabKey.Drafts:
        setTasksData(await TaskRepository.fetchTaskListByUser({...data, status: ITaskStatus.Draft}))
        break;
      case TabKey.Offers:
        setNegotiationsData(await TaskNegotiationRepository.fetchOffers({...data}))
        break;
      case TabKey.Negotiation:
        setNegotiationsData(await TaskNegotiationRepository.fetchNegotiations({...data}))
        break;
      case TabKey.Published:
        setTasksData(await TaskRepository.fetchTaskListByUser({...data, status: ITaskStatus.Published}))
        break;
      case TabKey.InProgress:
        setTasksData(await TaskRepository.fetchTaskListByUser({...data, status: ITaskStatus.InProgress}))
        break;
      case TabKey.Closed:
        setTasksData(await TaskRepository.fetchTaskListByUser({...data, status: ITaskStatus.Done}))
        break;
      case TabKey.Saved:
        setTasksData(await ProfileRepository.fetchSavedTasks(data.page, data.limit))
        break;
    }
    setLoading(false);
  }
  const handleScrollNext = async () => {
      fetch(orderType, {page: page + 1, limit : 10})
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
                  type={'button'}
                  onClick={() => router.push('/CreateTaskPage')}>{t('personalArea.tabOrders.menu.create')}</Button>
        </div>
        <div className={styles.desktop}>
          <Tabs style={'fullWidthRound'} tabs={tabs.map((tab => {

            return {...tab, name: tab.name}
          }))} activeTab={orderType as string}/>
        </div>
        <div className={styles.mobile}>
          <TabSelect tabs={tabs.map((tab => {

            return {...tab, name: tab.name}
          }))} activeTab={orderType as string}/>

        </div>
          <div className={styles.tasks}>
            {loading && total === 0 && <Loader/>}
            {total > 0 && <InfiniteScroll
              dataLength={items.length} //This is important field to render the next data
              next={handleScrollNext}
              hasMore={total > items.length}
              loader={loading ? <Loader/> : null}
              scrollableTarget='scrollableDiv'>
              {items.map(i => <TaskNew task={i.task} negotiation={i.negotiation} actionsType={orderType === TabKey.Saved ? 'saved' : role === 'client' ? 'client' : 'master'}/>)}
            </InfiniteScroll>}
          </div>

        <TabOrderModal task={currentTaskEdit} isOpen={modalKey === 'tabOrderEditModal'}
                       onClose={() => dispatch(modalClose())}/>

      </div>
      <Modals/>
    </Layout>
  )
}
export default TabOrders
export const getServerSideProps = getAuthServerSide({redirect: true})
