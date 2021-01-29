import authReducer from 'components/Auth/reducer';
import authSignUpReducer from 'components/Auth/SignUp/reducer';
import phoneConfirmReducer from 'components/Auth/PhoneConfirm/reducer';
import registrationCompleteReducer from 'components/Auth/RegistrationPage/reducer';
import authSignInReducer from 'components/Auth/SignIn/reducer';
import ChatReducer from "components/Chat/reducer";
import ProfileSearchReducer from "components/ProfileSearch/reducer";
import TaskOfferReducer from "components/TaskNegotiation/reducer";
import TaskSearchReducer from "components/TaskSearch/reducer";
import TaskUserReducer from "components/TaskUser/reducer";
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import PWRecoveryReducer from 'components/Auth/PWRecovery/reducer'
import PWChangeReducer from 'components/Auth/ChangePassword/reducer'
import locationInputReducer from 'components/ui/Inputs/InputLocation/reducer'
import countryInputReducer from 'components/ui/Inputs/InputCountry/reducer'
import categoryInputReducer from 'components/ui/Inputs/InputCategory/reducer'
import subCategoryInputReducer from 'components/ui/Inputs/InputSubCategory/reducer'
import subCategoryCheckboxReducer from 'components/ui/Form/MasterProfile/CheckboxSubCategory/reducer'
import CreateTaskReducer from 'components/CreateTaskPage/reducer';
import ProfileReducer from 'components/Profile/reducer';
import SkillReducer from 'components/Skill/reducer';
import ModalReducer from 'components/Modal/reducer';
import SavedSearchesReducer from 'components/SavedSearches/reducer';
import SavedPeopleReducer from 'components/SavedPeople/reducer';
import SavedTasksReducer from 'components/SavedTasks/reducer';
import ProfileFeedbackReducer from 'components/ProfileFeedback/reducer';
import PublicProfileReducer from 'components/PublicProfile/reducer';

export default combineReducers({
  form: formReducer,
  authComponent: authReducer,
  authSignUp: authSignUpReducer,
  authSignIn: authSignInReducer,
  phoneConfirmReducer: phoneConfirmReducer,
  registrationComplete: registrationCompleteReducer,
  PWRecovery: PWRecoveryReducer,
  locationInput: locationInputReducer,
  countryInput: countryInputReducer,
  categoryInput: categoryInputReducer,
  subCategoryInput: subCategoryInputReducer,
  createTaskComplete: CreateTaskReducer,
  subCategoryCheckbox: subCategoryCheckboxReducer,
  profile: ProfileReducer,
  changePassword: PWChangeReducer,
  skill: SkillReducer,
  modal: ModalReducer,
  taskSearch: TaskSearchReducer,
  profileSearch: ProfileSearchReducer,
  taskUser: TaskUserReducer,
  taskOffer: TaskOfferReducer,
  savedSearch: SavedSearchesReducer,
  savedPeople: SavedPeopleReducer,
  chat: ChatReducer,
  savedTasks: SavedTasksReducer,
  profileFeedback: ProfileFeedbackReducer,
  publicProfile: PublicProfileReducer
})
