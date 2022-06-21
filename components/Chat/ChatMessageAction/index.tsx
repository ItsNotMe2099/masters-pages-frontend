

import Button from 'components/ui/Button'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'

interface Props {
  message: string
  onConfirm: () => void
  onReject: () => void
  showReject?: boolean
  showConfirm?: boolean
}

export default function ChatMessageAction({ message, onConfirm, onReject, showReject, showConfirm }: Props) {

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
  }
  const handleReject = () => {
    if (onReject) {
      onReject()
    }
  }
  const { t } = useTranslation('common')

  return (
    <div className={styles.root}>
      <div className={styles.message}>{message}</div>

      {showReject && <Button className={`${styles.action} ${styles.actionRed}`} onClick={handleReject}>{t('reject')}</Button>}
      {showConfirm &&
      <Button className={`${styles.action} ${styles.actionRed}`} onClick={handleConfirm}>{t('confirmModal.buttonConfirm')}</Button>}

    </div>
  )
}
