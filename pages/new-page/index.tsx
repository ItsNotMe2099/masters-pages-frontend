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
import CaseStudies from 'components/for_pages/NewPage/CaseStudies'
import HowToUse from 'components/for_pages/NewPage/HowToUse'
import Top from 'components/for_pages/NewPage/Top'
import Header from 'components/for_pages/NewPage/Header'
import Image from 'next/image'

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
          <Header className={styles.header} />
          <div className={styles.first}>
            <Top />
            <div className={styles.wrapper}>
              <Image className={styles.abstraction1} src={'/img/New Page/abstraction1.png'} alt='' layout='fill' />
              <div className={styles.container}>
                <Why />
                <Explore />
              </div>
            </div>
          </div>
          <div className={styles.second}>
            <div className={styles.wrapper3}>
              <div className={styles.abstraction3}>
                <Image src={'/img/New Page/abstraction3.png'} alt='' layout='fill' />
              </div>
              <div className={styles.abstraction5}>
                <Image src={'/img/New Page/abstraction5.png'} alt='' layout='fill' />
              </div>
              <div className={styles.container}>
                <GreatJob />
                <CaseStudies />
              </div>
            </div>
          </div>
          <div className={styles.third}>
            <div className={styles.wrapper2}>
              <div className={styles.abstraction2}>
                <Image src={'/img/New Page/abstraction2.png'} alt='' layout='fill' />
              </div>
              <div className={styles.abstraction4}>
                <Image src={'/img/New Page/abstraction4.png'} alt='' layout='fill' />
              </div>
              <div className={styles.container}>
                <Subscribe />
                <HowToJoin />
                <DownloadAppNow />
                <HowToUse />
              </div>
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
