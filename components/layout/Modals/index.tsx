import ChangePassword from "components/Auth/ChangePassword";
import PhoneConfirmComponent from "components/Auth/PhoneConfirm";
import FeedbackSiteModal from "components/FeedbackSiteModal";
import FinishingTaskByClientModal from "components/FinishingTaskByClientModal";
import FeedbackByMasterModal from "components/FeedbackByMasterModal";
import ModalConfirm from "components/Modal/ModalConfirm";
import ModalLoader from "components/ModalLoader";
import SuccessFeedbackModal from "components/SuccessFeedbackModal";
import SuccessTaskModal from "components/SuccessTaskModal";
import TaskEditConditionsModal from "components/TaskNegotiation/TaskEditConditionsModal";
import TaskHireMasterModal from "components/TaskNegotiation/TaskHireMasterModal";
import TaskMarkAsDoneModal from "components/TaskNegotiation/TaskMarkAsDoneModal";
import TaskOfferAcceptModal from "components/TaskNegotiation/TaskOfferAcceptModal";
import TaskOfferModal from "components/TaskNegotiation/TaskOfferModal";
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
import PWRecoverySuccess from "components/Auth/PWRecovery/Success";
import RegistrationSuccess from "components/Auth/RegistrationSuccess";
import ProfileEmailChangeModal from "../../ProfileEmailChangeModal";


interface Props {

}

const Modals = (props: Props) => {
  const dispatch = useDispatch()
  const key = useSelector((state: IRootState) => state.modal.modalKey)

  return (
    <>
      {key === 'signIn' && <SignInComponent
        isOpen={true}
        onRequestClose={() => dispatch(modalClose())}
      />}
      {key === 'signUp' && <SignUpComponent
        isOpen={true}
        onRequestClose={() => dispatch(modalClose())}
      />}
      {key === 'phoneConfirm' && <PhoneConfirmComponent
        isOpen={true}
        onRequestClose={() => dispatch(modalClose())}
      />}
      {key === 'pwRecFirst' && <PWRecoveryComponent
        isOpen={true}
        onRequestClose={() => dispatch(modalClose())}/>}
      {key === 'pwRecSuccess' && <PWRecoverySuccess
        isOpen={true}
        onRequestClose={() => dispatch(modalClose())}/>}

      {key === 'changePassword' && <ChangePassword isOpen={true}
                      onRequestClose={() => dispatch(modalClose())}/>}
      {key === 'taskOfferCreateModal' &&  <TaskOfferAcceptModal isOpen={true} onClose={() => dispatch(modalClose())}/>}
      {key === 'taskShareModal' && <TaskShareModal isOpen={true}/>}
      <ModalConfirm isOpen={key === 'confirm'} onRequestClose={() => dispatch(modalClose())}/>
      <ModalLoader isOpen={key === 'loader'} onRequestClose={() => {
      }}/>
      {key === 'taskHireMasterModal' &&
      <TaskHireMasterModal isOpen={key === 'taskHireMasterModal'} onClose={() => dispatch(modalClose())}/>}
      {key === 'taskMarkAsDoneModal' &&
      <TaskMarkAsDoneModal isOpen={key === 'taskMarkAsDoneModal'} onClose={() => dispatch(modalClose())}/>}
      {key === 'taskEditConditionsModal' &&
      <TaskEditConditionsModal isOpen={key === 'taskEditConditionsModal'} onClose={() => dispatch(modalClose())}/>}
      {key === 'finishTaskAsClientOpen' && <FinishingTaskByClientModal isOpen={key === 'finishTaskAsClientOpen'}/>}
      {key === 'feedbackByMasterOpen' && <FeedbackByMasterModal isOpen={key === 'feedbackByMasterOpen'}/>}
      {key === 'feedbackSiteModal' && <FeedbackSiteModal isOpen={key === 'feedbackSiteModal'}/>}
      {key === 'taskSuccessModal' && <SuccessTaskModal isOpen={key === 'taskSuccessModal'}/>}
      {key === 'feedbackSuccessModal' && <SuccessFeedbackModal isOpen={key === 'feedbackSuccessModal'}/>}
      {key === 'taskOfferShow' && <TaskOfferShowModal isOpen={key === 'taskOfferShow'} onClose={() => dispatch(modalClose())}/>}
      {key === 'emailChangeModal' && <ProfileEmailChangeModal isOpen={true}/>}

      {key === 'taskOfferModal' && <TaskOfferModal isOpen={true} onClose={() => dispatch(modalClose())}/>}
    </>
  )
}

export default withTranslation('header')(Modals)
