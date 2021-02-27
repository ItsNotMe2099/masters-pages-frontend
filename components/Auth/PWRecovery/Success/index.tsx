import { PWRecoverySecondSubmit, PWRecoveryFinalSubmit} from "components/Auth/PWRecovery/actions";
import Modal from "components/ui/Modal";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'types'
import PWRecoveryNewPW from "./Form";
import {useTranslation, withTranslation} from "react-i18next";

interface Props {
  isOpen: boolean
  onRequestClose?: () => void,
}

const PWRecoverySuccess = (props: Props) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch()
  const isLoading = useSelector((state: IRootState) => state.PWRecovery.loading)

  const handleSubmit = (data) => {
    dispatch(PWRecoveryFinalSubmit(data));
    console.log(data)
  }

  return (
    <Modal {...props} loading={isLoading}>
        <div className={styles.image}>
          <img src='/img/PWRecovery/icons/shieldGreen.svg' alt=''/>
        </div>
        <div className={styles.headText}>
          {t('auth.passwordReset.title')}
        </div>
        <div className={styles.text}>
          {t('auth.passwordReset.description')}
        </div>
          <PWRecoveryNewPW onSubmit={handleSubmit}/>
    </Modal>
  )
}
export default PWRecoverySuccess;
