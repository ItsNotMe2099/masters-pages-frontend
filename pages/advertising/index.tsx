import styles from 'pages/organization/index.module.scss'
import MainSectionFirst from 'components/for_pages/MainUserPage/MainSectionFirst'
import MainSectionSecond from 'components/for_pages/MainUserPage/MainSectionSecond'
import MainSectionThird from 'components/for_pages/MainUserPage/MainSectionThird'
import MainSectionFourth from 'components/for_pages/MainUserPage/MainSectionFourth'
import MainSectionHeader from 'components/for_pages/Corporate/Header'
import MainSectionFooter from 'components/for_pages/Corporate/Footer'
import Modals from 'components/layout/Modals'
import SignUpComponent from 'components/Auth/SignUp'
import { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import { getAuthServerSide } from 'utils/auth'
import { setCookie } from 'nookies'
import { CookiesType, RegistrationMode } from 'types/enums'
import { addDays } from 'date-fns'
import Layout from 'components/for_pages/MainUserPage/Layout'

const NewMain = (props) => {

  const [isOpen, setIsOpen] = useState(true)
  const signUpCookie = cookie.get('signUpMobile')
  useEffect(() => {
    setIsOpen((signUpCookie === 'no' || window.screen.availWidth > 600) ? false : true)
  }, [])

  const handleAbout = () => {
    cookie.set('signUpMobile', 'no', { expires: 365 * 3 })
    setIsOpen(false)
  }

  return (
    <>
      <div className={styles.root}>
        <SignUpComponent
          isOpen={isOpen}
          showAbout
          onClick={handleAbout}
        />
        <Layout>
          <MainSectionFirst />
          <MainSectionSecond />
          <MainSectionThird />
          <MainSectionFourth />
        </Layout>
      </div>
      <Modals />
    </>
  )
}

export default NewMain
export const getServerSideProps = async (ctx) => {
  const res = await getAuthServerSide()(ctx as any)
  setCookie(ctx, CookiesType.registrationMode, RegistrationMode.Corporate, { expires: addDays(new Date(), 5) })
  return { props: { ...res.props } }

}
