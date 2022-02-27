import styles from 'pages/corporate/index.module.scss'
import MainSectionFirst from 'components/for_pages/Corporate/MainSectionFirst'
import MainSectionSecond from 'components/for_pages/Corporate/MainSectionSecond'
import MainSectionThird from 'components/for_pages/Corporate/MainSectionThird'
import MainSectionHeader from 'components/for_pages/Corporate/Header'
import MainSectionFooter from 'components/for_pages/Corporate/Footer'
import Modals from 'components/layout/Modals'
import MainSectionFourth from 'components/for_pages/Corporate/MainSectionFourth'
import SignUpComponent from 'components/Auth/SignUp'
import { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import {getAuthServerSide} from 'utils/auth'
import {setCookie} from 'nookies'
import {CookiesType, RegistrationMode} from 'types/enums'
import {addDays} from 'date-fns'

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
  setCookie(ctx, CookiesType.registrationMode, RegistrationMode.Corporate, {expires: addDays(new Date(), 5)})
  return {props: {...res.props}}

}
export default NewMain
