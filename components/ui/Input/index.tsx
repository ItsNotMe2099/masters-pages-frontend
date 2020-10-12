import styles from './index.module.scss'

interface Props {
  placeholder?: string
  type?: string
  route?: string
  children?: any
}

export default function Input(props: Props) {
  return (
    <input className={styles.input}
      placeholder={props.placeholder}>
      {props.children}
    </input>
  )
}
