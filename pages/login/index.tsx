import { modalClose, signInOpen } from "components/Modal/actions";
import PhoneConfirmComponent from "components/Auth/PhoneConfirm";
import PWRecoveryComponent from "components/Auth/PWRecovery";
import PWRecoverySucces from "components/Auth/PWRecovery/Success";
import SignInComponent from "components/Auth/SignIn";
import SignUpComponent from "components/Auth/SignUp";
import { withTranslation } from "next-i18next";
import Backgrounds from "pages/RegistrationPage/Backgrounds";
import { useEffect } from "react";
import { IRootState } from "types";
import { withAuthSync, withRestrictAuthSync } from "utils/auth";

import styles from './index.module.scss'

import { useDispatch, useSelector } from 'react-redux'
interface Props {
  t: (string) => string,
  user?: any
}

const RegistrationPage = (props: Props) => {
  console.log("PropsUser", props.user)
  const dispatch = useDispatch();
  const key = useSelector((state: IRootState) => state.modal.modalKey)
  useEffect(() => {
    dispatch(signInOpen());
  }, [])
  return (
    <div className={styles.root}>
      <SignInComponent
        isOpen={key === 'signIn'}

      />
      <SignUpComponent
        isOpen={key === 'signUp'}
      />
      <PhoneConfirmComponent
        isOpen={key === 'phoneConfirm'}
      />
      <PWRecoveryComponent
        isOpen={key === 'pwRecFirst'}/>
      <PWRecoverySucces
        isOpen={key === 'pwRecSuccess'}/>
      <Backgrounds/>
    </div>
  )
}
export default withTranslation('registration')(RegistrationPage)
