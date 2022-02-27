import {ChangePasswordState} from "components/Auth/ChangePassword/reducer";
import phoneConfirmReducer, {PhoneConfirmState} from "components/Auth/PhoneConfirm/reducer";
import authReducer, {State as authState} from 'components/Auth/reducer'
import registrationCompleteReducer, {RegistrationCompleteState} from "components/Auth/RegistrationPage/reducer";
import authSignInReducer, {SignInState} from "components/Auth/SignIn/reducer";
import authSignUpReducer, {AuthSignUpState} from "components/Auth/SignUp/reducer";
import PWRecoveryReducer, {PWRecoveryState} from "components/Auth/PWRecovery/reducer"
import {ChatState} from "components/Chat/reducer";
import {ModalState} from "components/Modal/reducer";
import {ProfileState} from "components/Profile/reducer";
import {ProfileSearchState} from "components/ProfileSearch/reducer";
import {SkillState} from "components/Skill/reducer";
import {TaskOfferState} from "components/TaskNegotiation/reducer";
import {TaskSearchState} from "components/TaskSearch/reducer";
import {TaskUserState} from "components/TaskUser/reducer";
import {CountryInputState} from "components/ui/Inputs/InputCountry/reducer";
import locationInputReducer, {LocationInputState} from "components/ui/Inputs/InputLocation/reducer";
import categoryInputReducer, {CategoryInputState} from "components/ui/Inputs/InputCategory/reducer"
import subCategoryInputReducer, {SubCategoryInputState} from "components/ui/Inputs/InputSubCategory/reducer"
import subCategoryCheckboxReducer, {SubCategoryCheckboxState} from 'components/ui/Form/MasterProfile/CheckboxSubCategory/reducer'
import {CreateTaskCompleteState} from "components/CreateTaskPage/reducer";
import {SavedSearchesState} from "components/SavedSearches/reducer";
import {SavedPeopleState} from "components/SavedPeople/reducer";
import {SavedTasksState} from "components/SavedTasks/reducer";
import {ProfileFeedbackState} from "components/ProfileFeedback/reducer";
import {PublicProfileState} from "components/PublicProfile/reducer";
import {TaskSearchWithLimitState} from "components/Split/OrderingSection/Task/reducer";
import {StatState} from "../components/Stat/reducer";
import {RegistrationPhoneState} from "../components/Auth/RegistrationPhone/reducer";
import {PushState} from "../components/Push/reducer";
import {ProfileSettingsState} from "../components/ProfileSettings/reducer";
import {ProfileWorkExperienceState} from 'components/ProfileWorkExpirience/reducer'
import {ProfileTabState} from 'components/ProfileTab/reducer'
import {ProfilePortfolioState} from 'components/ProfilePortfolio/reducer'
import {ProfileGalleryState} from 'components/ProfileGallery/reducer'
import {ProfileStatState} from 'components/ProfileStat/reducer'
import ProfileStatItemCard
  from 'components/PublicProfile/components/view/CardProfileStat/components/ProfileStatItemCard'
import {ProfileRecommendationState} from 'components/ProfileRecommendations/reducer'
import {EventsState} from 'components/Events/reducer'
import {ShareState} from 'components/Share/reducer'
import {InviteState} from 'components/Invite/reducer'
import {PostState} from 'components/Post/reducer'
import {NewsState} from 'components/News/reducer'
import {FollowerState} from 'components/Follower/reducer'
import {ReportState} from 'components/Report/reducer'
import {ContactsState} from 'components/Contacts/reducer'
import {ILocation} from 'data/intefaces/ILocation'
import {IProfile} from 'data/intefaces/IProfile'
import {IServiceCategory} from 'data/intefaces/IServiceCategory'

