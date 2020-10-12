import styles from './index.module.scss'
import Link from 'next/link'

interface Props {
  children: any
}

export default function CategoryElement(props: Props) {
  return (
      <div className={styles.root}>
        {props.children}
      </div>
  )
}
