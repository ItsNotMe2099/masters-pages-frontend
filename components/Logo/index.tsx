import Link from 'next/link'
import styles from './index.module.scss'

interface Props {}

export default function Logo(props: Props) {
  return (
        <div className={styles.logo}>
          <Link href="/"><a>
            <img className={styles.icon} src='img/logo.svg' alt=''/>
            <div className={styles.logoText}>Masters <span>Pages</span></div>
          </a></Link>
        </div>
  )
}
