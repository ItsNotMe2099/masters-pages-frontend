import Map from 'components/Map'
import {
  fetchProfileSearchList, resetProfileSearchList, setPageProfileSearch, setRoleProfileSearch,
  setSortProfileSearch
} from 'components/ProfileSearch/actions'
import Button from 'components/ui/Button'
import Loader from 'components/ui/Loader'
import Profile from 'components/ui/Profile'
import { useRouter } from 'next/router'
import { default as React, useEffect, useState } from 'react'
import { IRootState } from 'types'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import Sticky from 'react-stickynode'
import { useTranslation } from 'next-i18next'
import {useWindowWidth} from '@react-hook/window-size'
import Layout from 'components/layout/Layout'
import Modals from 'components/layout/Modals'
import dynamic from 'next/dynamic'
const queryString = require('query-string')
const SearchProfileFilter = dynamic(() => import( 'components/SearchPage/Filter'), {
  ssr: false
})

interface Props {
  searchRole: 'master' | 'volunteer',
  onShowMap: () => void
}
const SearchProfileListView = (props: Props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation('common')
  const width = useWindowWidth()
  const loading = useSelector((state: IRootState) => state.profileSearch.listLoading)
  const sortType = useSelector((state: IRootState) => state.profileSearch.sortType)
  const filter = useSelector((state: IRootState) => state.profileSearch.filter)
  const tasks = useSelector((state: IRootState) => state.profileSearch.list)
  const total = useSelector((state: IRootState) => state.profileSearch.total)
  const page = useSelector((state: IRootState) => state.profileSearch.page)
  const role = useSelector((state: IRootState) => state.profile.role)
  const [isShow, setIsShow] = useState(width > 700)

  const getSearchPageLink = () => {
    switch (props.searchRole){
      case 'master':
        return 'SearchMasterPage'
      case 'volunteer':
        return 'SearchVolunteerPage'
      default:
        return 'SearchClientPage'
    }
  }
  useEffect(() => {
    dispatch(resetProfileSearchList())
    dispatch(setRoleProfileSearch(props.searchRole))
    dispatch(fetchProfileSearchList())
  }, [])


  const handleSortChange = (item) => {
    dispatch(setSortProfileSearch(item.value))
    dispatch(resetProfileSearchList())
    dispatch(fetchProfileSearchList())
    router.replace(`/${getSearchPageLink()}?${queryString.stringify({filter: JSON.stringify(filter), sortType: item.value})}`, undefined, { shallow: true })
  }
  const handleScrollNext = () => {
    dispatch(setPageProfileSearch(page + 1))
    dispatch(fetchProfileSearchList())
  }
  const handleRefresh = () => {

  }
  const getQueryFilter = () => {
    try {
      if((router.query as any).filter) {
        return JSON.parse((router.query as any).filter)
      }
    }catch (e) {

    }
    return {}
  }
  return (
    <Layout>
    <div className={`${styles.filters} ${role === 'client' && styles.filtersClient} ${role === 'volunteer' && styles.filtersVolunteer}`}>
      <div className={styles.form}>
        <SearchProfileFilter  collapsed={!isShow} initialValues={getQueryFilter()} searchRole={props.searchRole}/>
        <div className={styles.more} onClick={() => isShow ? setIsShow(false) : setIsShow(true)}>
          {isShow ? <span>{t('profileSearch.filter.hideMoreOptions')}</span> : <span>{t('profileSearch.filter.showMoreOptions')}</span>}
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
           {!loading && <div className={styles.tasksAmount}>{t(`profileSearch.${props.searchRole}`)}: <span>{total}</span></div>}
          {/*tasks.length > 0 && <div className={styles.tasksSort}>
            <span>{t('sort.title')}:</span>
            <DropDown onChange={handleSortChange} value={sortType} options={[
              {value: 'newFirst',  label: t('sort.newFirst')},
              {value: 'highPrice', label: t('sort.highestPrice')},
              {value: 'lowPrice', label: t('sort.lowestPrice')}]}
                      item={(item) => <div>{item?.label}</div>}
            />
          </div>*/}
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
    </div>
      <Modals/>
    </Layout>
  )
}
export default SearchProfileListView
