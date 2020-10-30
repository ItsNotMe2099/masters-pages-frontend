import { useState } from 'react'
import styles from './index.module.scss'

interface Props {
  inputLabel: string
  meta: any
  input: string
  type: string
  value: string
  //onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export default function Input(props: Props) {
  const { error, touched } = props.meta
  const { input, type } = props
  const [isCorrect, setIsCorrect] = useState(false)
  console.log("Input value", props.input.value)
  return (
    <>
    <div className={styles.inputContainer}>
      <input
      className={styles.input}
      type={type}
      {...input}
      >
      </input>
      <div className={styles.inputLabel}>{props.inputLabel}</div>
      {isCorrect && props.inputLabel !== 'Email*' ?
      <div className={styles.ok}><img src='img/field/ok.svg' alt=''/></div> : null}
    </div>
      {error &&
        touched && (
        <div className={styles.error}>
          {error}
        </div>)}
    </>
  )
}
