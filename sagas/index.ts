import phoneConfirmSaga from "components/Auth/PhoneConfirm/sagas";
import PWRecoverySaga from "components/Auth/PWRecovery/sagas";
import registrationCompleteSaga from "components/Auth/RegistrationPage/sagas";
import signInSaga from "components/Auth/SignIn/sagas";
import signUpSaga from "components/Auth/SignUp/sagas";
import PWChangeSaga from "components/Auth/ChangePassword/sagas";
import ChatSocketSaga from "components/Chat/chatSocketSaga";
import ChatSaga from "components/Chat/sagas";
import CreateTaskCompleteSaga from "components/CreateTaskPage/sagas";
import ProfileSaga from "components/Profile/sagas";
import ProfileSearchSaga from "components/ProfileSearch/sagas";
import SkillSaga from "components/Skill/sagas";
import TaskOfferSaga from "components/TaskNegotiation/sagas";
import TaskSearchSaga from "components/TaskSearch/sagas";
import TaskUserSaga from "components/TaskUser/sagas";
import { all } from 'redux-saga/effects'
import apiSaga from "sagas/apiSaga";
import SavedPeopleSaga from "components/SavedPeople/sagas";
import SavedSearchesSaga from "components/SavedSearches/sagas";
import SavedTasksSaga from "components/SavedTasks/sagas";
import ProfileFeedbackSaga from "components/ProfileFeedback/sagas";
import registrationPhoneSaga from "components/Auth/RegistrationPhone/sagas";
import authSaga from "components/Auth/sagas";
import pushSaga from "components/Push/sagas";
import profileSettingsSaga from "../components/ProfileSettings/sagas";
import ProfileWorkExperienceSaga from "../components/ProfileWorkExpirience/sagas";
import ProfileTabSaga from 'components/ProfileTab/sagas'
import ProfilePortfolioSaga from 'components/ProfilePortfolio/sagas'
import ProfileGallerySaga from 'components/ProfileGallery/sagas'
import ProfileStatSaga from 'components/ProfileStat/sagas'
import ProfileRecommendationSaga from 'components/ProfileRecommendations/sagas'
import EventSaga from 'components/Events/sagas'
import ShareSaga from 'components/Share/sagas'
import InviteSaga from 'components/Invite/sagas'
import PostSaga from 'components/Post/sagas'
import NewsSaga from 'components/News/sagas'
import FollowerSaga from 'components/Follower/sagas'
import ReportSaga from 'components/Report/sagas'
import ContactsSaga from 'components/Contacts/sagas'

export const rootSaga = function* root() {
  yield all([
    authSaga(),
    apiSaga(),
    signUpSaga(),
    phoneConfirmSaga(),
    registrationPhoneSaga(),
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
    ChatSaga(),
    ChatSocketSaga(),
    SavedTasksSaga(),
    ProfileFeedbackSaga(),
    pushSaga(),
    profileSettingsSaga(),
    ProfileWorkExperienceSaga(),
    ProfileTabSaga(),
    ProfilePortfolioSaga(),
    ProfileGallerySaga(),
    ProfileStatSaga(),
    ProfileRecommendationSaga(),
    EventSaga(),
    ShareSaga(),
    InviteSaga(),
    PostSaga(),
    NewsSaga(),
    FollowerSaga(),
    ReportSaga(),
    ContactsSaga()
  ]);
};
