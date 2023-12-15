import { ReactElement } from 'react'
import styles from './index.module.scss'

interface Props {
  icon: ReactElement
  title: string
  text: string | ReactElement
}

export default function CardActive(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        {props.icon}
      </div>
      <div className={styles.title}>
        {props.title}
      </div>
      <div className={styles.text}>
        {props.text}
      </div>
    </div>
  )
}