export interface IRootState {
  authComponent: authState,
  authSignUp: AuthSignUpState
  PWRecovery: PWRecoveryState,
  authSignIn: SignInState,
  registrationPhone: RegistrationPhoneState,
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
  profileSearch: ProfileSearchState,
  taskUser: TaskUserState,
  taskOffer: TaskOfferState
  savedSearch: SavedSearchesState
  savedPeople: SavedPeopleState
  chat: ChatState
  savedTasks: SavedTasksState
  profileFeedback: ProfileFeedbackState
  publicProfile: PublicProfileState
  taskSearchWithLimit: TaskSearchWithLimitState
  stat: StatState
  push: PushState,
  profileSettings: ProfileSettingsState,
  profileWorkExperience: ProfileWorkExperienceState,
  profileTab: ProfileTabState,
  profilePortfolio: ProfilePortfolioState
  profileGallery: ProfileGalleryState
  news: NewsState
  profileStat: ProfileStatState
  profileRecommendation: ProfileRecommendationState
  event: EventsState,
  share: ShareState,
  invite: InviteState,
  post: PostState,
  follower: FollowerState,
  report: ReportState
  contacts: ContactsState
}

export interface ConfirmDataModal {
  title?: string
  description?: string
  cancelText?: string,
  confirmText?: string
  onConfirm?: () => void,
  onCancel?: () => void
  loading?: boolean
}

export interface IProfilePreferWorkIn {
  type: 'offline' | 'online'
  location: string
}

export interface ContactData {
  contactProfile: IProfile,
  contactProfileId: number
}
export enum UserActivityStatus {
  Offline = "offline",
  Online = "online",
}

export interface IProfileSettingsNotificationItem {
  push: boolean,
  email: boolean
}

export interface IProfileSettingsNotification {
  messages: IProfileSettingsNotificationItem
  newTaskOffer: IProfileSettingsNotificationItem
  newTaskResponse: IProfileSettingsNotificationItem
  taskOfferDeclined: IProfileSettingsNotificationItem
  taskResponseDeclined: IProfileSettingsNotificationItem
  newFeedback: IProfileSettingsNotificationItem
}

export interface IProfileSettings {
  language?: string
  notifications: IProfileSettingsNotification
}

export interface FullIProfile {
  id: number
  userId: number
  role: string
  firstName: string
  lastName: string
  phone: string
  email: string
  birthday: string
  country: string
  city: string
  region: string
  zipcode: string
  address1: string
  address2: string
  geonameid: number
  location: null
  isExactLocation: boolean
  createdAt: string
  updatedAt: string
  deletedAt: null
  photoObject: {
    id: string
    urlS3: string
    createdAt: string
    updatedAt: string
    deletedAt: null
  },
  skills: SkillData[]
  photo: string
}

export interface Category {
  id?: number
  name?: string
  icon: string,
  translations: any[]
}

export interface SkillData {
  id?: number
  title?: string
  description?: string
  categoryId: number,
  subCategoryId: number,
  mainCategory?: Category
  subCategory?: Category
  category?: Category
  photos?: string[],
  ratePerHour: number,
  price: number,
  skills: SkillData[]

  tasksCount?: number
  likesCount?: number
  feedbacksCount?: number
  totalHours?: number
  rating?: number
}

export interface SkillListItem {
  id?: number
  name?: string
  icon: string,
  mainCategory: IServiceCategory
  category: IServiceCategory
  subCategory: IServiceCategory
  skills: SkillData[]
}

export interface ProfileWorkExperience {
  id?: number
  title?: string
  description?: string
  profileId: number
  categoryId: number
  subCategoryId: number
  photo: string
  fromDate: string
  toDate: string
  link: string
  company: string
  visible: boolean
  sort: number
  createdAt: string
}

export interface IProfilePortfolio {
  id: number
  profileId: number
  profileTabId: number
  categoryId: number
  subCategoryId: number
  title: string
  description: string
  photo: string
  files: string[]
  length: string
  link: string
  visible: boolean
  sort: number
  createdAt: Date;
}

