import { getAuthServerSide } from 'utils/auth'
import { setCookie } from 'nookies'
import { CookiesType, RegistrationMode } from 'types/enums'
import { addDays } from 'date-fns'
import { useEffect, useState } from 'react'
import SignUpComponent from 'components/Auth/SignUp'
import MainSectionHeader from 'components/for_pages/MainUserPage/Header'
import MainSectionFooter from 'components/for_pages/MainUserPage/Footer'
import Modals from 'components/layout/Modals'
import styles from './index.module.scss'
import cookie from 'js-cookie'
import Instagram from 'components/svg/Instagram'
import Facebook from 'components/svg/Facebook'
import { CONTACTS } from 'types'
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
        <MainSectionHeader />
        <div className={styles.wrapper}>
          <h1>About Masterspages</h1>

          <h1>Our Mission</h1>
          At Masterspages, we harness the power of social media technologies on the internet to create seamless solutions for two distinct communities:

          <h1>Volunteering Organizations and Volunteers:</h1>
          We are committed to helping volunteering organizations and volunteers efficiently manage their projects, enabling them to make a maximum impact through their selfless contributions. With convenience and ease, our platform empowers these changemakers to achieve their goals and create positive change in their communities.

          <h1>Self-employed Professionals and Their Clients:</h1>
          For self-employed professionals and their clients, Masterspages provides a reliable platform to manage dealings and reputations. By facilitating transparent and streamlined processes, we strengthen trust between professionals and clients, fostering long-lasting relationships built on integrity.

          <h1>Legal Status</h1>
          Masterspages is a Canadian internet startup. Although we are not yet incorporated into a legal entity, our dedication to excellence remains unwavering.

          <h1>Team and Founder</h1>
          Our founder, investor, and CEO, Konstantin Markov, leads the way with a passion for transforming the digital landscape. Based in Richmond Hill, ON, Canada, Konstantin's vision drives our mission to empower and connect communities worldwide.

          Our diverse team comprises talented software engineers hailing from CIS countries, scattered across the globe, from Canada to Bulgaria and Ukraine, to Indonesia and Pakistan. Together, we bring together a wealth of expertise to shape the future of Masterspages.

          <h1>IT Infrastructure</h1>

          To ensure reliable and efficient services, we have partnered with leading IT infrastructure providers:
          Hetzner for robust servers
          Amazon for secure data centers
          Hubspot for cutting-edge marketing solutions
          Twilio for SMS and email confirmations
          Google for integrated mapping services

          <h1>Domains</h1>
          Our presence is reflected through the domains:
          Masterspages.com
          Masterspages.ca

          <h1>Contact Information</h1>
          For all inquiries, don't hesitate to get in touch with us:
          email: jd@masterspages.com or admin@masterspages.com

          Thank you for being part of our journey towards making a meaningful impact in the digital realm. Together, let's build a future where connection, efficiency, and positive change thrive.
          Welcome to Masterspages!

          <h1>Our social networks</h1>
          <div className={styles.socials}>
            <a className={styles.socialItem} href={CONTACTS.instagram}><Instagram color='black' /></a>
            <a className={styles.socialItem} href={CONTACTS.facebook}><Facebook color='black' /></a>
          </div>
        </div>
        <MainSectionFooter />
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
export default Home
