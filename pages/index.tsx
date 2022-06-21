import {getAuthServerSide} from 'utils/auth'
import {setCookie} from 'nookies'
import {CookiesType, RegistrationMode} from 'types/enums'
import { addDays} from 'date-fns'
import {useEffect, useState} from 'react'
import SignUpComponent from 'components/Auth/SignUp'
import MainSectionHeader from 'components/for_pages/MainUserPage/Header'
import MainSectionFirst from 'components/for_pages/MainUserPage/MainSectionFirst'
import MainSectionSecond from 'components/for_pages/MainUserPage/MainSectionSecond'
import MainSectionThird from 'components/for_pages/MainUserPage/MainSectionThird'
import MainSectionFourth from 'components/for_pages/MainUserPage/MainSectionFourth'
import MainSectionFooter from 'components/for_pages/MainUserPage/Footer'
import Modals from 'components/layout/Modals'
import styles from './index.module.scss'
import cookie from 'js-cookie'
const Home = (props) => {

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
        <MainSectionHeader/>
        <MainSectionFirst/>
        <MainSectionSecond/>
        <MainSectionThird/>
        <MainSectionFourth/>
        <MainSectionFooter/>
      </div>
      <Modals/>
    </>
  )
}
export const getServerSideProps = async (ctx) => {
  const res = await getAuthServerSide()(ctx as any)

  if((res as any).props.user){
    ctx.res.writeHead(302, { Location: '/me' })
    ctx.res.end()
    return {props: {...res.props}}
  }
  setCookie(ctx, CookiesType.registrationMode, RegistrationMode.User, {expires: addDays(new Date(), 5)})
  return {props: {...res.props}}

}
export default Home
