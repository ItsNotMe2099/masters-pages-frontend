import request from 'utils/request'
import { IPagination } from 'types/types'
import {ITask, ITaskCount, ITaskFormData, ITaskNegotiation, ITaskStatus} from 'types'

export default class TaskNegotiationRepository {

  static async fetchOffers(data: { page: number, limit: number }): Promise<IPagination<ITaskNegotiation> | null> {
    const res = await request({
      url: `/api/task-negotiation/offers?page=${data.page}&limit=${data.limit}`,
      method: 'POST',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchNegotiations(data: { page?: number, limit?: number }): Promise<IPagination<ITaskNegotiation> | null> {
    const res = await request({
      url: `/api/task-negotiation/negotiations?page=${data.page ?? 1}&limit=${data.limit ?? 10}`,
      method: 'POST'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchOfferAndNegotiations(data: { page?: number, limit?: number }): Promise<IPagination<ITaskNegotiation> | null> {
    const res = await request({
      url: `/api/task-negotiation/offersAndNegotiations?page=${data.page ?? 1}&limit=${data.limit ?? 10}`,
      method: 'POST'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async createTaskResponseByMaster(data: { taskId: number, message: string, ratePerHour: number, estimate: number, deadline: string}): Promise<ITaskNegotiation | null> {
    const res = await request({
      url: `/api/task-negotiation/task-response`,
      method: 'POST',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async declineTaskResponse(taskNegotiationId: number): Promise<ITaskNegotiation | null> {
    const res = await request({
      url:  `/api/task-negotiation/${taskNegotiationId}/decline-task-response`,
      method: 'POST'
    })
    if (res.err) {
      return null
    }
    return res.data
  }


  static async acceptTaskResponse(taskNegotiationId: number): Promise<ITaskNegotiation | null> {
    const res = await request({
      url:  `/api/task-negotiation/${taskNegotiationId}/accept-task-response`,
      method: 'POST'
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async markAsDone(taskId: number): Promise<ITaskNegotiation | null> {
    const res = await request({
      url: `/api/task-negotiation/${taskId}/mark-as-done`,
      method: 'POST'
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async acceptMarkAsDone(taskNegotiationId: number): Promise<ITaskNegotiation | null> {
    const res = await request({
      url: `/api/task-negotiation/${taskNegotiationId}/accept-mark-as-done`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async acceptAcceptAsCompleted(taskNegotiationId: number): Promise<ITaskNegotiation | null> {
    const res = await request({
      url: `/api/task-negotiation/${taskNegotiationId}/accept-accept-as-completed`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async editConditions(taskNegotiationId: number, data: {ratePerHour: number, estimate: number, deadline: number}): Promise<ITaskNegotiation | null> {
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

  static async acceptConditions(taskNegotiationId: number): Promise<ITaskNegotiation | null> {
    const res = await request({
      url: `/api/task-negotiation/${taskNegotiationId}/accept-conditions`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async declineConditions(taskNegotiationId: number): Promise<ITaskNegotiation | null> {
    const res = await request({
      url: `/api/task-negotiation/${taskNegotiationId}/decline-conditions`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async acceptTask(data: {taskId: number, profileId: number}): Promise<ITaskNegotiation | null> {
    const res = await request({
      url: `/api/task-negotiation/accept-task`,
      method: 'POST',
      data,
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async acceptTaskOffer(taskNegotiationId: number): Promise<ITaskNegotiation | null> {
    const res = await request({
      url: `/api/task-negotiation/${taskNegotiationId}/accept-task-offer`,
      method: 'GET',
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async declineTaskOffer(taskNegotiationId: number): Promise<ITaskNegotiation | null> {
    const res = await request({
      url: `/api/task-negotiation/${taskNegotiationId}/decline-task-offer`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async acceptAsCompleted(taskId: number): Promise<ITaskNegotiation | null> {
    const res = await request({
      url: `/api/task-negotiation/${taskId}/accept-as-completed`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async declineAcceptAsCompleted(taskNegotiationId: number): Promise<ITaskNegotiation | null> {
    const res = await request({
      url: `/api/task-negotiation/${taskNegotiationId}/decline-accept-as-completed`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async declineMarkAsDone(taskNegotiationId: number): Promise<ITaskNegotiation | null> {
    const res = await request({
      url: `/api/task-negotiation/${taskNegotiationId}/decline-mark-as-done`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async hireMaster(data: {taskId: number, profileId: number}): Promise<ITaskNegotiation | null> {
    const res = await request({
      url: '/api/task-negotiation/hire-master',
      method: 'POST',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchLastConditions(data: {taskId: number, profileId: number}): Promise<ITaskNegotiation[] | null> {
    const res = await request({
      url: `/api/task-negotiation/${data.taskId}/last-conditions?profileId=${data.profileId}`,
      method: 'POST',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async createTaskOffer(data: {taskId: number, profileId: number}): Promise<ITaskNegotiation | null> {
    const res = await request({
      url: '/api/task-negotiation/task-offer',
      method: 'POST',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async removeAllNegotiations(taskNegotiationId: number): Promise<ITaskNegotiation | null> {
    const res = await request({
      url: `/api/task-negotiation/${taskNegotiationId}/remove-negotiations`,
      method: 'DELETE'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async cancelTask(taskNegotiationId: number): Promise<ITask> {
    const res = await request({
      url: `/api/task-negotiation/${taskNegotiationId}/cancel-task`,
      method: 'POST'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

}
