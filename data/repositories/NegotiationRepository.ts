import request from 'utils/request'
import { ITaskNegotiation } from 'types'

export default class NegotiationRepository {

  static async fetchTaskLastConditions(id: number): Promise<ITaskNegotiation> {
    const res = await request({
      url: `/api/task-negotiation/${id}/last-conditions`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }
}
