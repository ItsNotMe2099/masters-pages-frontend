import styles from 'pages/corporate/index.module.scss'
import { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import {getAuthServerSide} from 'utils/auth'
import {setCookie} from 'nookies'
import {CookiesType, RegistrationMode} from 'types/enums'
import {addDays} from 'date-fns'
import Layout from 'components/layout/Layout'
import Modals from 'components/layout/Modals'
import { IOrganization } from 'data/intefaces/IOrganization'
import OrganizationRepository from 'data/repositories/OrganizationRepository'
import Organization from 'components/ui/Organization'

const FindCompaniesGuest = (props) => {

  const [isOpen, setIsOpen] = useState(true)
  const signUpCookie = cookie.get('signUpMobile')
  const [companies, setCompanies] = useState<IOrganization[]>([])
  useEffect(() => {
    setIsOpen((signUpCookie === 'no' || window.screen.availWidth > 600) ? false : true)
    OrganizationRepository.fetchOrganizationsList().then((data) => {
      if(data){
        setCompanies(data)
      }
      
    })
  }, [])


  return (
    <Layout>
      <>
        {companies.map(company => <Organization key={company.id} organization={company}/>)}
      </>
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
