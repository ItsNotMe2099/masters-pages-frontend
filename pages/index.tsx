import styles from './index.module.scss'
import Header from '../components/layout/Header'
import BannerSection from 'components/MainPage/BannerSection'
import Categories from 'components/Categories'
import Instruction from 'components/Instruction'
import Footer from 'components/layout/Footer'
import CommentsSection from 'components/CommentsSection'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header/>
      <BannerSection/>
      <Categories/>
      <Instruction/>
      <CommentsSection/>
      <Footer/>
    </div>
  )
}
