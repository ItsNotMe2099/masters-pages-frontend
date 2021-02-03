import Map from "components/Map";
import {
  fetchProfileSearchList,
  fetchProfileSearchListRequest, resetProfileSearchList,
  setFilterProfileSearch, setPageProfileSearch, setRoleProfileSearch,
  setSortProfileSearch
} from "components/ProfileSearch/actions";
import SearchProfileFilter from "components/SearchPage/Filter";
import TaskShareModal from "components/TaskShareModal";
import Button from "components/ui/Button";
import { DropDown } from "components/ui/DropDown";
import Input from "components/ui/Inputs/Input";
import Loader from "components/ui/Loader";
import Profile from "components/ui/Profile";
import { useRouter } from "next/router";
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
const queryString = require('query-string')
interface Props {
  searchRole: 'master' | 'volunteer',
  onShowMap: () => void
}
const SearchProfileListView = (props: Props) => {
  const dispatch = useDispatch()
  const router = useRouter();
  const loading = useSelector((state: IRootState) => state.profileSearch.listLoading)
  const sortType = useSelector((state: IRootState) => state.profileSearch.sortType)
  const filter = useSelector((state: IRootState) => state.profileSearch.filter)
  const tasks = useSelector((state: IRootState) => state.profileSearch.list)
  const total = useSelector((state: IRootState) => state.profileSearch.total)
  const page = useSelector((state: IRootState) => state.profileSearch.page)
  const role = useSelector((state: IRootState) => state.profile.role)
  const [isShow, setIsShow] = useState(false)

  console.log("Tasks", tasks);
  useEffect(() => {
    console.log('fetch search')
    dispatch(resetProfileSearchList())
    dispatch(setRoleProfileSearch(props.searchRole))
    dispatch(fetchProfileSearchList())
  }, [])


  const handleSortChange = (item) => {
    console.log("ChangeSort", item)
    dispatch(setSortProfileSearch(item.value));
    dispatch(resetProfileSearchList())
    dispatch(fetchProfileSearchList())
    router.replace(`/Search${props.searchRole === 'master' ? 'Master' : 'Volunteer'}Page?${queryString.stringify({filter: JSON.stringify(filter), sortType: item.value})}`, undefined, { shallow: true })
  }
  const handleScrollNext = () => {
    console.log("HandleNext", page)
    dispatch(setPageProfileSearch(page + 1))
    dispatch(fetchProfileSearchList())
  }
  const handleRefresh = () => {

  }
  const getQueryFilter = () => {
    try {
      if((router.query as any).filter) {
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
        <SearchProfileFilter  searchRole={props.searchRole} initialValues={getQueryFilter()}/>
      </div>
      <div className={styles.form__mobile}>
        {isShow ?
        <SearchProfileFilter initialValues={getQueryFilter()}/>
        :
        <SearchProfileFilter collapsed initialValues={getQueryFilter()}/>}
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
           {!loading && <div className={styles.tasksAmount}>{props.searchRole === 'master' ? 'Masters' : 'Volunteers'}: <span>{total}</span></div>}
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
        {(loading && total > 0) && <Loader/>}
        {total > 0 && <InfiniteScroll
          dataLength={tasks.length} //This is important field to render the next data
          next={handleScrollNext}
          hasMore={total > tasks.length}
          loader={<Loader/>}>
          {tasks.map(profile => <Profile key={profile.id} profile={profile} selectedSubCategoryId={filter.subCategoryId} selectedCategoryId={filter.categoryId}/>)}
        </InfiniteScroll>}
      </div>
      </div>
      <Footer/>
    </div>
    </>
  )
}
export default SearchProfileListView
