import phoneConfirmSaga from "components/Auth/PhoneConfirm/sagas";
import PWRecoverySaga from "components/Auth/PWRecovery/sagas";
import registrationCompleteSaga from "components/Auth/RegistrationPage/sagas";
import signInSaga from "components/Auth/SignIn/sagas";
import signUpSaga from "components/Auth/SignUp/sagas";
import PWChangeSaga from "components/Auth/ChangePassword/sagas";
import CreateTaskCompleteSaga from "components/CreateTaskPage/sagas";
import ProfileSaga from "components/Profile/sagas";
import ProfileSearchSaga from "components/ProfileSearch/sagas";
import SkillSaga from "components/Skill/sagas";
import TaskOfferSaga from "components/TaskOffer/sagas";
import TaskSearchSaga from "components/TaskSearch/sagas";
import TaskUserSaga from "components/TaskUser/sagas";
import { all } from 'redux-saga/effects'
import apiSaga from "sagas/apiSaga";
import SavedPeopleSaga from "components/SavedPeople/sagas";
import SavedSearchesSaga from "components/SavedSearches/sagas";
import SavedTasksSaga from "components/SavedTasks/sagas";
import ProfileFeedbackSaga from "components/ProfileFeedback/sagas";

export const rootSaga = function* root() {
  yield all([
    apiSaga(),
    signUpSaga(),
    phoneConfirmSaga(),
    registrationCompleteSaga(),
    signInSaga(),
    PWRecoverySaga(),
    CreateTaskCompleteSaga(),
    ProfileSaga(),
    PWChangeSaga(),
    SkillSaga(),
    TaskSearchSaga(),
    ProfileSearchSaga(),
    TaskUserSaga(),
    TaskOfferSaga(),
    SavedPeopleSaga(),
    SavedSearchesSaga(),
    SavedTasksSaga(),
    ProfileFeedbackSaga()
  ]);
};
