import Tabs from "components/ui/Tabs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IRootState } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSavedSearches } from "components/SavedSearches/actions";
import { fetchSavedPeople } from "components/SavedPeople/actions";
import { fetchSavedTasks } from "components/SavedTasks/actions";
import SavedPeople from "./components/SavedPeople";
import SavedSearches from "./components/SavedSearches";
import SavedTasks from "./components/SavedTasks";
interface Props {

}
const TabSaved = (props: Props) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const searches = useSelector((state: IRootState) => state.savedSearch.list)
  const people = useSelector((state: IRootState) => state.savedPeople.list)
  const tasks = useSelector((state: IRootState) => state.savedTasks.list)
  const { mode, tab, tabSubPage } = router.query

  const tabs = [
    {name: 'People', key: 'people'},
    {name: 'Search', key: 'search'},
    {name: 'Tasks', key: 'tasks'},
  ].map(item => {
    return{
      ...item,
      link: `/PersonalArea/${mode}/${tab}/${item.key}`
    }})

    useEffect(() => {
      dispatch(fetchSavedSearches());
      dispatch(fetchSavedPeople());
      dispatch(fetchSavedTasks());
    }, [])


  return (
    <div className={styles.root}>
      <Tabs style={'round'} tabs={tabs.map((tab => {

        return {...tab, }
      }))} activeTab={tabSubPage as string}/>
      <div className={styles.tasks}>
        {tabSubPage === "people" &&
          <SavedPeople/>
        }
        {tabSubPage === "search" &&
        <SavedSearches/>
        }
        {tabSubPage === "tasks" &&
          <>
          {tasks.map(item => <SavedTasks
            item={item}
            />)}
          </>
        }
      </div>
    </div>
  )
}

export default TabSaved
