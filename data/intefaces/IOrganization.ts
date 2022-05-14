import {IProfile} from 'data/intefaces/IProfile'
import {IUserFile} from 'types'

export enum OrganizationStatus {
  Moderation = 'moderation',
  Approved = 'approved',
  Rejected = 'rejected',
}

export interface IAbout{
  about: string
  visible: boolean
}

export interface ISocialLink{
  link: string
  type: string
}

export interface IOrganization{
  id: number
  status: OrganizationStatus;
  isPublished: boolean
  corporateProfile: IProfile
  photoObject: IUserFile
  socialLinks: ISocialLink[]
  name: string
  phone: string
  site: string
  email: string
  about: IAbout
  description: string
 // locations
  photo: string
}
