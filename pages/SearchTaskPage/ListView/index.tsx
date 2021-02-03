import Map from "components/Map";
import {
  fetchTaskSearchList,
  fetchTaskSearchListRequest, resetTaskSearchList,
  setFilterTaskSearch, setPageTaskSearch,
  setSortTaskSearch
} from "components/TaskSearch/actions";
import TaskShareModal from "components/TaskShareModal";
import Button from "components/ui/Button";
import { DropDown } from "components/ui/DropDown";
import Input from "components/ui/Inputs/Input";
import Loader from "components/ui/Loader";
import { useRouter } from "next/router";
import SearchTaskFilter from "pages/SearchTaskPage/Filter";
import { default as React, useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { IRootState } from "types";
import { withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Task from "components/Task";
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';
import Sticky from 'react-stickynode';
import ArrowDown from "components/svg/ArrowDown";
const queryString = require('query-string')
interface Props {
  onShowMap: () => void
}
const SearchTaskListView = (props: Props) => {
  const dispatch = useDispatch()
  const router = useRouter();
  const loading = useSelector((state: IRootState) => state.taskSearch.listLoading)
  const sortType = useSelector((state: IRootState) => state.taskSearch.sortType)
  const filter = useSelector((state: IRootState) => state.taskSearch.filter)
  const tasks = useSelector((state: IRootState) => state.taskSearch.list)
  const total = useSelector((state: IRootState) => state.taskSearch.total)
  const page = useSelector((state: IRootState) => state.taskSearch.page)
  const role = useSelector((state: IRootState) => state.profile.role)
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    console.log('fetch search')
    if(router.query.filter) {
      console.log("Set filter", JSON.parse((router.query as any).filter))
      dispatch(setFilterTaskSearch(JSON.parse((router.query as any).filter)));
    }
    if(router.query.sortType) {
      dispatch(setSortTaskSearch((router.query as any).sortType));
    }
    dispatch(fetchTaskSearchList())
  }, [])


  const handleSortChange = (item) => {
    console.log("ChangeSort", item)
    dispatch(setSortTaskSearch(item.value));
    dispatch(resetTaskSearchList())
    dispatch(fetchTaskSearchList())
    router.replace(`/SearchTaskPage?${queryString.stringify({filter: JSON.stringify(filter), sortType: item.value})}`, undefined, { shallow: true })
  }
  const handleScrollNext = () => {
    console.log("HandleNext", page)
    dispatch(setPageTaskSearch(page + 1))
    dispatch(fetchTaskSearchList())
  }
  const handleRefresh = () => {

  }
  const getQueryFilter = () => {
    try {
      if((router.query as any).filter) {
        console.log("Filter", JSON.parse((router.query as any).filter))
        return JSON.parse((router.query as any).filter);
      }
    }catch (e) {

    }
    return {}
  }
  return (
    <>
    <Header {...props}/>
    <div className={`${styles.filters} ${role === 'client' && styles.filtersClient} ${role === 'volunteer' && styles.filtersVolunteer}`}>
      <div className={styles.form}>
        <SearchTaskFilter initialValues={getQueryFilter()}/>
      </div>
      <div className={styles.form__mobile}>
        {isShow ?
        <SearchTaskFilter initialValues={getQueryFilter()}/>
        :
        <SearchTaskFilter collapsed initialValues={getQueryFilter()}/>}
        <a onClick={() => isShow ? setIsShow(false) : setIsShow(true)}>
          <div>{isShow ? <span>Hide</span> : <span>Show more options</span>}<img className={isShow ? styles.hide : null} src="/img/icons/arrowDownSrchTask.svg" alt=""/></div>
        </a>
      </div>
    </div>
    <div className={styles.container}>
      <div className={styles.tasksContainer}>
      <div className={styles.sidebar}>
        <Sticky enabled={true} top={100} bottomBoundary={'#tasks-list'}>
          <div className={styles.sidebarWrapper}>
        <div className={styles.map}>
          <Map/>
        </div>
        <Button className={styles.showOnTheMap} fullWidth={true} white={true} largeFont={true} bold={true}  borderRed={true} size={'16px 20px'} onClick={props.onShowMap}>Show on the map</Button>
        <div className={styles.filter}>
          <div className={styles.filterLabel}>Key words</div>
          <Input input={{value: null, onChange: () => {}}}/>
        </div>
          </div>
        </Sticky>
      </div>
      <div className={styles.tasks} id={'tasks-list'}>
         <div className={styles.tasksTobBar}>
           {!loading && <div className={styles.tasksAmount}>Tasks: <span>{total}</span></div>}
          {tasks.length > 0 && <div className={styles.tasksSort}>
            <span>Sort by:</span>
            <DropDown onChange={handleSortChange} value={sortType} options={[
              {value: 'newFirst',  label: 'New First'},
              {value: 'highPrice', label: 'Highest price'},
              {value: 'lowPrice', label: 'Lowest price'}]}
                      item={(item) => <div>{item?.label}</div>}
            />
          </div>}
        </div>
        {(loading && total === 0) && <Loader/>}
        {total > 0 && <InfiniteScroll
          dataLength={tasks.length} //This is important field to render the next data
          next={handleScrollNext}
          hasMore={total > tasks.length}
          loader={<Loader/>}
        >
          {tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
        </InfiniteScroll>}
      </div>
      </div>
      <Footer/>
    </div>

    </>
  )
}
export default SearchTaskListView
