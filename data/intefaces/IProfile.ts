import { IProfilePreferWorkIn, SkillData, UserActivityStatus} from 'types'
import {ILocation} from 'data/intefaces/ILocation'
import {IOrganization} from 'data/intefaces/IOrganization'

export enum ProfileRole {
  Client = 'client',
  Master = 'master',
  Volunteer = 'volunteer',
  Corporate = 'corporate'
}

export interface IProfile{
  id?: number
  avatar?: string
  slug?: string
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  role?: ProfileRole
  geonameid?: string
  birthday?: string
  country?: string
  city?: string
  region?: string
  zipcode?: string
  address1?: string
  address2?: string
  photo?: string
  geoname?: any,
  rating?: number
  location?: ILocation,
  preferredCategories?: number[],
  preferredSubCategories?: number[],
  skills?: SkillData[]
  notificationTotalCount?: number
  notificationFeedbackCount?: number
  notificationMessageCount?: number
  notificationTaskOfferCount?: number
  notificationTaskResponseCount?: number
  notificationTaskOfferDeclinedCount?: number
  notificationTaskResponseDeclinedCount?: number
  notificationEventCount?: number
  notificationNewsCount?: number
  feedbacksCount?: number
  tasksCount?: number
  totalAmount?: number
  totalHours?: number,
  preferToWorkIn?: IProfilePreferWorkIn[]
  languages?: string[]
  isSavedByCurrentProfile?: boolean
  bio?: {
    bio: string,
    visible: false
  },
  isSubscribedByCurrentProfile?: boolean
  isRecommendedByCurrentProfile?: boolean
  activityStatus?: UserActivityStatus
  organization?: IOrganization
  organizationId: number
  createdAt: string
}
export interface ICity{
  id: number
  name: string
}
