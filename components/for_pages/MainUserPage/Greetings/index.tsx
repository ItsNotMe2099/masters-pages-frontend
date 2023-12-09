import { ReactElement } from 'react'
import Item from './Item'
import styles from './index.module.scss'


interface Props {
  children?: ReactElement | ReactElement[]
  title: string
}

export default function Greetings(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.title}>
          {props.title}
        </div>
        {props.children}
      </div>
    </div>
  )
}
