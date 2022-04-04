import request from 'utils/request'
import {IProfile, ProfileRole} from 'data/intefaces/IProfile'
import {format, parse} from 'date-fns'
export interface IDataQueryList{
  page?: number,
  limit?: number,
  search?: string,
  lang?: string
}
export default class ProfileRepository {
  static async fetchProfile(role: ProfileRole): Promise<IProfile | null> {
    const res = await request({
      url: `/api/profile/role/${role}`,
      method: 'GET',
    })
    console.log("Res111", res);
    if (res.err) {
      return null
    }
    const data = res.data;
    return data ? {...data, birthday: data.birthday ? format(parse(data.birthday, 'yyyy-MM-dd', new Date()), 'MM/dd/yyyy') : null} : null

  }
  static async fetchById(id: number): Promise<IProfile | null> {
    const res = await request({
      url: `/api/profile/${id}`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }
}
