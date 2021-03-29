import {getAuthServerSide} from "utils/auth";
import styles from 'pages/NewMain/index.module.scss'
import MainSectionFirst from 'pages/NewMain/components/MainSectionFirst'
import MainSectionSecond from 'pages/NewMain/components/MainSectionSecond'
import MainSectionThird from 'pages/NewMain/components/MainSectionThird'
import MainSectionHeader from 'pages/NewMain/components/Header'
import MainSectionFooter from 'pages/NewMain/components/Footer'
import Modals from 'components/layout/Modals'

const NewMain = (props) => {
  return (
    <>
    <div className={styles.root}>
      <MainSectionHeader/>
      <MainSectionFirst/>
      <MainSectionSecond/>
      <MainSectionThird/>
      <MainSectionFooter/>
    </div>
      <Modals/>
</>
  )
}

export default NewMain
