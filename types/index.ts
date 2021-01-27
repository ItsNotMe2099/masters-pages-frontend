import { ChangePasswordState } from "components/Auth/ChangePassword/reducer";
import phoneConfirmReducer, { PhoneConfirmState } from "components/Auth/PhoneConfirm/reducer";
import authReducer, {State as authState} from 'components/Auth/reducer'
import registrationCompleteReducer, { RegistrationCompleteState } from "components/Auth/RegistrationPage/reducer";
import authSignInReducer, { SignInState } from "components/Auth/SignIn/reducer";
import authSignUpReducer, { AuthSignUpState } from "components/Auth/SignUp/reducer";
import PWRecoveryReducer, { PWRecoveryState} from "components/Auth/PWRecovery/reducer"
import { ChatState } from "components/Chat/reducer";
import { ModalState } from "components/Modal/reducer";
import { ProfileState } from "components/Profile/reducer";
import { ProfileSearchState } from "components/ProfileSearch/reducer";
import { SkillState } from "components/Skill/reducer";
import { TaskOfferState } from "components/TaskNegotiation/reducer";
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
  profileSearch: ProfileSearchState,
  taskUser: TaskUserState,
  taskOffer: TaskOfferState
  savedSearch: SavedSearchesState
  savedPeople: SavedPeopleState
  chat: ChatState
}
export interface ILocation {
  lng: number,
  lat: number,
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
  geoname?: any,
  location?: ILocation,
  preferredCategories ?: number[],
  preferredSubCategories ?: number[],
  skills?: SkillData[]
}

export interface Category{
  id?: number
  name?: string
  icon: string,
  translations: any[]
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
  price: number,
  skills: SkillData[]
}
export interface SkillListItem{
  id?: number
  name?: string
  icon: string,
  skills: SkillData[]
}


export enum ITaskNegotiationType {
  ResponseToTask = 'response_to_task',
  TaskOffer = 'task_offer',
  TaskNegotiation = 'task_negotiation',
  MarkAsDone = 'mark_as_done',
  TaskCompleted = 'task_completed',
  MasterAssigned = 'master_assigned',
}

export enum ITaskNegotiationState {
  SentToMaster = 'sent_to_master',
  SentToClient = 'sent_to_client',
  Declined = 'declined',
  Accepted = 'accepted',
}

export interface ITaskNegotiation{
  id: number,
  profile: ProfileData,
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
  priceType: 'fixed' | 'rate'

}
export enum ITaskStatus {
  Draft = 'draft',
  Published = 'published',
  Negotiation = 'negotiation',
  Paused = 'paused',
  Canceled = 'canceled',
  InProgress = 'in_progress',
  Done = 'done',
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
  location: ILocation,
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
  profile: ProfileData,

  deadline: string,
  priceType: string,
  photos: string[],
  profileHasNegotiations: boolean
  masterId: number
  master: ProfileData,
  responses: {
    data: ITaskNegotiation[],
    total: number
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

export interface ISavedSearchItem {
  id: number,
  keywords: string
  categoryId: number
  subCategoryId: number
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
      skills: []
      photo: null
}
export interface IChat{
  id: number;
  name: string;
  isGroup: boolean;
  task: ITask;
  taskId: number;
  profile: ProfileData;
  profileId: number;
  lastMessage: string;
  participant: ProfileData;
  participantId: number;
  profiles: ProfileData[]
  lastMessageAt: string
  createdAt: string
  totalUnread: number
}
export enum IChatMessageType {
  Text = 'text',
  File = 'file',
  Voice = 'voice',
  Image = 'image',
  TaskNegotiation = 'task_negotiation',
}
export interface IUserFile {
  id: number
  urlS3: string
}
export interface IChatMessageProfile {
  id: number
  profile: ProfileData
  profileId: number
  message: IChatMessage
  messageId: number
  read: boolean
  readAt: string
  createdAt: string
}
export interface IChatMessage{
  id: number;
  type: IChatMessageType
  message: string
  isRead: boolean
  isSent: boolean
  taskNegotiation: ITaskNegotiation
  taskNegotiationId: number
  chat: IChat
  chatId: number
  profile: ProfileData
  profileId: number
  profileStates: IChatMessageProfile[]
  files: IUserFile[]
  createdAt: Date
}
