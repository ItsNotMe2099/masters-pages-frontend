import styles from './index.module.scss'
import Link from 'next/link'

interface Props {}

export default function CategoryIcon(props: Props) {
  return (
      <div className={styles.root}>
        <img src='img/icons/service.svg' alt=''/>
      </div>
  )
}
