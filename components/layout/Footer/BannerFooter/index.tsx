import Button from 'components/ui/Button'
import styles from './index.module.scss'

interface Props {}

export default function BannerFooter(props: Props) {
  return (
    <div className={styles.root}>
      <img className={styles.woman} src='img/Footer/woman.png' alt=''/>
      <div className={styles.text}>Заработайте на том,<br/>что делаете лучше всех</div>
      <Button footerBtn>Стать исполнителем</Button>
    </div>
  )
}
