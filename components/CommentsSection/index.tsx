import Background from './Background'
import Comment from './Comment'
import styles from './index.module.scss'

interface Props {}

export default function CommentsSection(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.head}>Отзывы</div>
      <div className={styles.floaters}>
        <img className={styles.icon} src="img/icons/posComments.svg" alt=''/>
        <div className={styles.text}>
          <div>
            <div className={styles.percent}>95%</div>
            <div className={styles.greenText}>положительных<br/>отзывов</div>
          </div>
          <div>
            <div className={styles.normText}>374 189 отзывов оставили клиенты за последние<br/>
                  12 месяцев. Из них 354 608 - положительные</div>
          </div>
        </div>
      </div>
      <Comment comment1/>
      <Comment comment2/>
      <Comment comment3/>
    </div>
  )
}
