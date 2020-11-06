import styles from './index.module.scss'

interface Props {
  meta: any
  input: number
  type: string
  label
  placeholder?: string
  title: string
  min: number
  max: number
  step?: number
}

export default function InputPayment(props: Props) {
  const { error, touched } = props.meta
  const { input, type, label } = props
  return (
    <>
      <span className={styles.title}>{props.title}</span>
      <input 
      className={styles.input}
      type='number'
      placeholder={label}
      min={props.min} 
      max={props.max}
      step={props.step}
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
