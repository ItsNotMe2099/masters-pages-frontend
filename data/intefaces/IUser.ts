
import {IProfile} from 'data/intefaces/IProfile'
import {ILocation} from 'data/intefaces/ILocation'

export enum UserRegType {
  Site = 'site',
  Facebook = 'facebook',
  Google = 'google',
}

export interface IUser{
  id: number
  firstName: string
  lastName: string
  phone: string
  language: string
  email: string
  country: string
  city: string
  geonameid: number
  regType: UserRegType
  isRegistrationCompleted?: boolean
  location: ILocation
  profiles: IProfile[]
}
export interface ICity{
  id: number
  name: string
}
