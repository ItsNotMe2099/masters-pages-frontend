import styles from './index.module.scss'

interface Props {
  meta: any
  input: string
  type: string
  label: string
}

export default function InputPhone(props: Props) {
  const { error, touched } = props.meta
  const { input, type, label } = props
  return (
    <>
    <div className={styles.inputContainer}>
      <input 
      className={styles.input}
      placeholder={label}
      type={type}
      {...input}
      >
      </input>
      <div className={styles.inputLabel}>Phone number*</div>
      <div className={styles.country}>
        <img className={styles.icon} src="img/icons/canada.svg" alt=''/>
        <span>RU</span>
        <img className={styles.arrow} src='img/icons/arrow.svg' alt=''/>
      </div>
    </div>
      {error &&
        touched && (
        <div className={styles.error}>
          {error}
        </div>)}
    </>
  )
}
