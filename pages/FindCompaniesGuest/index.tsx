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
  useEffect(() => {
    setIsOpen((signUpCookie === 'no' || window.screen.availWidth > 600) ? false : true)
    OrganizationRepository.fetchOrganizationsList().then((data) => {
      if(data){
        setCompanies(data)
        setLoading(false)
        setTotal(data.length)
      }
      
    })
  }, [])

  const handleSortChange = (item) => {
    setSortType(item.value);
    router.replace(`/ProjectSearchPage?${queryString.stringify({filter: JSON.stringify(filter), sortType: item.value})}`, undefined, { shallow: true })
  }


  return (
    <Layout>
      <div className={styles.root}>
 
        <div className={styles.container}>
          <div className={styles.left}>
          <div className={styles.topContent}>
          <div className={styles.filters}>
          <GuestFilter state={isVisible} onClick={() => setIsVisible(isVisible ? false : true)}/>
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
          {companies.map(company => <Organization className={styles.organization} key={company.id} organization={company}/>)}
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
