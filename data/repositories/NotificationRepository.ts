import request from 'utils/request'

import {IProject, IProjectApplicationsNotification, IProjectNotification, ProjectStatus} from 'data/intefaces/IProject'
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
export default class NotificationRepository {
  static async getProjectNotification(projectId: number): Promise<IProjectNotification | null> {
    const res = await request({
      url: `/api/notification/project/${projectId}`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }


  static async getApplicationStatus(): Promise<IProjectApplicationsNotification | null> {
    const res = await request({
      url: `/api/notification/byApplicationStatus`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    const keys = Object.keys(res.data);
    const map = {}
    for(const key of keys){
      map[key] = parseInt(res.data[key], 10) ?? 0;
    }
    return map as IProjectApplicationsNotification
  }

}