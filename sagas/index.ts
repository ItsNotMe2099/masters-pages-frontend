import phoneConfirmSaga from "components/Auth/PhoneConfirm/sagas";
import PWRecoverySaga from "components/Auth/PWRecovery/sagas";
import registrationCompleteSaga from "components/Auth/RegistrationPage/sagas";
import signInSaga from "components/Auth/SignIn/sagas";
import signUpSaga from "components/Auth/SignUp/sagas";
import { all } from 'redux-saga/effects'
import apiSaga from "sagas/apiSaga";

export const rootSaga = function* root() {
  yield all([
    apiSaga(),
    signUpSaga(),
    phoneConfirmSaga(),
    registrationCompleteSaga(),
    signInSaga(),
    PWRecoverySaga()
  ]);
};
