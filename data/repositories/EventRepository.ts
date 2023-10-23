import request from 'utils/request'
import {DeepPartial, IPagination} from 'types/types'
import {IEvent} from "types";
import {IEventListRequest} from "data/intefaces/IEventListRequest";

export default class EventRepository {
  static async fetch(data: IEventListRequest): Promise<IPagination<IEvent>> {
    const res = await request({
      url: `/api/event`,
      method: 'GET',
      data
    })

    return res.data
  }
  static async fetchNearest(data: IEventListRequest): Promise< IPagination<IEvent>> {
    const res = await request({
      url: `/api/event`,
      method: 'GET',
      data
    })

    return res.data
  }
  static async create(data: DeepPartial<IEvent>): Promise<IEvent | null> {
    const res = await request({
      url: `/api/event`,
      method: 'POST',
      data
    })

    return res.data
  }

  static async update(id: number, data: DeepPartial<IEvent>): Promise<IEvent | null> {
    const res = await request({
      url: `/api/event/${id}`,
      method: 'PUT',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async send(id: number): Promise<IEvent | null> {
    const res = await request({
      url: `/api/event/${id}/send`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async sendConfirmed(id: number): Promise<IEvent | null> {
    const res = await request({
      url: `/api/event/${id}/sendConfirmed`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async draft(id: number): Promise<IEvent | null> {
    const res = await request({
      url: `/api/event/${id}/draft`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async confirm(id: number): Promise<IEvent | null> {
    const res = await request({
      url: `/api/event/${id}/confirm`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async approve(id: number): Promise<IEvent | null> {
    const res = await request({
      url: `/api/event/${id}/approve`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async reject(id: number): Promise<IEvent | null> {
    const res = await request({
      url: `/api/event/${id}/reject`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async decline(id: number): Promise<IEvent | null> {
    const res = await request({
      url: `/api/event/${id}/decline`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async complete(id: number): Promise<IEvent | null> {
    const res = await request({
      url: `/api/event/${id}/complete`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async edit(id: number, data: DeepPartial<IEvent>): Promise<IEvent | null> {
    const res = await request({
      url: `/api/event/${id}/edit`,
      method: 'GET',
      data
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async delete(id: number): Promise<IEvent | null> {
    const res = await request({
      url: `/api/event/${id}`,
      method: 'DELETE',
    })
    if (res.err) {
      return null
    }
    return res.data
  }

  static async findById(id: number): Promise<IEvent | null> {
    const res = await request({
      url: `/api/event/${id}`,
      method: 'GET'
    })
    if (res.err) {
      return null
    }
    return res.data
  }
}
