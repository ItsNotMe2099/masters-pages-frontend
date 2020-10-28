import styles from './index.module.scss'

interface Props {
  meta: any
  input: string
  type: string
  label
  placeholder?: string
}

export default function InputLocation(props: Props) {
  const { error, touched } = props.meta
  const { input, type } = props
  return (
    <>
    <div className={styles.inputContainer}>
      <input 
      className={styles.input}
      type={type}
      {...input}
      >
      </input>
      <a><img src='img/field/location.svg' alt=''/></a>
    </div>
      {error &&
        touched && (
        <div className={styles.error}>
          {error}
        </div>)}
    </>
  )
}
