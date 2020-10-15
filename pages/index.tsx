import styles from './index.module.scss'
import Header from '../components/layout/Header'
import BannerSection from 'components/MainPage/BannerSection'
import Categories from 'components/Categories'
import Instruction from 'components/Instruction'
import Footer from 'components/layout/Footer'
import Split from 'components/Split'
import SignInComponent from 'components/Auth/SignIn'

export default function Home() {
  return (
    <>
    <Header/>
    <div className={styles.container}>
      <BannerSection/>
      <Categories/>
      <Instruction/>
      <Split/>
      <SignInComponent/>
      <Footer/>
    </div>
    </>
  )
}
