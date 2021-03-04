import { signInSubmit } from "components/Auth/SignIn/actions";
import Button from 'components/ui/Button'
import Modal from "components/ui/Modal";
import { IRootState } from "types";
import styles from './index.module.scss'
import SignIn from './Form'
import { useDispatch, useSelector } from 'react-redux'
import {  PWRecoveryOpen, signUpOpen } from 'components/Modal/actions'
import {useTranslation, withTranslation} from "react-i18next";
import {registrationPhoneReset, registrationPhoneSubmit} from "./actions";
import {useEffect} from "react";

interface Props {
  isOpen?: boolean
  onRequestClose?: () => void,
}

const RegistrationPhone = (props: Props) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch()
  const isLoading = useSelector((state: IRootState) => state.authSignIn.loading)

  useEffect(() => {
    console.log("Call reset")
    dispatch(registrationPhoneReset());
  }, [])
  const handleSubmit = (data) => {
    dispatch(registrationPhoneSubmit(data));
  }
  return (
    <Modal{...props} loading={isLoading}>

        <div className={styles.headText}>
          {t('auth.registrationPhone.title')}
        </div>
         <SignIn onSubmit={handleSubmit}/>
    </Modal>
  )
}
export default RegistrationPhone;
