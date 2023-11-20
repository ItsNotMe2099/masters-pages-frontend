import request from 'utils/request'
import {IProject, ProjectStatus} from 'data/intefaces/IProject'
import {IPagination} from 'types/types'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import {IApplicationCounts} from 'data/intefaces/IApplicationCounts'
import { ProfileRole } from 'data/intefaces/IProfile'

export interface IProjectSearchRequest{
  keywords?: string,
  mainCategoryId?: number
  subCategoryId?: number
  categoryId?: number
  executionType?: string
  age?: number
  education?: number
  languages?: string[]
  corporateProfileId?: number
  projectId?: number
}
export default class ApplicationRepository {
  static async create(data: any): Promise<IApplication | null> {
    const res = await request({
      url: `/api/application`,
      method: 'POST',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async update(id: number, data: any): Promise<IApplication | null> {
    const res = await request({
      url: `/api/application/${id}`,
      method: 'PATCH',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async delete(id: number): Promise<IApplication | null> {
    const res = await request({
      url: `/api/application/${id}`,
      method: 'DELETE',
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async findById(id: number): Promise<IApplication | null> {
    const res = await request({
      url: `/api/application/${id}`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async fetchOneByProject(projectId: number): Promise<IApplication | null> {
    const res = await request({
      url: `/api/application`,
      method: 'GET',
      data: {s: JSON.stringify({projectId})}
    })
    if (res.err) {
      return null
    }
    return res.data?.data?.length > 0 ? res.data.data[0] : null
  }
  static async fetchByProfileByStatus(status: ProjectStatus, page: number = 1, limit: number = 100): Promise<IPagination<IApplication> | null> {
    const res = await request({
      url: `/api/application`,
      method: 'GET',
      data: {s: JSON.stringify({status})}
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async fetchByProjectIdByStatus(projectId: number, status: ProjectStatus): Promise<IPagination<IApplication> | null> {
    const res = await request({
      url: `/api/application`,
      method: 'GET',
      data: {s: JSON.stringify({status, projectId})}
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async fetchCountsByProfile(): Promise<IApplicationCounts> {
    const res = await request({
      url: `/api/application/countByProfile`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    const statuses = [
      ApplicationStatus.Draft,
      ApplicationStatus.Applied,
      ApplicationStatus.Shortlist ,
      ApplicationStatus.Invited,
      ApplicationStatus.Execution,
      ApplicationStatus.CompleteRequest,
      ApplicationStatus.Completed,
      ApplicationStatus.RejectedByCompany,
      ApplicationStatus.RejectedByVolunteer,
    ];
    const map = {}
    statuses.forEach(status => {
      const item = res.data.find(i => i.application_status === status);
      map[status] = item?.count ? parseInt(item?.count, 10) : 0;
    })
    return map;
  }
  static async fetchCountsByProjectId(projectId: number): Promise<IApplicationCounts> {
    const res = await request({
      url: `/api/application/countByProject/${projectId}`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    const statuses = [
      ApplicationStatus.Draft,
      ApplicationStatus.Applied,
      ApplicationStatus.Shortlist ,
      ApplicationStatus.Invited,
      ApplicationStatus.Execution,
      ApplicationStatus.CompleteRequest,
      ApplicationStatus.Completed,
      ApplicationStatus.RejectedByCompany,
      ApplicationStatus.RejectedByVolunteer,
    ];
    const map = {}
    statuses.forEach(status => {
      const item = res.data.find(i => i.application_status === status);
      map[status] = item?.count ? parseInt(item?.count, 10) : 0;
    })
    return map;
  }

  static async fetchApplicationsByCorporateForProject(projectId: number, profileRole: string = 'corporate', page?: number, limit?: number): Promise<IPagination<IApplication>> {
    const res = await request({
      url: page && limit ? `/api/application?s={"projectId" : ${projectId}}&page=${page}&limit=${limit}` : `/api/application?s={"projectId" : ${projectId}}`,
      method: 'GET',
      profileRole
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchApplicationsByVolunteer(page: number = 1, limit: number = 30): Promise<IPagination<IApplication>> {
    const res = await request({
      url: `/api/application`,
      method: 'GET',
      data: {
        page, limit
      }
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async listApplicationsByProfileRole(profileRole: ProfileRole): Promise<IPagination<IApplication>> {
    const res = await request({
      url: `/api/application`,
      method: 'GET',
      profileRole: profileRole,
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async changeApplicationStatus(id: number, data: any, profileRole: string): Promise<IApplication | null> {
    const res = await request({
      url: `/api/application/${id}`,
      method: 'PATCH',
      profileRole: profileRole,
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }
}
