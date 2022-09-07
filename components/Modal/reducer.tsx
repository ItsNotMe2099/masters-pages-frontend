import { ConfirmDataModal } from 'types'
import ActionTypes from './const'

export interface ModalState {
  modalKey: string,
  confirmModalKey: string
  confirmData: ConfirmDataModal
}
const initialState: ModalState = {
  modalKey: '',
  confirmModalKey: '',
  confirmData: {

  }
}

export default function authReducer(state = {...initialState}, action) {

  switch(action.type) {

    case ActionTypes.LOADER_OPEN:
      state.modalKey = 'loader'
      break
    case ActionTypes.SIGN_IN_OPEN:
      state.modalKey = 'signIn'
      break

    case ActionTypes.MODAL_CLOSE:
      console.log('resetModal')
      state.modalKey = ''
      state.confirmModalKey = ''
      break

    case ActionTypes.CONFIRM_MODAL_CLOSE:
      state.confirmModalKey = ''
      break

    case ActionTypes.SIGN_UP_OPEN:
      state.modalKey = 'signUp'
      break

    case ActionTypes.PHONE_CONFIRM_OPEN:
      state.modalKey = 'phoneConfirm'
      break
    case ActionTypes.REGISTRATION_PHONE_OPEN:

      state.modalKey = 'registrationPhone'
      break
    case ActionTypes.REGISTRATION_PHONE_CONFIRM_OPEN:
      state.modalKey = 'registrationPhoneConfirm'
      break
    case ActionTypes.REGISTRATION_SUCCESS_OPEN:
      state.modalKey = 'registrationSuccess'
      break
    case ActionTypes.PASSWORD_RECOVERY_FIRST_STEP_OPEN:
      state.modalKey = 'pwRecFirst'
      break

    case ActionTypes.PASSWORD_RECOVERY_SUCCESS:
      state.modalKey = 'pwRecSuccess'
      break
    case ActionTypes.CHANGE_PASSWORD_OPEN:
      state.modalKey = 'changePassword'
      break
    case ActionTypes.SKILL_MODAL_OPEN:
      state.modalKey = 'skillForm'
      break
    case ActionTypes.SKILL_CATEGORY_MODAL_OPEN:
      state.modalKey = 'skillCategoryForm'
      break
    case ActionTypes.TASK_UPDATE_MODAL_OPEN:
      state.modalKey = 'tabOrderEditModal'
      break
    case ActionTypes.PROJECT_MODAL_OPEN:
      state.modalKey = 'projectModal'
      break
    case ActionTypes.TASK_OFFER_CREATE_OPEN:
      state.modalKey = 'taskOfferCreateModal'
      break
    case ActionTypes.TASK_OFFER_SHOW_OPEN:
      state.modalKey = 'taskOfferShow'
      break
    case ActionTypes.TASK_SHARE_OPEN:
      state.modalKey = 'taskShareModal'
      break
    case ActionTypes.TASK_HIRE_MASTER_OPEN:
      state.modalKey = 'taskHireMasterModal'
      break
    case ActionTypes.TASK_MARK_AS_DONE_OPEN:
      state.modalKey = 'taskMarkAsDoneModal'
      break
    case ActionTypes.TASK_EDIT_CONDITIONS_OPEN:
      state.modalKey = 'taskEditConditionsModal'
      break
    case ActionTypes.FINISH_TASK_AS_CLIENT_OPEN:
      state.modalKey = 'finishTaskAsClientOpen'
      break
    case ActionTypes.FINISH_TASK_AS_MASTER_OPEN:
      state.modalKey = 'feedbackByMasterOpen'
      break
    case ActionTypes.FEEDBACK_SITE_OPEN:
      state.modalKey = 'feedbackSiteModal'
      break
    case ActionTypes.FEEDBACK_SUCCESS_OPEN:
      state.modalKey = 'feedbackSuccessModal'
      break
    case ActionTypes.TASK_SUCCESS_OPEN:
      state.modalKey = 'taskSuccessModal'
      break
    case ActionTypes.TASK_OFFER_OPEN:
      state.modalKey = 'taskOfferModal'
      break
    case ActionTypes.EMAIL_CHANGE_OPEN:
      state.modalKey = 'emailChangeModal'
      break
    case ActionTypes.PHONE_CHANGE_OPEN:
      state.modalKey = 'phoneChangeModal'
      break
    case ActionTypes.EVENT_CREATE_OPEN:
      state.modalKey = 'eventCreateModal'
      break
    case ActionTypes.EVENT_EDIT_OPEN:
      state.modalKey = 'eventEditModal'
      break
    case ActionTypes.EVENT_EXPENSE_PLANNED_OPEN:
      state.modalKey = 'eventExpensePlannedModal'
      break
    case ActionTypes.EVENT_EXPENSE_ACTUAL_OPEN:
      state.modalKey = 'eventExpenseActualModal'
      break
    case ActionTypes.SAVE_TASK_SEARCH_OPEN:
      state.modalKey = 'saveTaskSearchModal'
      break
    case ActionTypes.SAVE_PROFILE_SEARCH_OPEN:
      state.modalKey = 'saveProfileSearchModal'
      break
    case ActionTypes.POST_EDIT_OPEN:
      state.modalKey = 'postEditOpen'
      break
    case ActionTypes.CONFIRM_MODAL_OPEN:
      state.confirmModalKey = 'confirm'
      state.confirmData = action.payload
      break
    case ActionTypes.CHANGE_CONFIRM_DATA:
      state.confirmData = action.payload
      break

  }

  return {...state}
}
