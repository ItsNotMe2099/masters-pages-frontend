import styles from 'pages/FindCompaniesGuest/index.module.scss'
import { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import Layout from 'components/layout/Layout'
import Modals from 'components/layout/Modals'
import { IOrganization } from 'data/intefaces/IOrganization'
import OrganizationRepository, { IOrganizationSearchRequest } from 'data/repositories/OrganizationRepository'
import Organization from 'components/ui/Organization'
import { useRouter } from 'next/router'
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
import { useDispatch } from 'react-redux'
import { signUpOpen } from 'components/Modal/actions'
import Loader from 'components/ui/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import InputSearch from 'components/ui/Inputs/InputSearch'

const queryString = require('query-string')

const FindCompaniesGuest = (props) => {

  const [isOpen, setIsOpen] = useState(true)
  const signUpCookie = cookie.get('signUpMobile')
  const [companies, setCompanies] = useState<IOrganization[]>([])
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [total, setTotal] = useState<number>(0)
  const [sortType, setSortType] = useState<string | null>()
  const [filter, setFilter] = useState<IOrganizationSearchRequest>({})
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const [page, setPage] = useState<number>(1)
  const currentQuery = queryString.parse(router.asPath.split('?').pop())
  const [query, setQuery] = useState('')

  useEffect(() => {
    setIsOpen((signUpCookie === 'no' || window.screen.availWidth > 600) ? false : true)
    OrganizationRepository.search().then((data) => {
      if(data){
        if (query === '' || !query) {
          OrganizationRepository.search().then((data) => {
            if(data){
              setCompanies(data.data)
              setLoading(false)
              setTotal(data.total)
            }
            
          })
        } else {
          //returns filtered array
          OrganizationRepository.search().then((data) => {
            if(data){
              setCompanies(data.data.filter(item => item.name.toLowerCase().includes(query.toLowerCase())))
              setLoading(false)
              setTotal(data.total)
            }        
          })
        }
      }
      
    })
  }, [])

  const handleSortChange = (item) => {
    setSortType(item.value);
    //router.replace(`/ProjectSearchPage?${queryString.stringify({filter: JSON.stringify(filter), sortType: item.value})}`, undefined, { shallow: true })
  }

  const handleScrollNext = async () => {
    setPage(page + 1);
    const res = await OrganizationRepository.search(filter, page + 1)
    setCompanies(companies => [...companies, ...res.data])
  }

  const handleSearch = () => {
    
  }

  const handleChange = async (e) => {
    await setQuery(e.currentTarget.value)
    if (query === '' || !query) {
      OrganizationRepository.search().then((data) => {
        if(data){
          setCompanies(data.data)
          setLoading(false)
          setTotal(data.total)
        }
        
      })
    } else {
      //returns filtered array
      OrganizationRepository.search().then((data) => {
        if(data){
          setCompanies(data.data.filter(item => item.name.toLowerCase().includes(query.toLowerCase())))
          setLoading(false)
          setTotal(data.total)
        }        
      })
    }
  }

  console.log('QUERY', currentQuery)
  console.log('SETTED', query)


  return (
    <Layout>
      <div className={styles.root}>
 
        <div className={styles.container}>
          <div className={styles.left}>
          <div className={styles.topContent}>
          <div className={styles.filters}>
          <GuestFilter 
          search={() => <InputSearch searchValue={query} onChange={handleChange} onClick={handleSearch}/>}
          state={isVisible} 
          onClick={() => setIsVisible(isVisible ? false : true)} filter='companies'
          />
      <div className={styles.projectsTobBar}>
           {!loading && <div className={styles.projectsAmount}>{t('taskSearch.companies')}: <span>{total}</span></div>}
          {companies.length > 0 && <div className={styles.projectsSort}>
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
          {total > 0 && <InfiniteScroll
          dataLength={companies.length} //This is important field to render the next data
          next={handleScrollNext}
          hasMore={total > companies.length}
          loader={<Loader/>}
        >
          {companies.map(company => 
              <Organization className={styles.organization} key={company.id} organization={company}/>
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

export default FindCompaniesGuest