export interface IProfileGalleryItem {
  id: number
  profileId: number
  profileTabId: number
  categoryId: number
  subCategoryId: number
  title: string
  description: string
  photo: string
  link: string
  commentsAllowed: boolean,
  commentsCount: string | number
  likesCount: string | number
  visible: boolean
  sort: number
  isLiked: boolean
  createdAt: Date;
}


export interface IProfileGalleryComment {
  id?: number
  profileId?: number
  content: string
  profileGalleryId: number
  profile?: IProfile
  createdAt?: Date;
}


export interface IProfileTab {
  id?: number
  title?: string
  profileId?: number
  categoryId?: number
  subCategoryId?: number
  type?: string
  sort?: number
  createdAt?: string
}


export enum ITaskNegotiationType {
  ResponseToTask = 'response_to_task',
  TaskOffer = 'task_offer',
  TaskNegotiation = 'task_negotiation',
  MarkAsDone = 'mark_as_done',
  TaskCompleted = 'task_completed',
  TaskCanceled = 'task_canceled',
  MasterAssigned = 'master_assigned',
}

export enum ITaskNegotiationState {
  SentToMaster = 'sent_to_master',
  SentToClient = 'sent_to_client',
  Declined = 'declined',
  Accepted = 'accepted',
}

export interface ITaskNegotiation {
  id: number,
  profile: IProfile,
  profileId: number,
  authorId: number,
  clientId: number,
  taskId: number,
  type: ITaskNegotiationType,
  state: ITaskNegotiationState,
  message: string,
  ratePerHour: number,
  budget: number,
  estimate: number,
  deadline: string,
  createdAt: string,
  isRead: boolean,
  priceType: 'fixed' | 'rate'

}

export enum ITaskStatus {
  Draft = 'draft',
  Published = 'published',
  PrivatelyPublished = 'privately_published',
  Negotiation = 'negotiation',
  Paused = 'paused',
  Canceled = 'canceled',
  InProgress = 'in_progress',
  Done = 'done',
}

export interface ITask {
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
  geoname: any
  location: ILocation,
  mainCategory: Category,
  category: Category,
  subCategory: Category,
  isExactLocation: boolean
  ratePerHour: number,
  budget: number,
  estimate: number
  status: ITaskStatus
  createdAt: string
  updatedAt: string
  deletedAt: string
  profile: IProfile,
  photos: string[]
  currency: string
  deadline: string,
  priceType: string,
  budgetMax?: number
  photosObjects: any[],
  lastNegotiation: ITaskNegotiation
  masterId: number
  master: IProfile,
  negotiations: ITaskNegotiation[]
  isSavedByCurrentProfile?: boolean
  responses: {
    data: ITaskNegotiation[],
    total: number
  }
  feedbacks: IFeedbacksToProfile[]
}

