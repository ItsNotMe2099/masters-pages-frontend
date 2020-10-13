import styles from './index.module.scss'
import Link from 'next/link'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

interface Props {}

export default function BannerSection(props: Props) {
  return (
    <div className={styles.root}>
      <img className={styles.man} src='img/MainPage/man.png' alt=''/>
      <img className={styles.woman} src='img/MainPage/woman.png' alt=''/>
      <div className={styles.text__big}>Освободим вас от забот</div>
      <div className={styles.text__medium}>Найдите исполнителя под ваши задачи</div>
      <div className={styles.searchType}>
        <div className={styles.text__vsmall}>Поиск по</div>
        <div className={styles.text__small_active}><Link href="/"><a>Ключевым словам</a></Link></div>
        <div className={styles.text__small}><Link href="/"><a>Фильтрам</a></Link></div>
        <div className={styles.text__small}><Link href="/"><a>Разместить заказ</a></Link></div>
      </div>
      <form>
        <div className={styles.input}>
          <Input
            placeholder='Услуга или специалист'
            type='text'
          />
          <Button largeInput>Заказать</Button>
        </div>
      </form>
    </div>
  )
}
