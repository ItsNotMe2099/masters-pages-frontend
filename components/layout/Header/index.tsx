import styles from './index.module.scss'
import Button from '../../ui/Button'

interface Props {}

export default function Header(props: Props) {

  return (
    <header className={styles.root}>
      <img className={styles.logo} src='public/img/logo.svg' alt='wedo4you'/>
      <div className={styles.buttons}>
        <Button></Button>
        <Button></Button>
        <Button></Button>
      </div>
    </header>
  )
}
