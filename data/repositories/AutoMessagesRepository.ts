import { IAutoMessages, IAutoMessage } from 'data/intefaces/IAutoMessages'
import request from 'utils/request'

export interface AutoMessages {
  projectId: number
  applicationStatusChangeMessages?: IAutoMessage[]
  projectStatusChangeMessages?: IAutoMessage[]
}

export default class AutoMessagesRepository {

  static async addProjectAutoMessages(data: AutoMessages): Promise<IAutoMessages | null> {
    const res = await request({
      url: `/api/project/project-auto-messages`,
      method: 'POST',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async getProjectAutoMessagesByProjectId(projectId: number): Promise<IAutoMessages | null> {
    const res = await request({
      url: `/api/project/project-auto-messages/${projectId}`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async updateProjectAutoMessages(data: AutoMessages): Promise<IAutoMessages | null> {
    const res = await request({
      url: `/api/project/project-auto-messages`,
      method: 'PUT',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }
}
