import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'

interface Props {
  children?: string
  showError: boolean
}

export default function FieldError(props: Props) {
  const {t} = useTranslation()

  if (props.showError && props.children) {
    return (
      <div className={styles.root}>
        <div className={styles.text}>{typeof props.children === 'string' ? t(`validation.${props.children}`) : props.children }</div>
      </div>
    )
  }
  return null
}

