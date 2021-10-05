import styles from 'pages/old/MainPage/index.module.scss'
import MainSectionFirst from 'pages/old/MainPage/components/MainSectionFirst'
import MainSectionSecond from 'pages/old/MainPage/components/MainSectionSecond'
import MainSectionThird from 'pages/old/MainPage/components/MainSectionThird'
import MainSectionHeader from 'pages/old/MainPage/components/Header'
import MainSectionFooter from 'pages/old/MainPage/components/Footer'
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
