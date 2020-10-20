import { withAuthSync } from "utils/auth";
import styles from './index.module.scss'
import Header from '../components/layout/Header'
import BannerSection from 'components/MainPage/BannerSection'
import Categories from 'components/Categories'
import Instruction from 'components/Instruction'
import Footer from 'components/layout/Footer'
import Split from 'components/Split'

const Home = (props) => {
  return (
    <>
    <Header {...props}/>
    <div className={styles.container}>
      <BannerSection/>
      <Categories/>
      <Instruction/>
      <Split/>
      <Footer/>
    </div>
    </>
  )
}
export default withAuthSync(Home)
