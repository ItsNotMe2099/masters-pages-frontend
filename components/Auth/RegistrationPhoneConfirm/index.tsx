import Modal from 'components/ui/Modal'
import { IRootState } from 'types'
import styles from './index.module.scss'
import SignUp from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import {registrationPhoneConfirm} from '../RegistrationPhone/actions'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
}

const RegistrationPhoneConfirm = (props: Props) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const isLoading = useSelector((state: IRootState) => state.registrationPhone.confirmLoading)
  const code = useSelector((state: IRootState) => state.registrationPhone.code)
  const handleSubmit = (data) => {
    dispatch(registrationPhoneConfirm(data))
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
export default RegistrationPhoneConfirm
