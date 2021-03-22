import { modalClose } from "components/Modal/actions";
import { registrationCompleteSubmit } from "components/Auth/RegistrationPage/actions";
import RegistrationSuccess from "components/Auth/RegistrationSuccess";
import { withTranslation } from "next-i18next";
import Router, {useRouter} from "next/router";
import { IRootState } from "types";
import {getAuthServerSide} from "utils/auth";
import RegistrationForm from './Form'
import styles from './index.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import {useTranslation} from "react-i18next";
import RegistrationPhone from "../../components/Auth/RegistrationPhone";
import RegistrationPhoneConfirm from "../../components/Auth/RegistrationPhoneConfirm";
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
  console.log("PropsUser", props.user)
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.head}>{t('auth.registrationPage.title')}</div>
        <div className={styles.inner}>

            <RegistrationForm isSocialAuth={!!router.query.socialAuth || !props.user.phone}onSubmit={handleSubmit} initialValues={{phone: props.user?.phone, email: props.user?.email, firstName: props.user?.firstName, lastName: props.user?.lastName}}/>

        </div>
      </div>
      <Backgrounds/>
      <RegistrationSuccess
        isOpen={modalKey === 'registrationSuccess'}
        onRequestClose={() =>{
          window.location.href = '/PersonalArea'
        }}/>
      {modalKey === 'registrationPhone' && <RegistrationPhone
        isOpen={true}
        onRequestClose={() =>{
          dispatch(modalClose())
        }}/>}
      {modalKey === 'registrationPhoneConfirm' && <RegistrationPhoneConfirm
        isOpen={true}
        onRequestClose={() =>{
          dispatch(modalClose())
        }}/>}
    </div>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default RegistrationPage
