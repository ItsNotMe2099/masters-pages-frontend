import request from 'utils/request'

import {IProject, ProjectStatus} from 'data/intefaces/IProject'
import {IPagination} from 'types/types'
import {IProjectCounts} from 'data/intefaces/IProjectCounts'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import {IApplicationCounts} from 'data/intefaces/IApplicationCounts'
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
      url: `/api/project/${id}`,
      method: 'DELETE',
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async findById(id: number): Promise<IProject | null> {
    const res = await request({
      url: `/api/project/${id}`,
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
}
