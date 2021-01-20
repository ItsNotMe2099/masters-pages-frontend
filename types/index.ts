import { ChangePasswordState } from "components/Auth/ChangePassword/reducer";
import phoneConfirmReducer, { PhoneConfirmState } from "components/Auth/PhoneConfirm/reducer";
import authReducer, {State as authState} from 'components/Auth/reducer'
import registrationCompleteReducer, { RegistrationCompleteState } from "components/Auth/RegistrationPage/reducer";
import authSignInReducer, { SignInState } from "components/Auth/SignIn/reducer";
import authSignUpReducer, { AuthSignUpState } from "components/Auth/SignUp/reducer";
import PWRecoveryReducer, { PWRecoveryState} from "components/Auth/PWRecovery/reducer"
import { ModalState } from "components/Modal/reducer";
import { ProfileState } from "components/Profile/reducer";
import { ProfileSearchState } from "components/ProfileSearch/reducer";
import { SkillState } from "components/Skill/reducer";
import { TaskOfferState } from "components/TaskOffer/reducer";
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
import { SavedTasksState } from "components/SavedTasks/reducer";
import { ProfileFeedbackState } from "components/ProfileFeedback/reducer";

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
  savedTasks: SavedTasksState
  profileFeedback: ProfileFeedbackState
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

export interface ISavedSearches {
  keywords: string
  categoryId: number
  subCategoryId: number
  masterRole: string
  country: string
  city: string
  geonameid: number
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
      deletedAt: null,
      photosObjects: [
          {
              id: number
              urlS3: string
              createdAt: string
              updatedAt: string
              deletedAt: null
          }
      ]
      task: {
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
          photosObjects: [
              {
                  id: string,
                  urlS3: string
                  createdAt: string
                  updatedAt: string
                  deletedAt: null
              }
          ],
          photos: string[]
          priceType: string
      },
      fromProfile: {
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
      photos: string[]
  }