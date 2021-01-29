import ChangePassword from "components/Auth/ChangePassword";
import PhoneConfirmComponent from "components/Auth/PhoneConfirm";
import FeedbackSiteModal from "components/FeedbackSiteModal";
import FinishingTaskByClientModal from "components/FinishingTaskByClientModal";
import FinishingTaskByMasterModal from "components/FinishingTaskByMasterModal";
import ModalConfirm from "components/Modal/ModalConfirm";
import ModalLoader from "components/ModalLoader";
import SuccessFeedbackModal from "components/SuccessFeedbackModal";
import SuccessTaskModal from "components/SuccessTaskModal";
import TaskEditConditionsModal from "components/TaskNegotiation/TaskEditConditionsModal";
import TaskHireMasterModal from "components/TaskNegotiation/TaskHireMasterModal";
import TaskMarkAsDoneModal from "components/TaskNegotiation/TaskMarkAsDoneModal";
import TaskOfferAcceptModal from "components/TaskNegotiation/TaskOfferAcceptModal";
import TaskOfferShowModal from "components/TaskNegotiation/TaskOfferShow";
import TaskShareModal from "components/TaskShareModal";
import { withTranslation } from "react-i18next";
import { default as React, useState } from 'react'
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
      <ModalLoader isOpen={key === 'loader'} onRequestClose={() => {
      }}/>
      <ChangePassword isOpen={key === 'changePassword'}
                      onRequestClose={() => dispatch(modalClose())}/>
      <TaskOfferAcceptModal isOpen={key === 'taskOfferCreateModal'} onClose={() => dispatch(modalClose())}/>
      <TaskShareModal isOpen={key === 'taskShareModal'}/>
      <ModalConfirm isOpen={key === 'confirm'} onRequestClose={() => dispatch(modalClose())}/>
      {key === 'taskHireMasterModal' &&
      <TaskHireMasterModal isOpen={key === 'taskHireMasterModal'} onClose={() => dispatch(modalClose())}/>}
      {key === 'taskMarkAsDoneModal' &&
      <TaskMarkAsDoneModal isOpen={key === 'taskMarkAsDoneModal'} onClose={() => dispatch(modalClose())}/>}
      {key === 'taskEditConditionsModal' &&
      <TaskEditConditionsModal isOpen={key === 'taskEditConditionsModal'} onClose={() => dispatch(modalClose())}/>}
      {key === 'finishTaskAsClientOpen' && <FinishingTaskByClientModal isOpen={key === 'finishTaskAsClientOpen'}/>}
      {key === 'finishTaskAsMasterOpen' && <FinishingTaskByMasterModal isOpen={key === 'finishTaskAsMasterOpen'}/>}
      {key === 'feedbackSiteModal' && <FeedbackSiteModal isOpen={key === 'feedbackSiteModal'}/>}
      {key === 'taskSuccessModal' && <SuccessTaskModal isOpen={key === 'taskSuccessModal'}/>}
      {key === 'feedbackSuccessModal' && <SuccessFeedbackModal isOpen={key === 'feedbackSuccessModal'}/>}
      {key === 'taskOfferShow' && <TaskOfferShowModal isOpen={key === 'taskOfferShow'} onClose={() => dispatch(modalClose())}/>}
    </>
  )
}

export default withTranslation('header')(Modals)
