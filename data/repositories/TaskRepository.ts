import request from 'utils/request'
import { IPagination } from 'types/types'
import { ITask, ITaskCount, ITaskFormData, ITaskStatus } from 'types'

export interface ITaskSearchRequest {
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
export default class TaskRepository {

  static async search(page: number = 1, limit: number = 10, keywords: string = '', data?: ITaskSearchRequest): Promise<IPagination<ITask> | null> {
    const res = await request({
      url: `/api/tasks/search?page=${page}&limit=${limit}&keywords=${keywords}`,
      method: 'GET',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchOneTaskUserRequest(taskId: number): Promise<ITask> {
    const res = await request({
      url: `/api/tasks/${taskId}`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchTaskListByUser
    (page: number = 1, limit: number = 10, sort: string = 'createdAt', sortOrder: string = 'DESC', status?: ITaskStatus):
    Promise<IPagination<ITask> | null> {
    const res = await request({
      url: `/api/tasks?page=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}${status && `&status=${status}`}`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchTaskUserStatRequest(): Promise<ITaskCount[]> {
    const res = await request({
      url: '/api/tasks/count',
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async create(data: ITaskFormData): Promise<ITask> {
    const res = await request({
      url: `/api/tasks`,
      method: 'POST',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }
}
