import request from 'utils/request'

import {IUser} from 'data/intefaces/IUser'
import { IOrganization } from 'data/intefaces/IOrganization';
export interface IDataQueryList{
  page?: number,
  limit?: number,
  search?: string,
  lang?: string
}
export default class OrganizationRepository {

  static async fetchCurrentOrganization(): Promise<IOrganization | null> {
    const res = await request({
      url: '/api/organization/current',
      method: 'GET',
    })
    console.log("Res111", res);
    if (res.err) {
      return null
    }
    return res.data
  }

  static async updateOrganizationData(id: number, data: IOrganization): Promise<IOrganization | null> {
    const res = await request({
      url: `/api/organization/${id}`,
      method: 'PATCH',
      data
    })
    console.log("Res111", res);
    if (res.err) {
      return null
    }
    return res.data
  }
}
