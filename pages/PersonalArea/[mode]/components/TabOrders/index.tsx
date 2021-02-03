import { modalClose, taskUpdateOpen } from "components/Modal/actions";
import Task from "components/Task";
import { fetchTaskSearchList, setPageTaskSearch } from "components/TaskSearch/actions";
import TaskShareModal from "components/TaskShareModal";
import {
  fetchTaskUserList,
  fetchTaskUserStatRequest, resetTaskUserList,
  setFilterTaskUser,
  setPageTaskUser
} from "components/TaskUser/actions";
import Loader from "components/ui/Loader";
import Tabs from "components/ui/Tabs";
import { useRouter } from "next/router";
import TabOrderModal from "pages/PersonalArea/[mode]/components/TabOrders/components/TabOrderModal";
import { useEffect, useState } from "react";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IRootState, ITask } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
interface Props {

}
const TabOrders = (props: Props) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const loading = useSelector((state: IRootState) => state.taskUser.listLoading)
  const tasks = useSelector((state: IRootState) => state.taskUser.list)
  const total = useSelector((state: IRootState) => state.taskUser.total)
  const page = useSelector((state: IRootState) => state.taskUser.page)
  const stat = useSelector((state: IRootState) => state.taskUser.stat)
  const role = useSelector((state: IRootState) => state.profile.role)
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [currentTaskEdit, setCurrentTaskEdit] = useState(null);

  const { mode, tab, tabSubPage } = router.query

  const tabs = [
    ...(role === 'client' ? [{name: 'Drafts', key: 'draft'}, {name: 'Published', key: 'published'}] : []),
    ...(role !== 'client' ? [{name: 'Responses', key: 'responses'}, {name: 'Declined', key: 'declined_responses'}, {name: 'Offers', key: 'offers'}] : []),
    {name: 'Negotiation', key: 'negotiation'},
    {name: 'In progress', key: 'in_progress'},
    {name: 'Closed', key: 'closed'},
  ].map(item => {
    return{
      ...item,
      link: `/PersonalArea/${mode}/${tab}/${item.key}`
    }})
  useEffect(() => {
    dispatch(setFilterTaskUser({status: tabSubPage}))
    dispatch(resetTaskUserList())
    dispatch(fetchTaskUserList())
    dispatch(fetchTaskUserStatRequest());
  }, [tabSubPage])
  useEffect(() => {
    return () => {
      console.log("TaskUserListReset");
      dispatch(resetTaskUserList());
    }
  }, []);
  const handleScrollNext = () => {
    console.log("HandleNext", page)
    dispatch(setPageTaskUser(page + 1))
    dispatch(fetchTaskUserList())
  }
  const handleTaskEdit = (task: ITask) => {
    setCurrentTaskEdit(task);
    dispatch(taskUpdateOpen());
  }

  return (
    <div className={styles.root}>
      <Tabs style={'round'} tabs={tabs.map((tab => {
        console.log("Stat", stat)
        const statResult = stat.find(item => item.task_status === tab.key);

        return {...tab, name: `${tab.name} (${statResult ? statResult.count : 0})`}
      }))} activeTab={tabSubPage as string}/>
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
  )
}

export default TabOrders
