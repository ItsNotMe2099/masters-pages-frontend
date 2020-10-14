import Background from './Background'
import Comment from './Comment'
import styles from './index.module.scss'

interface Props {}

export default function CommentsSection(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.commentBg}></div>
      <div className={styles.commentContainer}>

        <div className={styles.head}>Reviews</div>
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
        <Comment name={'Ronald'} service={'Клининг'} avatar={'img/CommentsSection/Comment/photo1.png'} comments={64} negative={1} message={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lobortis consequat quis pulvinar suspendisse. Sed eu amet, auctor fermentum posuere convallis. Fusce lectus morbi purus suscipit velit. Adipiscing enim fames egestas nisl, tincidunt sit cursus posuere'}/>
        <Comment name={'Татьяна Иванова'} service={'Клининг'} avatar={'img/CommentsSection/Comment/photo1.png'} comments={64} negative={1} message={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lobortis consequat quis pulvinar suspendisse. Sed eu amet, auctor fermentum posuere convallis. Fusce lectus morbi purus suscipit velit. Adipiscing enim fames egestas nisl, tincidunt sit cursus posuere'}/>
        <Comment name={'Татьяна Петров'} service={'Клининг'} avatar={'img/CommentsSection/Comment/photo1.png'} comments={64} negative={1} message={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lobortis consequat quis pulvinar suspendisse. Sed eu amet, auctor fermentum posuere convallis. Fusce lectus morbi purus suscipit velit. Adipiscing enim fames egestas nisl, tincidunt sit cursus posuere'}/>
      </div>
      <div className={styles.orderingContainer}>

      </div>
    </div>
  )
}
