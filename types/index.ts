import { ChangePasswordState } from "components/Auth/ChangePassword/reducer";
import phoneConfirmReducer, { PhoneConfirmState } from "components/Auth/PhoneConfirm/reducer";
import authReducer, {State as authState} from 'components/Auth/reducer'
import registrationCompleteReducer, { RegistrationCompleteState } from "components/Auth/RegistrationPage/reducer";
import authSignInReducer, { SignInState } from "components/Auth/SignIn/reducer";
import authSignUpReducer, { AuthSignUpState } from "components/Auth/SignUp/reducer";
import PWRecoveryReducer, { PWRecoveryState} from "components/Auth/PWRecovery/reducer"
import { ProfileState } from "components/Profile/reducer";
import { SkillState } from "components/Skill/reducer";
import { CountryInputState } from "components/ui/Inputs/InputCountry/reducer";
import locationInputReducer, { LocationInputState } from "components/ui/Inputs/InputLocation/reducer";
import categoryInputReducer, { CategoryInputState } from "components/ui/Inputs/InputCategory/reducer"
import subCategoryInputReducer, { SubCategoryInputState } from "components/ui/Inputs/InputSubCategory/reducer"
import subCategoryCheckboxReducer, { SubCategoryCheckboxState } from 'components/ui/Form/MasterProfile/CheckboxSubCategory/reducer'
import { CreateTaskCompleteState } from "components/CreateTaskPage/reducer";

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
  skill: SkillState
}

export interface ProfileData{
  id?: number
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
}

export interface IResponse {
  data: any
  err: any
}
