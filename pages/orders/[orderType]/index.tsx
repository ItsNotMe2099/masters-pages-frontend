import { modalClose, taskUpdateOpen } from "components/Modal/actions";
import Task from "components/Task";
import { fetchTaskSearchList, setPageTaskSearch } from "components/TaskSearch/actions";
import TaskShareModal from "components/TaskShareModal";
import {
  fetchTaskUserList,
  fetchTaskUserStatRequest, resetTaskUserList,
  setFilterTaskUser,
  setPageTaskUser, setSortOrderTaskUser, setSortTaskUser
} from "components/TaskUser/actions";
import Loader from "components/ui/Loader";
import Tabs from "components/ui/Tabs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IRootState, ITask } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { TabSelect } from "components/TabSelect";
import {useTranslation, withTranslation} from "react-i18next";
import Layout from 'components/layout/Layout'
import {getAuthServerSide} from 'utils/auth'
import TabOrderModal from 'pages/orders/[orderType]/components/TabOrderModal'
import Modals from 'components/layout/Modals'
import Button from 'components/ui/Button'
import {fetchSavedTasks, fetchSavedTasksRequest, resetSavedTasksList} from 'components/SavedTasks/actions'
interface Props {
}
const TabOrders = (props: Props) => {
  const { t } = useTranslation('common');
  const router = useRouter()
  const dispatch = useDispatch()

  const { orderType } = router.query
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const loading = orderType === 'saved' ? useSelector((state: IRootState) => state.savedTasks.isLoading) : useSelector((state: IRootState) => state.taskUser.listLoading)
  const tasks = orderType === 'saved' ? useSelector((state: IRootState) => state.savedTasks.list) :  useSelector((state: IRootState) => state.taskUser.list)
  const total = orderType === 'saved' ? useSelector((state: IRootState) => state.savedTasks.listTotal) : useSelector((state: IRootState) => state.taskUser.total)
  const page = useSelector((state: IRootState) => state.taskUser.page)
  const stat = useSelector((state: IRootState) => state.taskUser.stat)
  const role = useSelector((state: IRootState) => state.profile.role)
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [currentTaskEdit, setCurrentTaskEdit] = useState(null);

  const tabs = [
    ...(role === 'client' ? [{name: t('personalArea.tabOrders.menu.draft'), key: 'draft'}, {name: t('personalArea.tabOrders.menu.published'), key: 'published', badge: profile.notificationTaskResponseCount}] : []),
    ...(role !== 'client' ? [{name: t('personalArea.tabOrders.menu.responses'), key: 'responses'}, {name: t('personalArea.tabOrders.menu.declined'), key: 'declined_responses', badge: profile.notificationTaskResponseDeclinedCount},
      {name: t('personalArea.tabOrders.menu.offers'), key: 'offers', badge: profile.notificationTaskOfferCount}] : []),
    {name: t('personalArea.tabOrders.menu.negotiation'), key: 'negotiation'},
    {name: t('personalArea.tabOrders.menu.inProgress'), key: 'in_progress'},
    {name: t('personalArea.tabOrders.menu.closed'), key: 'closed'},
    {name: t('personalArea.tabOrders.menu.saved'), key: 'saved'},
  ].map(item => {
    return{
      ...item,
      link: `/orders/${item.key}`
    }})
  useEffect(() => {
    if(orderType === 'saved'){
      dispatch(resetSavedTasksList());
      dispatch(resetTaskUserList())
      dispatch(fetchSavedTasksRequest(1, 10))
      dispatch(fetchTaskUserStatRequest());
      return;
    }
    dispatch(setFilterTaskUser({status: orderType}))
    if(['published', 'in_progress'].includes(orderType as string)){
      dispatch(setSortTaskUser('deadline'));
      dispatch(setSortOrderTaskUser('DESC'));
    }else{
      dispatch(setSortTaskUser('createdAt'));
      dispatch(setSortOrderTaskUser('DESC'));
    }

    dispatch(resetTaskUserList())
    dispatch(fetchTaskUserList())
    dispatch(fetchTaskUserStatRequest());
  }, [orderType])
  useEffect(() => {
    return () => {
      if(orderType === 'saved') {
        dispatch(resetSavedTasksList());
      }
        dispatch(resetTaskUserList());

    }
  }, []);
  const handleScrollNext = () => {
    if(orderType === 'saved'){
      dispatch(setPageTaskUser(page + 1))
      dispatch(fetchSavedTasksRequest(page + 1, 10))
    }else {
      dispatch(setPageTaskUser(page + 1))
      dispatch(fetchTaskUserList())
    }
  }
  const handleTaskEdit = (task: ITask) => {
    setCurrentTaskEdit(task);
    dispatch(taskUpdateOpen());
  }

  return (
    <Layout>
    <div className={styles.root}>
      <div className={styles.actions}>
      <Button  red={true} bold={true} size={'12px 40px'}
              type={'button'} onClick={() => router.push('/CreateTaskPage')}>{t("personalArea.tabOrders.menu.create")}</Button>
      </div>
      <div className={styles.desktop}>
        <Tabs style={'fullWidthRound'} tabs={tabs.map((tab => {
        console.log("Stat", stat)
        const statResult = stat.find(item => item.task_status === tab.key);

        return {...tab, name: tab.key === 'saved' ? `${tab.name}` : `${tab.name} (${statResult ? statResult.count : 0})`}
      }))} activeTab={orderType as string}/>
      </div>
      <div className={styles.mobile}>
        <TabSelect tabs={tabs.map((tab => {
        const statResult = stat.find(item => item.task_status === tab.key);

        return {...tab, name: `${tab.name} (${statResult ? statResult.count : 0})`}
      }))} activeTab={orderType as string}/>

        </div>
      <div className={styles.tasks}>
        {(loading && total === 0) && <Loader/>}
        {total > 0 && <InfiniteScroll
          dataLength={tasks.length} //This is important field to render the next data
          next={handleScrollNext}
          hasMore={total > tasks.length}
          loader={loading ? <Loader/> : null}>
          {tasks.map(task => <Task key={task.id} onEdit={handleTaskEdit} task={task} actionsType={orderType === 'saved'? 'public' : role === 'client' ? 'client' : 'master'} showProfile={false}/>)}
        </InfiniteScroll>}
      </div>
      <TabOrderModal task={currentTaskEdit} isOpen={modalKey === 'tabOrderEditModal'} onClose={() => dispatch(modalClose())}/>

    </div>
      <Modals/>
    </Layout>
  )
}
export default TabOrders
export const getServerSideProps = getAuthServerSide({redirect: true});
