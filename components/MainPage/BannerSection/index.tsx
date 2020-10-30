import styles from './index.module.scss'
import Link from 'next/link'
import Button from 'components/ui/Button'

interface Props {
}

export default function BannerSection(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.title}>Освободим вас от забот</div>
          <div className={styles.description}>Найдите исполнителя под ваши задачи</div>
          <div className={styles.peopleMobile}>
            <img src='img/MainPage/people.png' alt=''/>
          </div>
          <form className={styles.form} action='/search'>
            <div className={styles.inputContainer}>
              <input className={styles.search}
                     placeholder='Услуга или специалист'
                     name="query"
                     type='text'
              />
              <div className={styles.inputTip}>Example: <Link href="/search?query=Looking for a pet doctor"><a>Looking for
                a
                pet doctor</a></Link></div>
              <Button black mediumFont size="16px 0">Заказать</Button>
            </div>


          </form>
        </div>
        <div className={styles.peopleDesktop}>
          <img src='img/MainPage/people.png' alt=''/>
        </div>
      </div>
    </div>
  )
}
