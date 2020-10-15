import Button from 'components/ui/Button'
import styles from './index.module.scss'

interface Props {}

export default function SignUp(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.close}>
        <Button></Button>
      </div>
      <div className={styles.headText}>
        Quick sign in:
      </div>
      <div className={styles.social}>

      </div>
      <div className={styles.headText}>
        Sign in:
      </div>
    </div>
  )
}
