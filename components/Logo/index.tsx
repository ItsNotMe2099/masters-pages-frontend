import Link from 'next/link'
import styles from './index.module.scss'

interface Props {}

export default function Logo(props: Props) {
  return (
    <Link href="/">
    <div className={styles.root}>

            <img className={styles.iconDesktop} src='img/logo.svg' alt=''/>
            <img className={styles.iconMobile} src='img/logo-mobile.svg' alt=''/>
            <div className={styles.logoText}>Masters <span>Pages</span></div>

        </div>
    </Link>
  )
}
