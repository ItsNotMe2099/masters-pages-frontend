import { getAuthServerSide } from 'utils/auth'
import { setCookie } from 'nookies'
import { CookiesType, RegistrationMode } from 'types/enums'
import { addDays } from 'date-fns'
import { useEffect, useState } from 'react'
import SignUpComponent from 'components/Auth/SignUp'
import Modals from 'components/layout/Modals'
import styles from './index.module.scss'
import cookie from 'js-cookie'
import Layout from 'components/for_pages/MainUserPage/Layout'
import Why from 'components/for_pages/NewPage/Why'
import Explore from 'components/for_pages/NewPage/Explore'
import Subscribe from 'components/for_pages/NewPage/Subscribe'
import HowToJoin from 'components/for_pages/NewPage/HowToJoin'
import DownloadAppNow from 'components/for_pages/NewPage/DownloadAppNow'
import GreatJob from 'components/for_pages/NewPage/GreatJob'

const NewPage = (props) => {

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
          <div className={styles.first}>
            <div className={styles.container}>
              <Why />
              <Explore />
            </div>
          </div>
          <div className={styles.second}>
            <div className={styles.container}>
              <GreatJob />
            </div>
          </div>
          <div className={styles.third}>
            <div className={styles.container}>
              <Subscribe />
              {/*<HowToJoin />*/}
              <DownloadAppNow />
            </div>
          </div>
        </Layout>
      </div>
      <Modals />
    </>
  )
}
export const getServerSideProps = async (ctx) => {
  const res = await getAuthServerSide()(ctx as any)

  if ((res as any).props.user) {
    ctx.res.writeHead(302, { Location: '/me' })
    ctx.res.end()
    return { props: { ...res.props } }
  }
  setCookie(ctx, CookiesType.registrationMode, RegistrationMode.User, { expires: addDays(new Date(), 5) })
  return { props: { ...res.props } }

}
export default NewPage
