import request from 'utils/request'
import { IProfile, ProfileRole } from 'data/intefaces/IProfile'
import { format, parse } from 'date-fns'
import { IProject } from 'data/intefaces/IProject'
import { IPagination } from 'types/types'
import { IProfileSettings, ITask } from "types";
import { ISkill } from 'data/intefaces/ISkill'
export interface IDataQueryList {
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
    return data ? { ...data, birthday: data.birthday ? format(parse(data.birthday, 'yyyy-MM-dd', new Date()), 'MM/dd/yyyy') : null } : null

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

  static async fetchSkills(): Promise<ISkill[]> {
    const res = await request({
      url: `/api/profile/skill`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchProfiles(limit: number = 10, masterRole: string = 'volunteer', page: number = 1, sort: string = 'id', sortOrder: string = 'DESC'): Promise<IPagination<IProfile>> {
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

  static async fetchSavedProjects(page: number = 1, limit: number = 100): Promise<IPagination<IProject> | null> {
    const res = await request({
      url: `/api/profile/saved-projects?page=${page}&limit=${limit}`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchSavedTasks(page: number = 1, limit: number = 100): Promise<IPagination<ITask> | null> {
    const res = await request({
      url: `/api/profile/saved-tasks?page=${page}&limit=${limit}`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async deleteSavedTask(taskId: number): Promise< ITask | null> {
    const res = await request({
      url: `/api/profile/saved-tasks/${taskId}`,
      method: 'DELETE',
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
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchProfilesForMainPage(): Promise<IProfile[]> {
    const res = await request({
      url: `/api/profile/for-main-page`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchProfilesForCorpPage(): Promise<IProfile[]> {
    const res = await request({
      url: `/api/profile/for-corporate-main-page`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async getSettings(): Promise<IProfileSettings | null> {
    const res = await request({
      url: '/api/profile/settings',
      method: 'GET',

    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async updateSettings(data: any): Promise<IProfile | null> {
    const res = await request({
      url: `/api/profile/settings`,
      method: 'POST',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async delete(role: string): Promise<IProfile | null> {
    const res = await request({
      url: `/api/profile/${role}`,
      method: 'DELETE',
    })
    if (res.err) {
      return null
    }
    return res.data
  }


  static async create(role: string, data: any): Promise<IProfile | null> {
    const res = await request({
      url: `/api/profile/${role}`,
      method: 'POST',
      data,
    })
    if (res.err) {
      throw res.err
    }
    return res.data
  }
}
