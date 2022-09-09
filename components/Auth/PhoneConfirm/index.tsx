import {phoneConfirmReset} from 'components/Auth/PhoneConfirm/actions'
import Modal from 'components/ui/Modal'
import styles from './index.module.scss'
import SignUp from './Form'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import {useEffect} from 'react'
import {useAuthContext} from 'context/auth_state'
import Cookies from 'js-cookie'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import { useAppContext } from 'context/state'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
}

const PhoneConfirmComponent = (props: Props) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  const authContext = useAuthContext();
  const isLoading = authContext.confirmSpinner;
  const code = authContext.codeRes?.code

  const phone = authContext.signUpFormData?.phone

  const appContext = useAppContext()

  const profile = appContext.profile

  const currentToken = Cookies.get('token')

  useEffect(() => {
    dispatch(phoneConfirmReset())
  }, [])

  const handleSubmit = async (data) => {
    const result = await authContext.confirmCode(data.code)
    if(currentToken && result){
      await ProfileRepository.updateProfile(profile.id, {phone: phone})
      appContext.updateProfile()
    }
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
