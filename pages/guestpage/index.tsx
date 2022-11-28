import styles from 'pages/guestpage/index.module.scss'
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
    <Layout isGuest>
      <div className={styles.welcome}>
        <div className={styles.container}>
          <div className={styles.triangle}></div>
          <div className={styles.image}><img src='/img/GuestPage/welcome.svg' alt=''/></div>
          <div className={styles.text}>"Welcome! Please, use left hand menu to navigate."</div>
          <div className={styles.textMobile}>"Welcome! Please, use top menu icon to navigate."</div>
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
export default GuestPage
