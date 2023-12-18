import styles from './index.module.scss'

interface Props {
  number: string
  text: string
}

export default function Item(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.number}>{props.number}</div>
      <div className={styles.text}>{props.text}</div>
    </div>
  )
}
