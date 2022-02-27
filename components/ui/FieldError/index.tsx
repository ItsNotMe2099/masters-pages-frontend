import styles from './index.module.scss'

interface Props {
  children?: string
  showError: boolean
}

export default function FieldError(props: Props) {
  if (props.showError && props.children) {
    return (
      <div className={styles.root}>
        <div className={styles.text}>{props.children}</div>
      </div>
    )
  }
  return null
}

