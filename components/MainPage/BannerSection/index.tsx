import styles from './index.module.scss'
import Link from 'next/link'
import Button from 'components/ui/Button'

interface Props {}

export default function BannerSection(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.text__big}>Освободим вас от забот</div>
      <div className={styles.text__medium}>Найдите исполнителя под ваши задачи</div>
      <div className={styles.people}>
        <div className={styles.wrapper}>
          <img className={styles.man} src='img/MainPage/man.png' alt=''/>
          <img className={styles.woman} src='img/MainPage/woman.png' alt=''/>
        </div>
      </div>
      <form className={styles.input} action='/search'>
        <input className={styles.search}
          placeholder='Услуга или специалист'
          name="query"
          type='text'
        />
        <div className={styles.example}>Example: <Link href="/search?query=Looking for a pet doctor"><a>Looking for a pet doctor</a></Link></div>
        <Button largeInput>Заказать</Button>
      </form>
    </div>
  )
}
