import { ConfirmDataModal } from "types";
import ActionTypes from "./const";

export interface ModalState {
  modalKey: string,
  confirmData: ConfirmDataModal
}
const initialState: ModalState = {
  modalKey: '',
  confirmData: {
    onConfirm: () => {}
  }
}

export default function authReducer(state = {...initialState}, action) {

  switch(action.type) {

    case ActionTypes.LOADER_OPEN:
      state.modalKey = 'loader'
      break;
    case ActionTypes.SIGN_IN_OPEN:
      state.modalKey = 'signIn'
      break

    case ActionTypes.MODAL_CLOSE:
      state.modalKey = ''
      break

    case ActionTypes.SIGN_UP_OPEN:
      state.modalKey = 'signUp'
      break

    case ActionTypes.PHONE_CONFIRM_OPEN:
      state.modalKey = 'phoneConfirm'
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
    case ActionTypes.TASK_OFFER_CREATE_OPEN:
      state.modalKey = 'taskOfferCreateModal'
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
      state.modalKey = 'finishTaskAsMasterOpen'
      break
    case ActionTypes.CONFIRM_MODAL_OPEN:
      state.modalKey = 'confirm'
      state.confirmData = action.payload
      break
    case ActionTypes.CHANGE_CONFIRM_DATA:
      state.confirmData = action.payload
      break
  }

  return state
}
