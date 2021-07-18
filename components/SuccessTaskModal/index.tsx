import { feedbackSiteOpen, modalClose } from "components/Modal/actions";
import Button from "components/ui/Button";
import Modal from "components/ui/Modal";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import {useTranslation, Trans} from "i18n";

interface Props {
  isOpen: boolean
}

export default function SuccessTaskModal(props: Props) {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(modalClose());
  }

  const handleWillDoIt = () => {
    dispatch(feedbackSiteOpen());
  }
  const {t} = useTranslation('common')
  return (
    <Modal{...props} onRequestClose={handleClose} className={styles.root} closeClassName={styles.close} >

        <div className={styles.innards}>
          <div className={styles.top}>
            <div><img src="/img/SuccessTaskModal/icon.svg" alt=""/></div>
            <div className={styles.text__top}>{t('feedBack.modals.yourOrder')}</div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.text__bottom}>{t('feedBack.modals.pleaseDescribe')}</div>
            <div className={styles.btnContainer}>
              <Button type="button" transparent bold smallFont size="10px 32px" borderC4 onClick={handleClose}>{t('feedBack.modals.noIDont')}</Button>
              <Button type="button" red bold smallFont size="10px 45px" onClick={handleWillDoIt} >{t('feedBack.modals.yes')}</Button>
            </div>
          </div>
        </div>
    </Modal>
  )
}
