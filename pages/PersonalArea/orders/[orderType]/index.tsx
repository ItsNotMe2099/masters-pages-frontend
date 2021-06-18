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
import TabOrderModal from 'pages/PersonalArea/orders/[orderType]/components/TabOrderModal'
import Modals from 'components/layout/Modals'
interface Props {
}
const TabOrders = (props: Props) => {
  const { t } = useTranslation('common');
  const router = useRouter()
  const dispatch = useDispatch()
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const loading = useSelector((state: IRootState) => state.taskUser.listLoading)
  const tasks = useSelector((state: IRootState) => state.taskUser.list)
  const total = useSelector((state: IRootState) => state.taskUser.total)
  const page = useSelector((state: IRootState) => state.taskUser.page)
  const stat = useSelector((state: IRootState) => state.taskUser.stat)
  const role = useSelector((state: IRootState) => state.profile.role)
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [currentTaskEdit, setCurrentTaskEdit] = useState(null);

  const { orderType } = router.query
  const tabs = [
    ...(role === 'client' ? [{name: t('personalArea.tabOrders.menu.draft'), key: 'draft'}, {name: t('personalArea.tabOrders.menu.published'), key: 'published', badge: profile.notificationTaskResponseCount}] : []),
    ...(role !== 'client' ? [{name: t('personalArea.tabOrders.menu.responses'), key: 'responses'}, {name: t('personalArea.tabOrders.menu.declined'), key: 'declined_responses', badge: profile.notificationTaskResponseDeclinedCount},
      {name: t('personalArea.tabOrders.menu.offers'), key: 'offers', badge: profile.notificationTaskOfferCount}] : []),
    {name: t('personalArea.tabOrders.menu.negotiation'), key: 'negotiation'},
    {name: t('personalArea.tabOrders.menu.inProgress'), key: 'in_progress'},
    {name: t('personalArea.tabOrders.menu.closed'), key: 'closed'},
  ].map(item => {
    return{
      ...item,
      link: `/PersonalArea/orders/${item.key}`
    }})
  useEffect(() => {
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
      dispatch(resetTaskUserList());
    }
  }, []);
  const handleScrollNext = () => {
    dispatch(setPageTaskUser(page + 1))
    dispatch(fetchTaskUserList())
  }
  const handleTaskEdit = (task: ITask) => {
    setCurrentTaskEdit(task);
    dispatch(taskUpdateOpen());
  }

  return (
    <Layout>
    <div className={styles.root}>
      <div className={styles.desktop}>
      <Tabs style={'round'} tabs={tabs.map((tab => {
        console.log("Stat", stat)
        const statResult = stat.find(item => item.task_status === tab.key);

        return {...tab, name: `${tab.name} (${statResult ? statResult.count : 0})`}
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
          {tasks.map(task => <Task key={task.id} onEdit={handleTaskEdit} task={task} actionsType={role === 'client' ? 'client' : 'master'} showProfile={false}/>)}
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
