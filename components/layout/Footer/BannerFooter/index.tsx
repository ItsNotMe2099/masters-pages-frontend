import Button from 'components/ui/Button'
import styles from './index.module.scss'

interface Props {}

export default function BannerFooter(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.text}>Заработайте на том,<br/>что делаете лучше всех</div>
      <div className={styles.text__mobile}>Заработайте на том, что делаете лучше всех</div>
      <div className={styles.icon}>
        <div className={styles.wrapper}>
          <img className={styles.woman} src='img/Footer/woman.png' alt=''/>
        </div>
      </div>
      <Button mediumFont black size="20px 0">Стать исполнителем</Button>
    </div>
  )
}
