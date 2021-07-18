import { modalClose } from "components/Modal/actions";
import { registrationCompleteSubmit } from "components/Auth/RegistrationPage/actions";

import Router, {useRouter} from "next/router";
import { IRootState } from "types";
import {getAuthServerSide} from "utils/auth";

import styles from './index.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import {useTranslation} from "i18n";
import Backgrounds from 'components/Backgrounds'

interface Props {
  user?: any
}


const RegistrationPage = (props: Props) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const dispatch = useDispatch()
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)

  const handleSubmit = (data) => {
    dispatch(registrationCompleteSubmit(data));
  }

  return (
    <div className={styles.root}>

      <Backgrounds/>
        <div className={styles.result}>{router.query.result === 'true' ? t('emailConfirmation.confirmed') : t('emailConfirmation.notConfirmed')}</div>
    </div>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default RegistrationPage
