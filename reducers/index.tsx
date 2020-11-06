import authReducer from 'components/Auth/reducer';
import authSignUpReducer from 'components/Auth/SignUp/reducer';
import phoneConfirmReducer from 'components/Auth/PhoneConfirm/reducer';
import registrationCompleteReducer from 'components/Auth/RegistrationPage/reducer';
import authSignInReducer from 'components/Auth/SignIn/reducer';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import PWRecoveryReducer from 'components/Auth/PWRecovery/reducer'
import locationInputReducer from 'components/ui/InputLocation/reducer'
import categoryInputReducer from 'components/ui/InputCategory/reducer'
import subCategoryInputReducer from 'components/ui/InputSubCategory/reducer'
import CreateTaskReducer from 'components/CreateTaskPage/reducer';

export default combineReducers({
  form: formReducer,
  authComponent: authReducer,
  authSignUp: authSignUpReducer,
  authSignIn: authSignInReducer,
  phoneConfirmReducer: phoneConfirmReducer,
  registrationComplete: registrationCompleteReducer,
  PWRecovery: PWRecoveryReducer,
  locationInput: locationInputReducer,
  categoryInput: categoryInputReducer,
  subCategoryInput: subCategoryInputReducer,
  createTaskComplete: CreateTaskReducer
})
