import styles from 'pages/NewMainVolunteer/index.module.scss'
import MainSectionFirst from 'pages/NewMainVolunteer/components/MainSectionFirst'
import MainSectionSecond from 'pages/NewMainVolunteer/components/MainSectionSecond'
import MainSectionThird from 'pages/NewMainVolunteer/components/MainSectionThird'
import MainSectionHeader from 'pages/NewMainVolunteer/components/Header'
import MainSectionFooter from 'pages/NewMainVolunteer/components/Footer'
import Modals from 'components/layout/Modals'
import MainSectionFourth from "./components/MainSectionFourth";
import SignUpComponent from "components/Auth/SignUp";
import { useEffect, useState } from "react";
import cookie from 'js-cookie'

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

export default NewMain
