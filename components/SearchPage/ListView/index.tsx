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
import { IRootState } from "types";
import styles from './index.module.scss'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';
import Sticky from 'react-stickynode';
import SearchTaskFilter from "../../../pages/SearchTaskPage/Filter";
import {useTranslation} from "react-i18next";
import {useWindowWidth} from "@react-hook/window-size";
import Layout from 'components/layout/Layout'
const queryString = require('query-string')
interface Props {
  searchRole: 'master' | 'volunteer',
  onShowMap: () => void
}
const SearchProfileListView = (props: Props) => {
  const dispatch = useDispatch()
  const router = useRouter();
  const { t } = useTranslation('common');
  const width = useWindowWidth()
  const loading = useSelector((state: IRootState) => state.profileSearch.listLoading)
  const sortType = useSelector((state: IRootState) => state.profileSearch.sortType)
  const filter = useSelector((state: IRootState) => state.profileSearch.filter)
  const tasks = useSelector((state: IRootState) => state.profileSearch.list)
  const total = useSelector((state: IRootState) => state.profileSearch.total)
  const page = useSelector((state: IRootState) => state.profileSearch.page)
  const role = useSelector((state: IRootState) => state.profile.role)
  const [isShow, setIsShow] = useState(width > 700)

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
    <Layout>
    <div className={`${styles.filters} ${role === 'client' && styles.filtersClient} ${role === 'volunteer' && styles.filtersVolunteer}`}>
      <div className={styles.form}>
        <SearchTaskFilter collapsed={!isShow} initialValues={getQueryFilter()}/>
        <div className={styles.more} onClick={() => isShow ? setIsShow(false) : setIsShow(true)}>
          {isShow ? <span>{t('profileSearch.filter.hideMoreOptions')}</span> : <span>{t('profileSearch.filter.showMoreOptions')}</span>}
          <img className={isShow ? styles.hide : null} src="/img/icons/arrowDownSrchTask.svg" alt=""/>
        </div>
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
        <Button className={styles.showOnTheMap} fullWidth={true} white={true} largeFont={true} bold={true}  borderRed={true} size={'16px 20px'} onClick={props.onShowMap}>{t('profileSearch.showOnTheMap')}</Button>
            {/*<div className={styles.filter}>
          <div className={styles.filterLabel}>Key words</div>
          <Input input={{value: null, onChange: () => {}}}/>
        </div>*/}
          </div>
        </Sticky>
      </div>
      <div className={styles.tasks} id={'tasks-list'}>
         <div className={styles.tasksTobBar}>
           {!loading && <div className={styles.tasksAmount}>{props.searchRole === 'master' ? t('profileSearch.masters') : t('profileSearch.volunteers') }: <span>{total}</span></div>}
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
    </Layout>
  )
}
export default SearchProfileListView
