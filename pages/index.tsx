import styles from './index.module.scss'
import Header from '../components/layout/Header'
import BannerSection from '../components/MainPage/BannerSection'
import Categories from '../components/Categories'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header/>
      <BannerSection/>
      <Categories/>
    </div>
  )
}
