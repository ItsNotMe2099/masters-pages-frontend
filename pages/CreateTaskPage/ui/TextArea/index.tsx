import styles from './index.module.scss'

interface Props {
  placeholder?: string
  fluid?: boolean
  input
  label
  type
}

export default function TextArea(props: Props) {
  const { input, label, type } = props
  return (
    <div className={`${styles.root} ${props.fluid && styles.fluid}`}>
      <textarea
        className={styles.textarea}
        type={type}
        placeholder={label}
        {...input}
      />
    </div>
  )
}
