import { getAuthServerSide } from 'utils/auth'
import { setCookie } from 'nookies'
import { CookiesType, RegistrationMode } from 'types/enums'
import { addDays } from 'date-fns'
import { useEffect, useState } from 'react'
import SignUpComponent from 'components/Auth/SignUp'
import MainSectionHeader from 'components/for_pages/MainUserPage/Header'
//import MainSectionFirst from 'components/for_pages/MainUserPage/MainSectionFirst'
//import MainSectionSecond from 'components/for_pages/MainUserPage/MainSectionSecond'
//import MainSectionThird from 'components/for_pages/MainUserPage/MainSectionThird'
//import MainSectionFourth from 'components/for_pages/MainUserPage/MainSectionFourth'
import MainSectionFooter from 'components/for_pages/MainUserPage/Footer'
import Modals from 'components/layout/Modals'
import styles from './index.module.scss'
import cookie from 'js-cookie'
import AboutUs from 'components/for_pages/MainUserPage/AboutUs'
import Greetings from 'components/for_pages/MainUserPage/Greetings'
import Layout from 'components/for_pages/MainUserPage/Layout'
import Item from 'components/for_pages/MainUserPage/Greetings/Item'
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
        <Layout>
          {/*<MainSectionFirst/>
        <MainSectionSecond/>
        <MainSectionThird/>
  <MainSectionFourth/>*/}
          <Greetings title='Greetings, dear guest. Please select your identity 👋'>
            <div className={styles.options}>
              <Item
                textClass={styles.text}
                link='/self-employed'
                color='#EB5757'
                text='Self-employed and clients'
                image='/img/MainPage/people-red.png'
                light='/img/MainPage/red.png'
              />
              <Item
                link='/volunteering'
                color='#EEBA1A'
                text='Volunteering organizations and volunteers'
                image='/img/MainPage/people-yellow.png'
                light='/img/MainPage/yellow.png'
              />
              <Item
                link='/clubs'
                textClass={styles.text}
                color='#00CDC1'
                text='Clubs and club members'
                image='/img/MainPage/people-green.png'
                light='/img/MainPage/green.png'
              />
            </div>
          </Greetings>
          <AboutUs title='About us 👋'>
            <div className={styles.textAbout}>
              <h3>Our Mission</h3>
              At Masterspages, we harness the power of social media technologies on the internet to create seamless solutions for two distinct communities:

              <h3>Volunteering Organizations and Volunteers:</h3>
              We are committed to helping volunteering organizations and volunteers efficiently manage their projects, enabling them to make a maximum impact through their selfless contributions. With convenience and ease, our platform empowers these changemakers to achieve their goals and create positive change in their communities.

              <h3>Self-employed Professionals and Their Clients:</h3>
              For self-employed professionals and their clients, Masterspages provides a reliable platform to manage dealings and reputations. By facilitating transparent and streamlined processes, we strengthen trust between professionals and clients, fostering long-lasting relationships built on integrity.

              <h3>Legal Status</h3>
              Masterspages is a Canadian internet startup. Although we are not yet incorporated into a legal entity, our dedication to excellence remains unwavering.

              <h3>Team and Founder</h3>
              Our founder, investor, and CEO, Konstantin Markov, leads the way with a passion for transforming the digital landscape. Based in Richmond Hill, ON, Canada, Konstantin's vision drives our mission to empower and connect communities worldwide.

              Our diverse team comprises talented software engineers hailing from CIS countries, scattered across the globe, from Canada to Bulgaria and Ukraine, to Indonesia and Pakistan. Together, we bring together a wealth of expertise to shape the future of Masterspages.

              <h3>IT Infrastructure</h3>

              To ensure reliable and efficient services, we have partnered with leading IT infrastructure providers:
              Hetzner for robust servers
              Amazon for secure data centers
              Hubspot for cutting-edge marketing solutions
              Twilio for SMS and email confirmations
              Google for integrated mapping services

              <h3>Domains</h3>
              Our presence is reflected through the domains:
              Masterspages.com
              Masterspages.ca

              <h3>Contact Information</h3>
              For all inquiries, don't hesitate to get in touch with us:
              email: jd@masterspages.com or admin@masterspages.com

              Thank you for being part of our journey towards making a meaningful impact in the digital realm. Together, let's build a future where connection, efficiency, and positive change thrive.
              Welcome to Masterspages!
            </div>
          </AboutUs>
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
export default Home
