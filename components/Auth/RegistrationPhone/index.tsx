import { signInSubmit } from "components/Auth/SignIn/actions";
import Button from 'components/ui/Button'
import Modal from "components/ui/Modal";
import { IRootState } from "types";
import styles from './index.module.scss'
import SignIn from './Form'
import { useDispatch, useSelector } from 'react-redux'
import {  PWRecoveryOpen, signUpOpen } from 'components/Modal/actions'
import {useTranslation, withTranslation} from "i18n";
import {registrationPhoneChange, registrationPhoneReset, registrationPhoneSubmit} from "./actions";
import {useEffect} from "react";

interface Props {
  isOpen?: boolean
  onRequestClose?: () => void,
  userPhoneChange?: boolean,
  userHasPassword?: boolean
}

const RegistrationPhone = (props: Props) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch()
  const isLoading = useSelector((state: IRootState) => state.registrationPhone.loading)

  useEffect(() => {
    dispatch(registrationPhoneReset());
  }, [])
  const handleSubmit = (data) => {
    if(props.userPhoneChange){
      dispatch(registrationPhoneChange(data));
    }else {
      dispatch(registrationPhoneSubmit(data));
    }
  }
  return (
    <Modal{...props} loading={isLoading}>

        <div className={styles.headText}>
          {t(props.userPhoneChange ? 'auth.registrationPhone.titleChange' : 'auth.registrationPhone.title')}
        </div>
         <SignIn userPhoneChange={props.userPhoneChange} userHasPassword={props.userHasPassword} onSubmit={handleSubmit}/>
    </Modal>
  )
}
export default RegistrationPhone;
