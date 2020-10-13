import styles from './index.module.scss'
import Link from 'next/link'
import CategoryIcon from './CategoryIcon'
import Button from 'components/ui/Button'

interface Props {}

export default function Categories(props: Props) {
  return (
    <>
      <div className={styles.title}>Найдите своего специалиста</div>
      <div className={styles.column}> 
        <Link href="/">
        <a>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        </a>
        </Link>
        <Link href="/">
        <a>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        </a>
        </Link>
        <Link href="/">
        <a>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        </a>
        </Link>
        <Link href="/">
        <a>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        </a>
        </Link>
      </div>
      <div className={styles.column}> 
      <Link href="/">
        <a>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        </a>
        </Link>
        <Link href="/">
        <a>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        </a>
        </Link>
        <Link href="/">
        <a>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        </a>
        </Link>
        <Link href="/">
        <a>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        </a>
        </Link>
      </div>
      <div className={styles.column}> 
      <Link href="/">
        <a>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        </a>
        </Link>
        <Link href="/">
        <a>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        </a>
        </Link>
        <Link href="/">
        <a>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        </a>
        </Link>
        <Link href="/">
        <a>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        </a>
        </Link>
      </div>
      <div className={styles.btnContainer}>
        <Button categoryBtn>Все категории</Button>
      </div>
    </>
  )
}
