import styles from 'pages/FindVolunteerGuest/index.module.scss'
import { useEffect, useState } from 'react'
import Layout from 'components/layout/Layout'
import { DropDown } from 'components/ui/DropDown'
import { useTranslation } from 'next-i18next'
import GuestFilter from 'components/for_pages/GuestPage/GuestFilter'
import Sticky from 'react-stickynode'
import Button from 'components/ui/Button'
import Map from 'components/Map'
import classNames from 'classnames'
import { getAuthServerSide } from 'utils/auth'
import { setCookie } from 'nookies'
import { CookiesType, RegistrationMode } from 'types/enums'
import {addDays} from 'date-fns'
import { useDispatch, useSelector} from 'react-redux'
import { signUpOpen } from 'components/Modal/actions'
import Loader from 'components/ui/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import Profile from 'components/ui/Profile'
import { fetchProfileSearchList, resetProfileSearchList, setPageProfileSearch, setRoleProfileSearch } from 'components/ProfileSearch/actions'
import { IRootState } from 'types'
import Modals from 'components/layout/Modals'

const FindVolunteerGuest = (props) => {

  //const [volunteers, setVolunteers] = useState<IProfile[]>([])
  const volunteers = useSelector((state: IRootState) => state.profileSearch.list)
  //const [loading, setLoading] = useState<boolean>(true)
  //const [total, setTotal] = useState<number>(0)
  const [sortType, setSortType] = useState<string | null>()
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  //const [page, setPage] = useState<number>(1)
  const total = useSelector((state: IRootState) => state.profileSearch.total)
  const page = useSelector((state: IRootState) => state.profileSearch.page)
  const loading = useSelector((state: IRootState) => state.profileSearch.listLoading)

  const fetchVolunteers = (page?: number) => {
    ProfileRepository.fetchProfiles(page).then(data => {
      if(data){
        //setVolunteers(data.data);
        //setTotal(data.total);
      }
    })
  }

  useEffect(() => {
    dispatch(resetProfileSearchList())
    dispatch(setRoleProfileSearch('volunteer'))
    dispatch(fetchProfileSearchList())
  }, [])

  const handleSortChange = (item) => {
    setSortType(item.value);
    //router.replace(`/ProjectSearchPage?${queryString.stringify({filter: JSON.stringify(filter), sortType: item.value})}`, undefined, { shallow: true })
  }

  const handleScrollNext = () => {
    dispatch(setPageProfileSearch(page + 1))
    dispatch(fetchProfileSearchList())
  }

  return (
    <Layout isGuest>
      <div className={styles.root}>

        <div className={styles.container}>
          <div className={styles.left}>
          <div className={styles.topContent}>
          <div className={styles.filters}>
          <GuestFilter state={isVisible} onClick={() => setIsVisible(isVisible ? false : true)}/>
      <div className={styles.projectsTobBar}>
           {!loading && <div className={styles.projectsAmount}>{t('menu.volunteers')}: <span>{total}</span></div>}
          {volunteers.length > 0 && <div className={styles.projectsSort}>
            <span>{t('sort.title')}:</span>
            <DropDown onChange={handleSortChange} value={sortType} options={[
              {value: 'newFirst',  label: t('sort.newFirst')},
              {value: 'highPrice', label: t('sort.highestPrice')},
              {value: 'lowPrice', label: t('sort.lowestPrice')}]}
                      item={(item) => <div>{item?.label}</div>}
            />
          </div>}
        </div>
        </div>
        <div className={styles.block}></div>
        </div>
        <div className={styles.content}>
          <div>
          {(loading && total === 0) && <Loader/>}
          {total > 0 &&  <InfiniteScroll
            scrollableTarget="scrollableDiv"
          dataLength={volunteers.length} //This is important field to render the next data
          next={handleScrollNext}
          hasMore={total > volunteers.length}
          loader={<Loader/>}
        >
          {volunteers.map(profile =>
              <Profile key={profile.id} profile={profile}/>
          )}
          </InfiniteScroll>}
          </div>
          <div className={classNames(styles.sidebar, {[styles.visible]: isVisible})}>
        <Sticky enabled={true} top={100} bottomBoundary={'#tasks-list'}>
          <div className={styles.sidebarWrapper}>
        <div className={styles.map}>
          <Map/>
        </div>
        <Button className={styles.showOnTheMap} fullWidth={true} white={true} largeFont={true} bold={true}  borderRed={true} size={'16px 20px'} onClick={() => dispatch(signUpOpen())}>{t('taskSearch.showOnTheMap')}</Button>
          </div>
        </Sticky>
      </div>
        </div>
          </div>
        </div>
      </div>
      <Modals/>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const res = await getAuthServerSide()(ctx as any)
  setCookie(ctx, CookiesType.registrationMode, RegistrationMode.User, {expires: addDays(new Date(), 5)})
  return {props: {...res.props}}

}

export default FindVolunteerGuest
