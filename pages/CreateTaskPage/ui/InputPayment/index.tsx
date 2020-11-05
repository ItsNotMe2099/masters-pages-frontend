import styles from './index.module.scss'

interface Props {
  meta: any
  input: string
  type: string
  label
  placeholder?: string
  title: string
}

export default function InputPayment(props: Props) {
  const { error, touched } = props.meta
  const { input, type, label } = props
  return (
    <>
      <span className={styles.title}>{props.title}</span>
      <input 
      className={styles.input}
      type={type}
      placeholder={label}
      {...input}
      >
      </input>
      {error &&
        touched && (
        <div className={styles.error}>
          {error}
        </div>)}
    </>
  )
}
