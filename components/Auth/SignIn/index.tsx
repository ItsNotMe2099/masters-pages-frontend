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

interface Props {
  isOpen?: boolean
  onRequestClose?: () => void,
  showAbout?: boolean
  onClick?: () => void
}

const SignInComponent = (props: Props) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const isLoading = useSelector((state: IRootState) => state.authSignIn.loading)


  useEffect(() => {
    dispatch(signInReset())
  }, [])
  const handleSubmit = (data) => {
    dispatch(signInSubmit(data))
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
         <SignIn onSubmit={handleSubmit}/>
        <div className={styles.forgot}>
          <div><a onClick={() => dispatch(PWRecoveryOpen())}> {t('auth.signIn.forgotPassword')}</a></div>
        </div>
        <div className={styles.signUp}>
          <div>{t('auth.signIn.dontHaveAccount')}</div>
          <div><a onClick={() => dispatch(signUpOpen())}>{t('auth.signUpLink')}</a></div>
        </div>
        {props.showAbout && <Button transparent outlineBlack className={styles.findMaster} onClick={props.onClick}>{t('aboutSite')}</Button>}

    </Modal>
  )
}
export default SignInComponent
