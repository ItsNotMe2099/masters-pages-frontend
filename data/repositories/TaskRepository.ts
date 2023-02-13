import request from 'utils/request'
import { IPagination } from 'types/types'
import { ITask, ITaskFormData } from 'types'

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
