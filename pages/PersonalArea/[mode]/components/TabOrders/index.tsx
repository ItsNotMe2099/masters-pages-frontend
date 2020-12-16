import Task from "components/Task";
import { fetchTaskSearchList, setPageTaskSearch } from "components/TaskSearch/actions";
import { fetchTaskUserList, fetchTaskUserStatRequest, setPageTaskUser } from "components/TaskUser/actions";
import Loader from "components/ui/Loader";
import Tabs from "components/ui/Tabs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IRootState } from "types";
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

  const { mode, tab, tabSubPage } = router.query

  const tabs = [
    {name: 'Pending', key: 'pending'},
    {name: 'Negotiation', key: 'Negotiation'},
    {name: 'In progress', key: 'in-progress'},
    {name: 'Closed', key: 'closed'},
  ].map(item => {
    return{
      ...item,
      link: `/PersonalArea/${mode}/${tab}/${item.key}`
    }})
  useEffect(() => {
    dispatch(fetchTaskUserList())
    dispatch(fetchTaskUserStatRequest());
  }, [])
  const handleScrollNext = () => {
    console.log("HandleNext", page)
    dispatch(setPageTaskUser(page + 1))
    dispatch(fetchTaskUserList())
  }
  return (
    <div className={styles.root}>
      <Tabs style={'round'} tabs={tabs.map((tab => {
        console.log("Stat", stat)
        if(stat.find(item => item.task_status)){

        }
        return {...tab, }
      }))} activeTab={tabSubPage as string}/>
      <div className={styles.tasks}>
        {(loading && total > 0) && <Loader/>}
        {total > 0 && <InfiniteScroll
          dataLength={tasks.length} //This is important field to render the next data
          next={handleScrollNext}
          hasMore={total > tasks.length}
          loader={<Loader/>}>
          {tasks.map(task => <Task task={task}/>)}
        </InfiniteScroll>}
      </div>
    </div>
  )
}

export default TabOrders
