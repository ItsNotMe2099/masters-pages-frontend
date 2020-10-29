import BankCard from 'components/svg/BankCard'
import styles from './index.module.scss'

interface Props {
  meta: any
  input: string
  type: string
  label
  placeholder?: string
  bank?: boolean
}

export default function InputDrop(props: Props) {
  const { error, touched } = props.meta
  const { input, type, label } = props
  return (
    <>
    <div className={styles.inputContainer}>
      <input 
      className={`${styles.input} ${props.bank && styles.bankInput}`}
      type={type}
      placeholder={label}
      {...input}
      >
      </input>
      <a><img src='img/field/arrowDown.svg' alt=''/></a>
      {props.bank && (
        <BankCard/>
      )}
    </div>
      {error &&
        touched && (
        <div className={styles.error}>
          {error}
        </div>)}
    </>
  )
}