export interface IStat {
  tasksCount: number,
  tasksDoneCount: number,
  tasksDonePerMonth: number,
  mastersCount: number,
  feedbacksCount: number
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

export interface ISavedSearchItem {
  id: number,
  name: string
  keywords: string
  categoryId: number
  subCategoryId: number
  mainCategory: Category,
  category: Category,
  subCategory: Category,
  masterRole: string
  country: string
  city: string
  geonameid: number,
  geoname: any,
  radius: number
  ratePerHourMin: number
  ratePerHourMax: number
  maxWeekHoursMin: number
  maxWeekHoursMax: number
  budgetMin: number
  budgetMax: number
  estimateMin: number
  estimateMax: number
  lat: number
  lng: number
  sort: string
  sortOrder: string
  exactLocation: string
}

export interface ISavedPeople {
  id: number
  userId: number
  role: string
  firstName: string
  lastName: string
  phone: string
  email: string
  birthday: null
  country: string
  city: string
  region: null
  zipcode: null
  address1: null
  address2: null
  geonameid: number
  location: {
    lng: number,
    lat: number
  },
  isExactLocation: boolean
  createdAt: string
  updatedAt: string
  deletedAt: null
  photoObject: null
  skills: SkillData[]
  photo: null
}

export interface IChat {
  id: number;
  name: string;
  isGroup: boolean;
  task: ITask;
  taskId: number;
  profile: IProfile;
  profileId: number;
  lastMessage: string;
  participant: IProfile;
  participantId: number;
  profiles: IProfile[]
  lastMessageAt: string
  createdAt: string
  totalUnread: number
}

export enum IEventLogRecordType {
  Created = 'created',
  StatusChanged = 'status_changed',
  DetailesChanged = 'detailes_changed',
  CommentAdded = 'comment_added',
  FileUploaded = 'file_uploaded',
  FeedbackAdded = 'feedback_added',
}
export interface IEventLogRecordData{
  newStatus: EventStatus
}
export enum IChatMessageType {
  Text = 'text',
  File = 'file',
  Voice = 'voice',
  Image = 'image',
  TaskNegotiation = 'task_negotiation',
  EventLogRecord = 'event_log_record'
}

export interface IUserFile {
  id: number
  urlS3: string
}

export interface IChatMessageProfile {
  id: number
  profile: IProfile
  profileId: number
  message: IChatMessage
  messageId: number
  read: boolean
  readAt: string
  createdAt: string
}

export interface IChatMessage {
  id: number;
  type: IChatMessageType
  message: string
  isRead: boolean
  isSent: boolean
  taskNegotiation: ITaskNegotiation
  taskNegotiationId: number
  chat: IChat
  chatId: number
  profile: IProfile
  profileId: number
  profileStates: IChatMessageProfile[]
  files: IUserFile[]
  createdAt: Date
  eventLogRecordType: IEventLogRecordType
  eventLogRecordData: IEventLogRecordData
}

export interface ISavedTasks {
  id: number
  profileId: number
  masterId: number
  title: string
  description: string
  categoryId: number
  subCategoryId: number
  masterRole: string
  executionType: string
  country: null
  city: null
  address: string
  geonameid: number
  location: {
    lng: number
    lat: number
  },
  isExactLocation: boolean
  ratePerHour: null
  budget: number
  estimate: number
  status: string
  deadline: null
  createdAt: string
  updatedAt: string
  deletedAt: null
  profile: {
    id: number
    userId: number
    role: string
    firstName: string
    lastName: string
    phone: string
    email: string
    birthday: null
    country: null
    city: string
    region: null
    zipcode: null
    address1: null
    address2: null
    geonameid: null
    location: null
    isExactLocation: boolean
    createdAt: string
    updatedAt: string
    deletedAt: null
    photo: null
  },
  category: {
    id: number
    createdAt: string
    updatedAt: string
    iconUrl: null
    color: null
    isMain: boolean
    parentId: null
    sort: number
    translations: [
      {
        id: number
        createdAt: string
        updatedAt: string
        languageCode: string
        name: string
        description: string
        baseId: number
      }
    ]
  },
  subCategory: {
    id: number
    createdAt: string
    updatedAt: string
    iconUrl: null
    color: null
    isMain: boolean
    parentId: number
    sort: number
    translations: [
      {
        id: number,
        createdAt: string
        updatedAt: string
        languageCode: string
        name: string
        description: string
        baseId: number
      }
    ]
  },
  photosObjects: [
    {
      id: string
      urlS3: string
      createdAt: string
      updatedAt: string
      deletedAt: null
    }
  ],
  feedback: {
    id: number
    target: string
    fromProfileId: number
    toProfileId: number
    taskId: number
    workQuality: number
    politeness: number
    deadlines: number
    extraExpenses: number
    reccommend: number
    description: string
    usability: null
    masterSearchSpeed: null
    willUseAgain: null
    willReccommend: null
    showInFirstPage: boolean
    createdAt: string
    updatedAt: string
    deletedAt: null
    photos: null
  },
  photos: string[]
  priceType: string
}

export interface IFeedbacksToProfile {
  id: number
  title: string,
  target: string
  fromProfileId: number
  toProfileId: number
  totalMark: number
  workQuality: number
  politeness: number
  deadlines: number
  extraExpenses: number
  reccommend: number
  description: string
  usability: null
  masterSearchSpeed: null
  willUseAgain: null
  willReccommend: null
  showInFirstPage: boolean
  createdAt: string
  updatedAt: string
  deletedAt: null,
  mark: number
  photosObjects: [
    {
      id: number
      urlS3: string
      createdAt: string
      updatedAt: string
      deletedAt: null
    }
  ]
  task: ITask,
  taskId: number,
  eventId: number
  fromProfile: IProfile
  toProfile: IProfile
  photos: string[]
}

export interface IProfileRecommendation{
  id: number,
  profileId: number,
  profileThatRecommendsId: number
  profileThatRecommends: IProfile,
  createdAt: string
}
export enum EventStatus {
  Draft = 'draft',
  Planned = 'planned',
  Confirmed = 'confirmed',
  Declined = 'declined',
  Completed = 'completed',
  Approved = 'approved',
  Rejected = 'rejected',
  Overdue = 'overdue',
  Deleted = 'deleted',
}
export interface IEventColorStatus {
  id: number,
  color: string
}

export class IEventExpense {
  type: string;
  amount: number;
  currency: string;
}

export interface IEvent {
  id?: number,
  title?: string,
  status?: EventStatus
  isOverdue?: boolean
  start?: Date
  end?: Date
  actualStart?: Date,
  actualEnd?: Date,
  actualHours?: number
  task?: ITask,
  participant?: IProfile
  author?: IProfile
  feedbacks?: IFeedbacksToProfile[],
  unreadTextMessagesCount?: string
  unreadMediaMessagesCount?: string
  expenses?: IEventExpense[]
  actualExpenses?: IEventExpense[]
  participantId?: number
  authorId?: number
  ratePerHour?: number
  actualRatePerHour?: number
  estimate?: number,
  totalHours?: number
  meetingLink?: string

