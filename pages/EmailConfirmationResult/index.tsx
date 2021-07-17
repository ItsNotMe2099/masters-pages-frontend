import { modalClose } from "components/Modal/actions";
import { registrationCompleteSubmit } from "components/Auth/RegistrationPage/actions";
import RegistrationSuccess from "components/Auth/RegistrationSuccess";
import { withTranslation } from "next-i18next";
import Router, {useRouter} from "next/router";
import { IRootState } from "types";
import {getAuthServerSide} from "utils/auth";

import styles from './index.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import {useTranslation} from "react-i18next";
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
        <div className={styles.result}>{router.query.result === 'true' ? 'Email confirmed' : 'Email not confirmed'}</div>
    </div>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default RegistrationPage
