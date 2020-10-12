import styles from './index.module.scss'
import Link from 'next/link'
import CategoryIcon from './CategoryIcon'
import Button from '../ui/Button'

interface Props {}

export default function Categories(props: Props) {
  return (
    <>
      <div className={styles.title}>Найдите своего специалиста</div>
      <div className={styles.column}> 
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
      </div>
      <div className={styles.column}> 
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
      </div>
      <div className={styles.column}> 
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
        <div className={styles.columnItem}>
          <CategoryIcon>svg</CategoryIcon>
          <div className={styles.text}>Сантехничесие <br/>услуги</div>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <Button categoryBtn>Все категории</Button>
      </div>
    </>
  )
}
