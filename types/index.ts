import phoneConfirmReducer, { PhoneConfirmState } from "components/Auth/PhoneConfirm/reducer";
import authReducer, {State as authState} from 'components/Auth/reducer'
import registrationCompleteReducer, { RegistrationCompleteState } from "components/Auth/RegistrationPage/reducer";
import authSignInReducer, { SignInState } from "components/Auth/SignIn/reducer";
import authSignUpReducer, { AuthSignUpState } from "components/Auth/SignUp/reducer";
import PWRecoveryReducer, { PWRecoveryState} from "components/Auth/PWRecovery/reducer"
import locationInputReducer, { LocationInputState } from "components/ui/InputLocation/reducer";
import categoryInputReducer, { CategoryInputState } from "components/ui/InputCategory/reducer"
import subCategoryInputReducer, { SubCategoryInputState } from "components/ui/InputSubCategory/reducer"
import { CreateTaskCompleteState } from "components/CreateTaskPage/reducer";

export interface IRootState {
  authComponent: authState,
  authSignUp: AuthSignUpState
  PWRecovery: PWRecoveryState,
  authSignIn: SignInState,
  phoneConfirmReducer: PhoneConfirmState,
  registrationComplete: RegistrationCompleteState,
  locationInput: LocationInputState,
  categoryInput: CategoryInputState
  subCategoryInput: SubCategoryInputState
  createTaskComplete: CreateTaskCompleteState
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
