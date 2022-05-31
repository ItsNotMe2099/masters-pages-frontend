import request from 'utils/request'

import {IUser} from 'data/intefaces/IUser'
export interface IDataQueryList{
  page?: number,
  limit?: number,
  search?: string,
  lang?: string
}
export default class UserRepository {
  static async fetchUser(): Promise<IUser | null> {
    const res = await request({
      url: '/api/auth/currentUser',
      method: 'GET',
    })
    console.log("Res111", res);
    if (res.err) {
      return null
    }
    return res.data
  }
}
