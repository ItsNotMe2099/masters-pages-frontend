import {IProfile} from 'data/intefaces/IProfile'
import {IUserFile} from 'types'
import { ILocation } from './ILocation'

export enum OrganizationStatus {
  Moderation = 'moderation',
  Approved = 'approved',
  Rejected = 'rejected',
}

export interface IAbout{
  about: string
  visible: boolean
}

export interface IDescription {
  description: string
  visible: boolean
}

export interface ISocialLink{
  link: string
  type: string
}

export interface IOrganizationLocation{
  location: ILocation
}



export interface IOrganization{
  id: number
  corporateProfileId: number
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
  description: IDescription
 // locations
  photo: string
  attachments: string[]
  attachmentsObjects: IUserFile[]
  location: IOrganizationLocation
}
