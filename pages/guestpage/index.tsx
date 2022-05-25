import styles from 'pages/corporate/index.module.scss'
import { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import {getAuthServerSide} from 'utils/auth'
import {setCookie} from 'nookies'
import {CookiesType, RegistrationMode} from 'types/enums'
import {addDays} from 'date-fns'
import Layout from 'components/layout/Layout'
import Modals from 'components/layout/Modals'

const GuestPage = (props) => {

  const [isOpen, setIsOpen] = useState(true)
  const signUpCookie = cookie.get('signUpMobile')
  useEffect(() => {
    setIsOpen((signUpCookie === 'no' || window.screen.availWidth > 600) ? false : true)
  }, [])


  return (
    <Layout>
      <Modals/>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const res = await getAuthServerSide()(ctx as any)
  setCookie(ctx, CookiesType.registrationMode, RegistrationMode.User, {expires: addDays(new Date(), 5)})
  return {props: {...res.props}}

}
export default GuestPage
