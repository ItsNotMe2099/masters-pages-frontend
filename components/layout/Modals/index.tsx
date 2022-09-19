import ChangePassword from 'components/Auth/ChangePassword'
import PhoneConfirmComponent from 'components/Auth/PhoneConfirm'
import FeedbackSiteModal from 'components/FeedbackSiteModal'
import FinishingTaskByClientModal from 'components/FinishingTaskByClientModal'
import FeedbackByMasterModal from 'components/FeedbackByMasterModal'
import ModalConfirm from 'components/Modal/ModalConfirm'
import ModalLoader from 'components/ModalLoader'
import SuccessFeedbackModal from 'components/SuccessFeedbackModal'
import SuccessTaskModal from 'components/SuccessTaskModal'
import TaskEditConditionsModal from 'components/TaskNegotiation/TaskEditConditionsModal'
import TaskHireMasterModal from 'components/TaskNegotiation/TaskHireMasterModal'
import TaskMarkAsDoneModal from 'components/TaskNegotiation/TaskMarkAsDoneModal'
import TaskOfferAcceptModal from 'components/TaskNegotiation/TaskOfferAcceptModal'
import TaskOfferModal from 'components/TaskNegotiation/TaskOfferModal'
import TaskOfferShowModal from 'components/TaskNegotiation/TaskOfferShow'
import TaskShareModal from 'components/TaskShareModal'
import { default as React } from 'react'
import SignInComponent from 'components/Auth/SignIn'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'types'
import {
  confirmModalClose,
  modalClose,
} from 'components/Modal/actions'
import SignUpComponent from 'components/Auth/SignUp'
import PWRecoveryComponent from 'components/Auth/PWRecovery'
import PWRecoverySuccess from 'components/Auth/PWRecovery/Success'
import ProfileEmailChangeModal from '../../ProfileEmailChangeModal'
import SaveTaskSearchModal from 'components/SaveTaskSearchModal'
import SaveProfileSearchModal from 'components/SaveProfileSearchModal'
import ProfilePhoneChangeModal from 'components/ProfilePhoneChangeModal'
import RegistrationPhoneConfirm from "components/Auth/RegistrationPhoneConfirm";


interface Props {

}

const Modals = (props: Props) => {
  const dispatch = useDispatch()
  const key = useSelector((state: IRootState) => state.modal.modalKey)
  const confirmKey = useSelector((state: IRootState) => state.modal.confirmModalKey)
  console.log('key', key)
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
      {key === 'registrationPhoneConfirm' && <RegistrationPhoneConfirm
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
      {confirmKey === 'confirm' && <ModalConfirm isOpen={true} onRequestClose={() => {
        console.log('CloseConfigm')
        dispatch(confirmModalClose())
      }
      }/>}

      <ModalLoader isOpen={key === 'loader'} onRequestClose={() => {
      }}/>
      {key === 'taskHireMasterModal' &&
      <TaskHireMasterModal isOpen={key === 'taskHireMasterModal'} onClose={() => dispatch(modalClose())}/>}
      {key === 'taskMarkAsDoneModal' &&
      <TaskMarkAsDoneModal isOpen={key === 'taskMarkAsDoneModal'} onClose={() => dispatch(modalClose())}/>}
      {key === 'taskEditConditionsModal' &&
      <TaskEditConditionsModal isOpen={key === 'taskEditConditionsModal'} onClose={() => dispatch(modalClose())}/>}
      {key === 'finishTaskAsClientOpen' && <FinishingTaskByClientModal isOpen={key === 'finishTaskAsClientOpen'}/>}
      {key === 'feedbackByMasterOpen' && <FeedbackByMasterModal isOpen={key === 'feedbackByMasterOpen'} onRequestClose={() => dispatch(modalClose())}/>}
      {key === 'feedbackSiteModal' && <FeedbackSiteModal isOpen={key === 'feedbackSiteModal'}/>}
      {key === 'taskSuccessModal' && <SuccessTaskModal isOpen={key === 'taskSuccessModal'}/>}
      {key === 'feedbackSuccessModal' && <SuccessFeedbackModal isOpen={key === 'feedbackSuccessModal'}/>}
      {key === 'taskOfferShow' && <TaskOfferShowModal isOpen={key === 'taskOfferShow'} onClose={() => dispatch(modalClose())}/>}
      {key === 'emailChangeModal' && <ProfileEmailChangeModal isOpen={true}/>}
      {key === 'phoneChangeModal' && <ProfilePhoneChangeModal isOpen={true}/>}
      {key === 'saveTaskSearchModal' && <SaveTaskSearchModal isOpen={true} onRequestClose={() => dispatch(modalClose())}/>}
      {key === 'saveProfileSearchModal' && <SaveProfileSearchModal isOpen={true} onRequestClose={() => dispatch(modalClose())}/>}

      {key === 'taskOfferModal' && <TaskOfferModal isOpen={true} onClose={() => dispatch(modalClose())}/>}
    </>
  )
}

export default Modals
