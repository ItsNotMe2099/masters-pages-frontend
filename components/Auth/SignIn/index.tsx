import {signInReset, signInSubmit} from 'components/Auth/SignIn/actions'
import Button from 'components/ui/Button'
import Modal from 'components/ui/Modal'
import { IRootState } from 'types'
import styles from './index.module.scss'
import SignIn from './Form'
import { useDispatch, useSelector } from 'react-redux'
import {  PWRecoveryOpen, signUpOpen } from 'components/Modal/actions'
import { useTranslation } from 'next-i18next'
import {useEffect} from 'react'
import AuthRepository from 'data/repositories/AuthRepository'
import {useAppContext} from 'context/state'
import {useAuthContext} from 'context/auth_state'

interface Props {
  isOpen?: boolean
  onRequestClose?: () => void,
  showAbout?: boolean
  onClick?: () => void
}

const SignInComponent = (props: Props) => {
  const { t } = useTranslation('common')
  const authContext = useAuthContext();
  const dispatch = useDispatch()
  const isLoading = authContext.loginSpinner


  useEffect(() => {
    authContext.clear();
  }, [])
  const handleSubmit = async (data) => {
    authContext.login(data);
  }
  return (
    <Modal{...props} loading={isLoading}>

        <div className={styles.logo}>
          <img src='/img/icons/logo.svg' alt=''/>
        </div>
        <div className={styles.label}>
          Masters <span>Pages</span>
        </div>

        <div className={styles.headText}>
          {t('auth.titleQuick')}
        </div>
        <div className={styles.social}>
          <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/login`}><img src="/img/icons/google.svg" alt=''/></a>
          <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/facebook/login`}><img src="/img/icons/facebook.svg" alt=''/></a>

        </div>
          <div className={styles.or}>
            <span>{t('createTask.priceSelect.or')}</span>
            <div className={styles.separator}></div>
          </div>
         <SignIn onSubmit={handleSubmit} initialValues={{mode: 'phone'}}/>

        {props.showAbout && <Button transparent outlineBlack className={styles.findMaster} onClick={props.onClick}>{t('aboutSite')}</Button>}

    </Modal>
  )
}
export default SignInComponent
