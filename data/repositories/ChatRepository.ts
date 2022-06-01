import request from 'utils/request'
import {IChat} from 'data/intefaces/IChat'
import {IPagination} from 'types/types'

export default class ChatRepository {
  static async fetchDialogList(data: any = {}): Promise<IChat[]> {
    const res = await request({
      url: `/api/chat/dialog`,
      method: 'GET',
      data
    })
    if (res.err) {
      return null
    }
    return res.data ?? []
  }

  static async fetchTaskDialogList(data: any = {}): Promise<IChat[]> {
    const res = await request({
      url: `/api/chat/task-dialog`,
      method: 'GET',
      data
    })
    if (res.err) {
      return null
    }
    return res.data ?? []
  }


  static async fetchProjectDialogList(projectId: number, isGroup?: boolean): Promise<IPagination<IChat>[]> {
    const res = await request({
      url: `/api/chat/project-dialog`,
      method: 'GET',
      data: {projectId, ...(typeof isGroup !== 'undefined' ? {isGroup}: {}), limit: 200}
    })
    if (res.err) {
      return null
    }
    return res.data
  }

}
