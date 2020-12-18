import { ChangePasswordState } from "components/Auth/ChangePassword/reducer";
import phoneConfirmReducer, { PhoneConfirmState } from "components/Auth/PhoneConfirm/reducer";
import authReducer, {State as authState} from 'components/Auth/reducer'
import registrationCompleteReducer, { RegistrationCompleteState } from "components/Auth/RegistrationPage/reducer";
import authSignInReducer, { SignInState } from "components/Auth/SignIn/reducer";
import authSignUpReducer, { AuthSignUpState } from "components/Auth/SignUp/reducer";
import PWRecoveryReducer, { PWRecoveryState} from "components/Auth/PWRecovery/reducer"
import { ModalState } from "components/Modal/reducer";
import { ProfileState } from "components/Profile/reducer";
import { SkillState } from "components/Skill/reducer";
import { TaskSearchState } from "components/TaskSearch/reducer";
import { TaskUserState } from "components/TaskUser/reducer";
import { CountryInputState } from "components/ui/Inputs/InputCountry/reducer";
import locationInputReducer, { LocationInputState } from "components/ui/Inputs/InputLocation/reducer";
import categoryInputReducer, { CategoryInputState } from "components/ui/Inputs/InputCategory/reducer"
import subCategoryInputReducer, { SubCategoryInputState } from "components/ui/Inputs/InputSubCategory/reducer"
import subCategoryCheckboxReducer, { SubCategoryCheckboxState } from 'components/ui/Form/MasterProfile/CheckboxSubCategory/reducer'
import { CreateTaskCompleteState } from "components/CreateTaskPage/reducer";
import { SavedSearchesState } from "components/SavedSearches/reducer";
import { SavedPeopleState } from "components/SavedPeople/reducer";

export interface IRootState {
  authComponent: authState,
  authSignUp: AuthSignUpState
  PWRecovery: PWRecoveryState,
  authSignIn: SignInState,
  phoneConfirmReducer: PhoneConfirmState,
  registrationComplete: RegistrationCompleteState,
  locationInput: LocationInputState,
  countryInput: CountryInputState,
  categoryInput: CategoryInputState
  subCategoryInput: SubCategoryInputState
  subCategoryCheckbox: SubCategoryCheckboxState
  createTaskComplete: CreateTaskCompleteState
  profile: ProfileState,
  changePassword: ChangePasswordState,
  skill: SkillState,
  modal: ModalState,
  taskSearch: TaskSearchState,
  taskUser: TaskUserState
  savedSearch: SavedSearchesState
  savedPeople: SavedPeopleState
}
export interface ConfirmDataModal {
  cancelText?: string,
  confirmText?: string
  onConfirm: () => void,
  onCancel?: () => void
}
export interface ProfileData{
  id?: number
  avatar?: string
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  geonameid?: string
  birthday?: string
  country?: string
  city?: string
  region?: string
  zipcode?: string
  address1?: string
  address2?: string
  photo ?: string
  preferredCategories ?: number[],
  preferredSubCategories ?: number[]
}

export interface Category{
  id?: number
  name?: string
  icon: string,
}
export interface SkillData{
  id?: number
  title?: string
  description?: string
  categoryId: number,
  subCategoryId: number,
  subCategory?: Category
  category?: Category
  photos?: string[],
  ratePerHour: number,
  price: number
}
export interface SkillListItem{
  id?: number
  name?: string
  icon: string,
  skills: SkillData[]
}

export interface ITask{
  id: number,
  profileId: number,
  title: string
  description: string
  categoryId: number,
  subCategoryId: number,
  masterRole: string
  country: string
  city: string
  address: string
  geonameid: number,
  location: {
    lng: number,
    lat: number,
  },
  isExactLocation: boolean
  ratePerHour: number,
  maxWeekHours: number,
  budget: number,
  estimate: number
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  profile: ProfileData
  photos: string[]
}

export interface ISavedSearch{

}

export interface ISavedPeople{
  id: number,
  profileId: number,
  title: string
  description: string
  categoryId: number,
  subCategoryId: number,
  masterRole: string
  country: string
  city: string
  address: string
  geonameid: number,
  location: {
    lng: number,
    lat: number,
  }
}

export interface BaseAction {
  type: string
  payload: any
}

export interface IRequestData {
  url: string
  method?: 'POST' | 'PUT' | 'DELETE' | 'GET'
  data?: any
  token?: string
  host?: string
  profileRole?: string
}

export interface IResponse {
  data: any
  err: any
}
