import request from 'utils/request'
import {IPagination} from 'types/types'
import { ITask } from 'types'

export interface ITaskSearchRequest{
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

  static async search(data?: ITaskSearchRequest, page: number = 1, limit: number = 100): Promise<IPagination<ITask> | null> {
    const res = await request({
      url: `/api/tasks/search`,
      method: 'GET',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }
}
