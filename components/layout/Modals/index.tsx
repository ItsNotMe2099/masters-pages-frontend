import ChangePassword from "components/Auth/ChangePassword";
import PhoneConfirmComponent from "components/Auth/PhoneConfirm";
import { LangSelect } from "components/layout/Header/components/LangSelect";
import { ModeSelect } from "components/layout/Header/components/ModeSelect";
import { ProfileSelect } from "components/layout/Header/components/ProfileSelect";
import ModalConfirm from "components/Modal/ModalConfirm";
import ModalLoader from "components/ModalLoader";
import { changeRole } from "components/Profile/actions";
import MenuMobile from "components/svg/MenuMobile";
import MenuMobileClose from "components/svg/MenuMobileClose";
import TaskOfferAcceptModal from "components/TaskOffer/TaskOfferAcceptModal";
import TaskShareModal from "components/TaskShareModal";
import Socials from "components/ui/Socials";
import { withTranslation } from "react-i18next";
import { withAuthSync } from "utils/auth";
import { getMediaPath } from "utils/media";
import styles from './index.module.scss'
import Link from 'next/link'
import { default as React, useState } from 'react'
import Button from 'components/ui/Button'
import Logo from 'components/Logo'
import SignInComponent from 'components/Auth/SignIn'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'types'
import {
  modalClose,
  signInOpen,
  signUpOpen,
  phoneConfirmOpen,
} from 'components/Modal/actions'
import SignUpComponent from 'components/Auth/SignUp'
import PWRecoveryComponent from "components/Auth/PWRecovery";
import PWRecoverySucces from "components/Auth/PWRecovery/Success";
import RegistrationSuccess from "components/Auth/RegistrationSuccess";


interface Props {
  user?: any,
  t: (string) => string,
}

const Modals = (props: Props) => {
  const dispatch = useDispatch()
  const key = useSelector((state: IRootState) => state.modal.modalKey)

  return (
    <>

      <SignInComponent
        isOpen={key === 'signIn'}
        onRequestClose={() => dispatch(modalClose())}
      />
      <SignUpComponent
        isOpen={key === 'signUp'}
        onRequestClose={() => dispatch(modalClose())}
      />
      <PhoneConfirmComponent
        isOpen={key === 'phoneConfirm'}
        onRequestClose={() => dispatch(modalClose())}
      />
      <PWRecoveryComponent
        isOpen={key === 'pwRecFirst'}
        onRequestClose={() => dispatch(modalClose())}/>
      <PWRecoverySucces
        isOpen={key === 'pwRecSuccess'}
        onRequestClose={() => dispatch(modalClose())}/>
      <ModalLoader isOpen={key === 'loader'} onRequestClose={() => {}}/>
      <ChangePassword isOpen={key === 'changePassword'}
                      onRequestClose={() => dispatch(modalClose())}/>
      <TaskOfferAcceptModal isOpen={key === 'taskOfferAcceptModal'} onClose={() => dispatch(modalClose())}/>
      <TaskShareModal isOpen={key === 'taskShareModal'}/>
                      <ModalConfirm isOpen={key === 'confirm'}    onRequestClose={() => dispatch(modalClose())}/>
    </>
  )
}

export default withTranslation('header')(Modals)
