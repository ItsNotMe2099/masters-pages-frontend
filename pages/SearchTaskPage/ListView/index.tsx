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
import { default as React, useEffect, useState } from "react";
import {useTranslation, withTranslation} from "i18n";
import { IRootState } from "types";
import styles from './index.module.scss'
import Task from "components/Task";
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';
import Sticky from 'react-stickynode';
import ArrowDown from "components/svg/ArrowDown";
const queryString = require('query-string')
const SearchTaskFilter = dynamic(() => import(  "pages/SearchTaskPage/Filter"), {
  ssr: false
})
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'
import Layout from 'components/layout/Layout'
import Modals from 'components/layout/Modals'
import dynamic from 'next/dynamic'
interface Props {
  onShowMap: () => void
}
const SearchTaskListView = (props: Props) => {
  const width = useWindowWidth()
  const { t } = useTranslation('common');
  const dispatch = useDispatch()
  const router = useRouter();
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const loading = useSelector((state: IRootState) => state.taskSearch.listLoading)
  const sortType = useSelector((state: IRootState) => state.taskSearch.sortType)
  const filter = useSelector((state: IRootState) => state.taskSearch.filter)
  const tasks = useSelector((state: IRootState) => state.taskSearch.list)
  const total = useSelector((state: IRootState) => state.taskSearch.total)
  const page = useSelector((state: IRootState) => state.taskSearch.page)
  const role = useSelector((state: IRootState) => state.profile.role)
  const [isShow, setIsShow] = useState(width > 700)
  console.log("Fetch1112");
  useEffect(() => {
    console.log("Fetch111");
    dispatch(resetTaskSearchList());
    if(router.query.filter) {
      dispatch(setFilterTaskSearch(JSON.parse((router.query as any).filter)));
    }
    if(router.query.sortType) {
      dispatch(setSortTaskSearch((router.query as any).sortType));
    }
    dispatch(fetchTaskSearchList())
  }, [])


  const handleSortChange = (item) => {
    dispatch(setSortTaskSearch(item.value));
    dispatch(resetTaskSearchList())
    dispatch(fetchTaskSearchList())
    router.replace(`/SearchTaskPage?${queryString.stringify({filter: JSON.stringify(filter), sortType: item.value})}`, undefined, { shallow: true })
  }
  const handleScrollNext = () => {
    dispatch(setPageTaskSearch(page + 1))
    dispatch(fetchTaskSearchList())
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
    <Layout>
    <div className={`${styles.filters} ${role === 'client' && styles.filtersClient} ${role === 'volunteer' && styles.filtersVolunteer}`}>
      <div className={styles.form}>
        <SearchTaskFilter collapsed={!isShow} initialValues={getQueryFilter()}/>
        <div className={styles.more} onClick={() => isShow ? setIsShow(false) : setIsShow(true)}>
          {isShow ? <span>{t('taskSearch.filter.hideMoreOptions')}</span> : <span>{t('taskSearch.filter.showMoreOptions')}</span>}
          <img className={isShow ? styles.hide : null} src="/img/icons/arrowDownSrchTask.svg" alt=""/>
        </div>
      </div>
    </div>
    <div className={styles.container}>
      <div className={styles.tasksContainer}>
        <Button className={styles.showOnTheMap} fullWidth={true} white={true} largeFont={true} bold={true}  borderRed={true} size={'16px 20px'} onClick={props.onShowMap}>{t('taskSearch.showOnTheMap')}</Button>

        <div className={styles.sidebar}>
        <Sticky enabled={true} top={100} bottomBoundary={'#tasks-list'}>
          <div className={styles.sidebarWrapper}>
        <div className={styles.map}>
          <Map/>
        </div>
        <Button className={styles.showOnTheMap} fullWidth={true} white={true} largeFont={true} bold={true}  borderRed={true} size={'16px 20px'} onClick={props.onShowMap}>{t('taskSearch.showOnTheMap')}</Button>
            {/*<div className={styles.filter}>
          <div className={styles.filterLabel}>Key words</div>
          <Input input={{value: null, onChange: () => {}}}/>
        </div>*/}
          </div>
        </Sticky>
      </div>
      <div className={styles.tasks} id={'tasks-list'}>
         <div className={styles.tasksTobBar}>
           {!loading && <div className={styles.tasksAmount}>{t('taskSearch.tasks')}: <span>{total}</span></div>}
          {tasks.length > 0 && <div className={styles.tasksSort}>
            <span>{t('sort.title')}:</span>
            <DropDown onChange={handleSortChange} value={sortType} options={[
              {value: 'newFirst',  label: t('sort.newFirst')},
              {value: 'highPrice', label: t('sort.highestPrice')},
              {value: 'lowPrice', label: t('sort.lowestPrice')}]}
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

    </div>
    <Modals/>
    </Layout>
  )
}
export default SearchTaskListView
