import { PWRecoveryResetState, PWRecoverySecondSubmit, PWRecoverySubmit } from 'components/Auth/PWRecovery/actions'
import Modal from 'components/ui/Modal'
import { useEffect } from 'react'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'types'
import { signInOpen} from 'components/Modal/actions'
import PWRecovery from './Form'
import { useTranslation } from 'next-i18next'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void,
}

const PWRecoveryComponent = (props: Props) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const firstStepIsComplete = useSelector((state: IRootState) => state.PWRecovery.formIsSuccess)
  const isLoading = useSelector((state: IRootState) => state.PWRecovery.loading)
  const code = useSelector((state: IRootState) => state.PWRecovery.codeSet)
  useEffect(() => {
    dispatch(PWRecoveryResetState())
  }, [])
  const handleSubmit = (data) => {
    console.log("handleSubmit")
    dispatch(PWRecoverySubmit(data))
  }

  const handleSubmitSecondStep = (data) => {
    dispatch(PWRecoverySecondSubmit(data))
  }

  return (
    <Modal {...props} loading={isLoading}>
        <div className={styles.image}>
          <img src='/img/PWRecovery/icons/shield.svg' alt=''/>
        </div>
        <div className={styles.headText}>
          {t('auth.passwordRecovery.title')}
        </div>
        <div className={styles.text}>
          {t('auth.passwordRecovery.description')}
        </div>
      {(firstStepIsComplete && code) && <div className={styles.code}>{t('auth.phoneConfirm.code')} {code}</div>}

      <div className={styles.fakeMargin}></div>
          {firstStepIsComplete ?
          <PWRecovery onSubmit={handleSubmitSecondStep}/>
          :
          <PWRecovery firstStep onSubmit={handleSubmit}/>}

        <div className={styles.signUp}>
          <div>        {t('auth.passwordRecovery.rememberPassword')}</div>
          <div><a onClick={() => dispatch(signInOpen())}>{t('auth.signInLink')}</a></div>
        </div>
    </Modal>
  )
}
export default PWRecoveryComponent
