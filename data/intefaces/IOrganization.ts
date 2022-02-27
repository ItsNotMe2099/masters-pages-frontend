import {IProfile} from 'data/intefaces/IProfile'
import {IUserFile} from 'types'

export enum OrganizationStatus {
  Moderation = 'moderation',
  Approved = 'approved',
  Rejected = 'rejected',
}

export interface IOrganization{
  id: number
  status: OrganizationStatus;
  isPublished: boolean
  corporateProfile: IProfile
  photoObject: IUserFile
  name: string
  phone: string
  site: string
  email: string
 // locations
  photo: string
}
