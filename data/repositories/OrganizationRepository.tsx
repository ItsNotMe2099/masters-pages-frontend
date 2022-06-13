import request from 'utils/request'
import { IOrganization } from 'data/intefaces/IOrganization';
import { IPagination } from 'types/types';

export interface IDataQueryList{
  page?: number,
  limit?: number,
  search?: string,
  lang?: string
}

export interface IOrganizationSearchRequest{
  keywords?: string
  country?: string
  city?: string
}

export default class OrganizationRepository {

  static async fetchOrganization(id: number): Promise<IOrganization | null> {
    const res = await request({
      url: `/api/organization/${id}`,
      method: 'GET',
    })
    console.log("Res111", res);
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchOrganizationsList(): Promise<IOrganization[]> {
    const res = await request({
      url: '/api/organization',
      method: 'GET',
    })
    console.log("Res111", res);
    if (res.err) {
      return null
    }
    return res.data
  }

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

  static async search(page: number = 1, limit: number = 10, keywords: string = '', data?: IOrganizationSearchRequest): Promise<IPagination<IOrganization> | null> {
    const res = await request({
      url: `/api/organization/search?page=${page}&limit=${limit}&keywords=${keywords}`,
      method: 'GET',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }
}
