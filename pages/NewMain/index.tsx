import {getAuthServerSide} from "utils/auth";
import styles from 'pages/NewMain/index.module.scss'
import MainSectionFirst from 'pages/NewMain/components/MainSectionFirst'
import MainSectionSecond from 'pages/NewMain/components/MainSectionSecond'
import MainSectionThird from 'pages/NewMain/components/MainSectionThird'
import MainSectionHeader from 'pages/NewMain/components/Header'
import MainSectionFooter from 'pages/NewMain/components/Footer'
import Modals from 'components/layout/Modals'
import Head from 'next/head'
import MainSectionFourth from "./components/MainSectionFourth";
import SignUpComponent from "components/Auth/SignUp";
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from "types";
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
    <div className={styles.mobile}>
      <SignUpComponent
        isOpen={isOpen}
        showAbout
        onClick={handleAbout}
        aboutNotALink
      />
    </div>
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
