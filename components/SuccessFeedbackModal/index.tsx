import { modalClose } from "components/Modal/actions";
import Button from "components/ui/Button";
import Modal from "components/ui/Modal";
import { useRouter } from "next/router";
import styles from './index.module.scss'
import {useTranslation, Trans} from "i18n";

import { useSelector, useDispatch } from 'react-redux'

interface Props {
  isOpen: boolean
}

export default function SuccessFeedbackModal(props: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClose = () => {
    dispatch(modalClose());
  }

  const handleGoHome = () => {
    router.push('/');
    dispatch(modalClose());
  }
  const {t} = useTranslation('common')


  return (
    <Modal{...props} onRequestClose={handleClose} className={styles.root} closeClassName={styles.close} >
      <div className={styles.innards}>
          <div><img src="/img/SuccessFeedbackModal/icon.svg" alt=""/></div>
          <div className={styles.text}>{t('feedBack.modals.thankYou')}</div>
          <div className={styles.btnContainer}>
            <Button type="button" red bold smallFont size="10px 45px" onClick={handleGoHome}>{t('goToHomePage')}</Button>
          </div>
      </div>
    </Modal>
  )
}