  country?: string;
  city?: string;
  region?: string;
  zipcode?: string;
  address1?: string;
  address2?: string;

  isAuthor?: boolean
}


export interface ISharePersonalLabel {
  style: 'vertical' | 'horizontal',
  theme: 'light' | 'dark',
  options: {
    qrCode: boolean,
    webAddress: boolean,
    name: boolean,
    phone: boolean,
  }
}

export interface IReportFilterProfileItem{
  id: number,
  name: string

}
export interface IReportFilterTaskItem{
  id: number,
  title: string

}
export interface IReportFilter{
  categoriesFilter: {
    total: number,
    data: SkillData[],
  }
  subCategoriesFilter: {
    total: number,
    data: SkillData[],
  }
  clientsFilter: {
    total: number,
    data: IReportFilterProfileItem[],
  }
  mastersFilter: {
    total: number,
    data: IReportFilterProfileItem[],
  }
  tasksFilter: {
    total: number,
    data: IReportFilterTaskItem[],
  }
}

export interface ITaskStats{
  eventsCompleted: number,
  eventsPlanned: number,
  plannedTime: number,
  completedTime: number,
  plannedAmount: number,
  completedAmount: number,
  plannedCharges: number,
  completedCharges: number,
  reviews: number,
  plannedExpenses: number,
  completedExpenses: number
}


export enum NotificationType {
  Messages = 'messages',
  TaskOffer = 'task_offer',
  TaskResponse = 'task_response',
  TaskOfferDeclined = 'task_offer_declined',
  TaskResponseDeclined = 'task_response_declined',
  Feedback = 'feedback',
  RegistrationCompleted = 'registration_completed',
  EmailVerification = 'email_verification',
  EventPlanned = 'event_planned',
  EventStatusChanged = 'event_status_changed',
  EventRemind = 'event_remind',
  News = 'news',
}

export enum ProfilePageType {
  Skill = 'skill',
  Profile = 'profile'
}

export const CONTACTS = {
  email: 'admin@masterspages.com',
  instagram: 'https://www.instagram.com/masterspages',
  facebook: 'https://www.facebook.com/masterspages'
}
