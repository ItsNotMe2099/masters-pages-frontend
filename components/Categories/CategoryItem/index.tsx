import styles from './index.module.scss'
import Link from 'next/link'

interface Props {
  image: string
  color: string
  text: string
}

export default function CategoryItem(props: Props) {
  return (
      <Link href={''}>
        <div className={styles.root}>
        <div className={styles.icon} style={{ backgroundColor: props.color }}>
          <img src={props.image} alt=''/>
        </div>
        <div className={styles.title}>{props.text}</div>
          </div>
      </Link>
  )
}
