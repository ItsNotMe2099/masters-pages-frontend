import { ReactElement } from 'react'
import styles from './index.module.scss'

interface Props {
  number: number
  title: string | ReactElement
  children?: ReactElement | ReactElement[]
  classTop?: string
}

export default function Item(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.number}>{props.number}</div>
        <div className={styles.title}>{props.title}</div>
      </div>
      {props.children}
    </div>
  )
}
