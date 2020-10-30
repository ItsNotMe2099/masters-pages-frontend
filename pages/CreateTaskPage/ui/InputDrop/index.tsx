import BankCard from 'components/svg/BankCard'
import styles from './index.module.scss'

interface Props {
  meta: any
  input: string
  type: string
  label
  placeholder?: string
}

export default function InputDrop(props: Props) {
  const { error, touched } = props.meta
  const { input, type, label } = props
  return (
    <>
    <div className={styles.inputContainer}>
      <input 
      className={styles.input}
      type={type}
      placeholder={label}
      {...input}
      >
      </input>
      <a><img src='img/field/arrowDown.svg' alt=''/></a>
    </div>
      {error &&
        touched && (
        <div className={styles.error}>
          {error}
        </div>)}
    </>
  )
}
