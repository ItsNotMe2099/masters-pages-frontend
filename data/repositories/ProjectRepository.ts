import request from 'utils/request'

import {IProject, ProjectStatus} from 'data/intefaces/IProject'
import {IPagination} from 'types/types'
import {IProjectCounts} from 'data/intefaces/IProjectCounts'
export interface IProjectSearchRequest{
  keywords?: string 
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
export default class ProjectRepository {
  static async create(data: any): Promise<IProject | null> {
    const res = await request({
      url: `/api/project`,
      method: 'POST',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async update(id: number, data: any): Promise<IProject | null> {
    const res = await request({
      url: `/api/project/${id}`,
      method: 'PATCH',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async delete(id: number): Promise<IProject | null> {
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
  static async findPublicById(id: number): Promise<IProject | null> {
    const res = await request({
      url: `/api/project/search`,
      method: 'GET',
      data: {projectId: id}
    })
    if (res.err) {
      return null
    }
    console.log("FindPublicById", res.data);
    return res.data?.data?.length > 0 ? res.data.data[0] : null
  }
  static async search(page: number = 1, limit: number = 10, keywords: string = '', data?: IProjectSearchRequest): Promise<IPagination<IProject> | null> {
    const res = await request({
      url: `/api/project/search?page=${page}&limit=${limit}&keywords=${keywords}&${data?.corporateProfileId && `corporateProfileId=${data?.corporateProfileId}`}&${data?.projectId && `projectId=${data.projectId}`}`,
      method: 'GET',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async searchByProjectId(page: number = 1, limit: number = 1, projectId?: number): Promise<IPagination<IProject> | null> {
    const res = await request({
      url: `/api/project/search?page=${page}&limit=${limit}&projectId=${projectId}`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async fetchByStatus(status: ProjectStatus, page: number = 1, limit: number = 100): Promise<IPagination<IProject> | null> {
    const res = await request({
      url: `/api/project`,
      method: 'GET',
      data: {s: JSON.stringify({status}), page, limit}
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async fetchCounts(): Promise<IProjectCounts> {
    const res = await request({
      url: `/api/project/count`,
      method: 'GET',
      data: {s: JSON.stringify({status})}
    })
    if (res.err) {
      return null
    }
    const statuses = [ProjectStatus.Draft,
      ProjectStatus.Published,
      ProjectStatus.Execution,
      ProjectStatus.Paused,
      ProjectStatus.Canceled,
      ProjectStatus.Completed ];
    const map = {}
    statuses.forEach(status => {
      const item = res.data.find(i => i.project_status === status);
      map[status] = item?.count ? parseInt(item?.count, 10) : 0;
    })
    return map;
  }
}
