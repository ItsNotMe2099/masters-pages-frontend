import ApiActionTypes from 'constants/api'
import { SkillData} from 'types'
import ActionTypes from './const'
import { IOrganization } from 'data/intefaces/IOrganization'
export interface OrganizationState {
  currentOrganization: IOrganization
  currentSkill: SkillData,
  formIsSuccess: boolean
  formError: string,
  formErrorByKey: any,
  loading: boolean,
  formLoading: boolean,
  avatarLoading: boolean,
  avatarFormError: null,
  isCompleted: boolean,
  role: string,
  roleTemp: string,
  showForms: string[],
  lastFormKey: string
}

const initialState: OrganizationState = {
  formIsSuccess: false,
  formError: '',
  formErrorByKey: {},
  lastFormKey: null,
  formLoading: false,
  loading: false,
  isCompleted: false,
  avatarLoading: false,
  role: null,
  roleTemp: null,
  currentOrganization: null,
  avatarFormError: null,
  showForms: [],
  currentSkill: null
}

export default function OrganizationReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.UPDATE_ORG_BY_FORM:
      if(action.payload.key) {
        state.formErrorByKey[action.payload.key] = null
      }

      state.lastFormKey = action.payload.key
      break
    case ActionTypes.UPDATE_ORG:
      state.formError = ''
      state.isCompleted = false
      state.formLoading = true
      break
    case ActionTypes.UPDATE_ORG_AVATAR:
      state.avatarLoading = true
      break
    case ActionTypes.UPDATE_ORG_AVATAR + ApiActionTypes.FAIL:
      state.avatarLoading = false
      state.avatarFormError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      break
    case ActionTypes.UPDATE_ORG + ApiActionTypes.SUCCESS:
      state.formLoading = false
      state.formError = ''
      state.formIsSuccess = true
      state.currentOrganization = {...state.currentOrganization, ...action.payload}
      state.avatarLoading = false
      if(state.lastFormKey) {
        state.formErrorByKey[state.lastFormKey] = null
      }
      state.lastFormKey = null
      break
    case ActionTypes.UPDATE_ORG + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      if(state.lastFormKey) {
        state.formErrorByKey[state.lastFormKey] =  state.formError
      }
      state.formLoading = false
      state.avatarLoading = false
      break

    case ActionTypes.SHOW_FORM:
      state.showForms = state.showForms.find(key => key === action.payload.key) ? state.showForms : [...state.showForms, action.payload.key]
      break
    case ActionTypes.HIDE_FORM:
      state.showForms = state.showForms.filter(key => key !== action.payload.key)
      break
  }

   return {...state}
}
