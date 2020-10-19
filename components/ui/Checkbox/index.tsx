import styles from './index.module.scss'

interface Props {
  meta: any
  input: string
  type: string
  children?: string
  //value: string
  //onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export default function Checkbox(props: Props) {
  const { error, touched } = props.meta
  const { input } = props
  return (
    <>
    <div>
      <input 
      type='checkbox'
      {...input}
      >
      </input>
      <label>{props.children}</label>
    </div>
      {error &&
        touched && (
        <div className={styles.error}>
          {error}
        </div>)}
    </>
  )
}
