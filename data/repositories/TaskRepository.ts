import request from 'utils/request'
import {DeepPartial, IPagination} from 'types/types'
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
    (data: {page?: number, limit?: number, sort?: string, sortOrder?: string, status?: ITaskStatus}):
    Promise<IPagination<ITask> | null> {
    const res = await request({
      url: `/api/tasks?page=${data.page ?? 1}&limit=${data.limit ?? 1}&sort=${data.sort ?? 'createdAt'}&sortOrder=${data.sortOrder ?? 'DESC'}${data.status && `&status=${data.status}`}`,
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

  static async update(id: number, data: DeepPartial<ITask>): Promise<ITask> {
    const res = await request({
      url: `/api/tasks/${id}`,
      method: 'PUT',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }
}
