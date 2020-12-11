import Map from "components/Map";
import Task from "components/Task";
import {
  fetchTaskSearchList,
  resetTaskSearchList,
  setPageTaskSearch,
  setSortTaskSearch
} from "components/TaskSearch/actions";
import Button from "components/ui/Button";
import { DropDown } from "components/ui/DropDown";
import Loader from "components/ui/Loader";
import Tabs from "components/ui/Tabs";
import { useRouter } from "next/router";
import MapHeader from "pages/SearchTaskPage/MapView/MapHeader";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IRootState } from "types";
import styles from './index.module.scss'

import { useDispatch, useSelector } from 'react-redux'
interface Props {
  onShowList: () => void
}
const SearchTaskMapView= (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('exactLocation')
  const loading = useSelector((state: IRootState) => state.taskSearch.listLoading)
  const tasks = useSelector((state: IRootState) => state.taskSearch.list)
  const total = useSelector((state: IRootState) => state.taskSearch.total)
  const page = useSelector((state: IRootState) => state.taskSearch.page)

  console.log("Has More", total > tasks.length)
  const handleSortChange = (item) => {
    console.log("ChangeSort", item)
    dispatch(setSortTaskSearch(item.value));
    dispatch(resetTaskSearchList())
    dispatch(fetchTaskSearchList())
  }
  const handleScrollNext = () => {
    console.log("HandleNext", page)
    dispatch(setPageTaskSearch(page + 1))
    dispatch(fetchTaskSearchList())
  }

  const tabs = [
    { name: 'Exact location', key: 'exactLocation' },
    { name: 'Approximate location', key: 'approximateLocation' },
  ];
  const handleChangeTab = (item) => {
    setActiveTab(item.key);
  }
  return (
    <div className={styles.root}>
      <MapHeader/>
      <div className={styles.container}>
        <div className={styles.wrapper}>
        <div className={styles.tasks}>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={handleChangeTab}/>

          <div className={styles.tasksWrapper} id={'task-search-map-list'}>


            <div className={styles.tasksTobBar}>
              <div className={styles.tasksAmount}>Tasks: <span>1212</span></div>
              <div className={styles.tasksSort}>
                <span>Sort by:</span>
                <DropDown options={[{ value: 'newFirst', label: 'New First' },
                  { value: 'newFirst', label: 'New First' },
                  { value: 'highPrice', label: 'Highest price' },
                  { value: 'lowPrice', label: 'Lowest price' }]}
                          item={(item) => <div>{item?.label}</div>}
                />
              </div>
            </div>

            {(loading && total > 0) && <Loader/>}
            {total > 0 && <InfiniteScroll
              scrollableTarget={'task-search-map-list'}
              onScroll={(e) => console.log("onCscroll", e)}
              dataLength={tasks.length} //This is important field to render the next data
              next={handleScrollNext}
              hasMore={total > tasks.length}
              loader={<Loader/>}>

              {tasks.map(task => <Task task={task}/>)}
            </InfiniteScroll>}


          </div>
        </div>
        <div className={styles.map}>
          <Button className={styles.backButton} whiteRed uppercase onClick={props.onShowList}>Back</Button>
          <Map/>
        </div>
        </div>
      </div>
    </div>
  )
}
export default SearchTaskMapView
