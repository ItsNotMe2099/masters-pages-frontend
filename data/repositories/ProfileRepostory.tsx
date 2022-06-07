import request from 'utils/request'
import {IProfile, ProfileRole} from 'data/intefaces/IProfile'
import {format, parse} from 'date-fns'
import { IProject } from 'data/intefaces/IProject'
import { IPagination } from 'types/types'
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

  static async fetchProfiles(data: any, limit: number = 10, masterRole: string = 'volunteer', page: number = 1, sort: string = 'id', sortOrder: string = 'DESC'): Promise<IPagination<IProfile>> {
    const res = await request({
      url: `/api/profile/search?limit=${limit}&masterRole=${masterRole}&page=${page}&sort=${sort}&sortOrder=${sortOrder}`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async addToSavedProjects(data: any): Promise<IProject | null> {
    const res = await request({
      url: `/api/profile/saved-projects`,
      method: 'POST',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async deleteFromSavedProjects(data: any, projectId: number): Promise<IProfile | null> {
    const res = await request({
      url: `/api/profile/saved-projects/${projectId}`,
      method: 'DELETE',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchSavedProjects(page: number = 1, limit: number = 100): Promise<IPagination<IProject> | null>  {
    const res = await request({
      url: `/api/profile/saved-projects?page=${page}&limit=${limit}`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async updateProfile(id: number, data: any): Promise<IProfile | null> {
    const res = await request({
      url: `/api/profile/${id}`,
      method: 'PUT',
      data
    })
    console.log("Res111", res);
    if (res.err) {
      return null
    }
    return res.data
  }
}
