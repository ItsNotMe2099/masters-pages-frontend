import styles from './index.module.scss'
import Header from '../components/layout/Header'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header/>
    </div>
  )
}
