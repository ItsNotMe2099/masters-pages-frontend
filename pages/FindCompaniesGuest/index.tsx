import styles from 'pages/FindCompaniesGuest/index.module.scss'
import { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import {getAuthServerSide} from 'utils/auth'
import {setCookie} from 'nookies'
import {CookiesType, RegistrationMode} from 'types/enums'
import {addDays} from 'date-fns'
import Layout from 'components/layout/Layout'
import Modals from 'components/layout/Modals'
import { IOrganization } from 'data/intefaces/IOrganization'
import OrganizationRepository, { IOrganizationSearchRequest } from 'data/repositories/OrganizationRepository'
import Organization from 'components/ui/Organization'
import { useRouter } from 'next/router'
import { DropDown } from 'components/ui/DropDown'
import { useTranslation } from 'next-i18next'
import GuestFilter from 'components/for_pages/GuestPage/GuestFilter'

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
  const { t } = useTranslation('common')
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
      <GuestFilter/>
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
        {companies.map(company => <Organization key={company.id} organization={company}/>)}
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
