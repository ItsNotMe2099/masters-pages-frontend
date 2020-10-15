import styles from './index.module.scss'

interface Props {
  inputLabel: string
  meta: any
  input: string
  type: string
}

export default function Input(props: Props) {
  const { error, touched } = props.meta
  const { input, type } = props
  return (
    <>
      <input 
      className={styles.input}
      type={type}
      {...input}
      >
        <div className={styles.inputLabel}>{props.inputLabel}</div>
      </input>
      {error &&
        touched && (
        <div className={styles.error}>
          {error}
        </div>)}
    </>
  )
}
