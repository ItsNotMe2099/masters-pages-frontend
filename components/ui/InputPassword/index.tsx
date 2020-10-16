import { useState } from 'react'
import Button from '../Button'
import styles from './index.module.scss'

interface Props {
  inputLabel: string
  meta: any
  input: string
  type: string
}

export default function InputPassword(props: Props) {
  const [isShown, setIsShown] = useState(false)
  const { error, touched } = props.meta
  const { input } = props
  return (
    <div className={styles.inputContainer}>
      <input 
      className={styles.input}
      type={isShown ? 'text' : 'password'}
      {...input}
      >
      </input>
      <div className={styles.inputLabel}>{props.inputLabel}</div>
      {isShown ?
        <a onClick={() => setIsShown(false)}><img src='img/field/show.svg' alt=''/></a>
        :
        <a onClick={() => setIsShown(true)}><img src='img/field/hide.svg' alt=''/></a>}
      {error &&
        touched && (
        <div className={styles.error}>
          {error}
        </div>)}
      </div>
  )
}
