import {phoneConfirmReset, phoneConfirmSubmit} from 'components/Auth/PhoneConfirm/actions'
import Modal from 'components/ui/Modal'
import { IRootState } from 'types'
import styles from './index.module.scss'
import SignUp from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import {useEffect} from 'react'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
}

const PhoneConfirmComponent = (props: Props) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const isLoading = useSelector((state: IRootState) => state.phoneConfirmReducer.loading)
  const code = useSelector((state: IRootState) => state.phoneConfirmReducer.code)

  useEffect(() => {
    dispatch(phoneConfirmReset())
  }, [])
  const handleSubmit = (data) => {
    dispatch(phoneConfirmSubmit(data))
  }
  return (
    <Modal
      {...props}
      loading={isLoading}
    >
      <div className={styles.image}>
        <img src="/img/CodeConfirm/code_confirm.svg" alt=''/>
      </div>
      <div className={styles.title}>
        {t('auth.phoneConfirm.title')}
      </div>
      <div className={styles.text}>
        {t('auth.phoneConfirm.description')}
      </div>
      {code && <div className={styles.code}>{t('auth.phoneConfirm.code')} {code}</div>}

      <SignUp onSubmit={handleSubmit}/>
    </Modal>
  )
}
export default PhoneConfirmComponent
