import { signUpOpen } from 'components/Modal/actions'
import PhoneConfirmComponent from 'components/Auth/PhoneConfirm'
import PWRecoveryComponent from 'components/Auth/PWRecovery'
import PWRecoverySucces from 'components/Auth/PWRecovery/Success'
import SignInComponent from 'components/Auth/SignIn'
import SignUpComponent from 'components/Auth/SignUp'

import { useEffect } from 'react'
import { IRootState } from 'types'
import styles from './index.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import Backgrounds from 'components/Backgrounds'
import cookie from 'js-cookie'
interface Props {
  user?: any
}

const RegistrationPage = (props: Props) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const key = useSelector((state: IRootState) => state.modal.modalKey)
  useEffect(() => {
    dispatch(signUpOpen())
  }, [])

  const handleAbout = () => {
    cookie.set('signUpMobile', 'no', { expires: 365 * 3 })
    window.location.href = '/'
  }
  return (
    <div className={styles.root}>
      <SignInComponent
        isOpen={key === 'signIn'}
        onClick={handleAbout}
        showAbout
      />
      <SignUpComponent
        isOpen={key === 'signUp'}
        onClick={handleAbout}
        showAbout
      />
      <PhoneConfirmComponent
        isOpen={key === 'phoneConfirm'}
      />
      <PWRecoveryComponent
        isOpen={key === 'pwRecFirst'}/>
      <PWRecoverySucces
        isOpen={key === 'pwRecSuccess'}/>
      <Backgrounds/>
    </div>
  )
}
export default RegistrationPage
