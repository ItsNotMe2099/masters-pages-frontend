import styles from './index.module.scss'
import Link from 'next/link'

interface Props {
  image: string
  color: string
  text: string
}

export default function CategoryItem(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.icon} style={{backgroundColor: props.color}}>
        <img src={props.image} alt=''/>
      </div>
      <div className={styles.text}>{props.text}</div>
    </div>
  )
}
