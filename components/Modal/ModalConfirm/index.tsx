import { modalClose } from "components/Modal/actions";
import Button from "components/ui/Button";
import Loader from "components/ui/Loader";
import Modal from "components/ui/Modal";
import * as React from "react";
import { IRootState } from "types";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import {useTranslation} from "react-i18next";
interface Props {
  isOpen: boolean
  onRequestClose: () => void,

}

export default function ModalConfirm(props: Props) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const data = useSelector((state: IRootState) => state.modal.confirmData)

  const handleCancel = () => {
    if(data.onCancel){
      data.onCancel()
    }else{
      dispatch(modalClose());
    }
  }
  return (
    <Modal
      loading={data.loading}
      {...props}
    >
      <div className={styles.title}>{data.title || t('confirmModal.title')}</div>
      {data.description && <div className={styles.description}>{data.description}</div>}
      <div className={styles.buttons}>
        <Button className={styles.button} white={true} borderGrey={true} bold={true} size={'12px 40px'} type={'button'} onClick={handleCancel}>{data.cancelText ? data.cancelText : t('confirmModal.buttonCancel')}</Button>
        <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true} size={'12px 40px'} type={'submit'} onClick={data.onConfirm}>{data.confirmText ? data.confirmText : t('confirmModal.buttonConfirm')}</Button>
      </div>

    </Modal>
  )
}
