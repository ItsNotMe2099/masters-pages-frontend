import request from 'utils/request'
import { ITaskNegotiation, ITaskNegotiationState, ITaskNegotiationType, ITypesWithStates } from 'types'
import { IPagination } from 'types/types'

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



  static async taskNegotiationFetchLastConditions(taskId: number, profileId: number = null): Promise<ITaskNegotiation> {
    const res = await request({
      url: `/api/task-negotiation/${taskId}/last-conditions?profileId=${profileId}`,
      method: 'GET',
    })

    if (res.err) {
      return null
    }
    return res.data
  }

  static async taskNegotiationEditConditionsRequest(taskNegotiationId: number, data): Promise<ITaskNegotiation> {
    const res = await request({
      url: `/api/task-negotiation/${taskNegotiationId}/edit-conditions`,
      method: 'POST',
      data,
    })

    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchOffersFromClient(page: number = 1, limit: number = 10): Promise<IPagination<ITaskNegotiation> | null> {
    const res = await request({
      url: '/api/task-negotiation/offers_from_client',
      method: 'POST',
      data: { page, limit }
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchOffersFromMaster(page: number = 1, limit: number = 10): Promise<IPagination<ITaskNegotiation> | null> {
    const res = await request({
      url: '/api/task-negotiation/offers_from_master',
      method: 'POST',
      data: { page, limit }
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchListNegotiations(typesWithStates: ITypesWithStates[], page: number = 1, limit: number = 10):
    Promise<IPagination<ITaskNegotiation> | null> {
    const res = await request({
      url: '/api/task-negotiation',
      method: 'POST',
      data: { typesWithStates, page, limit }
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async acceptAcceptTaskAsCompleted(id: number): Promise<ITaskNegotiation> {
    const res = await request({
      url: `/api/task-negotiation/${id}/accept-accept-as-completed`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async declineAcceptTaskAsCompleted(id: number): Promise<ITaskNegotiation> {
    const res = await request({
      url: `/api/task-negotiation/${id}/decline-accept-as-completed`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }
}
