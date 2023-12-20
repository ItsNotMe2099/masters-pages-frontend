import { ReactElement } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  number: number
  title: string | ReactElement
  children?: ReactElement | ReactElement[]
  classTop?: string
  className?: string
}

export default function Item(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.top}>
        <div className={styles.number}>{props.number}</div>
        <div className={styles.title}>{props.title}</div>
      </div>
      {props.children}
    </div>
  )
}
